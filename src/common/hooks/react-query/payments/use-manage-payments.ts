import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { paymentService } from '@/common/services/payment.service';
import { convertPrice, formatDate } from '@/common/utils';
import { PaymentStatus } from '@/types/payment.types';
import type { ListItem } from '@/components/manage/manage-table/types';

export const useManagePayments = () => {
  const queryClient = useQueryClient();

  const { data: payments, isLoading } = useQuery({
    queryKey: ['get manage payments'],
    queryFn: () => paymentService.getAll(),
    select: ({ data }) =>
      data.map<ListItem>((payment) => ({
        id: payment.id,
        items: [
          payment.user.email,
          formatDate(payment.createdAt),
          convertPrice(payment.amount),
          payment.status === PaymentStatus.PENDING
            ? 'В ожидании'
            : payment.status === PaymentStatus.PAYED
            ? 'Оплачен'
            : 'Отменён',
        ],
      })),
  });

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete payment'],
    mutationFn: (paymentId: string) => paymentService.delete(paymentId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage payments'],
      });
      toast.success('Платёж успешно удалён');
    },
    onError() {
      toast.error('При удалении платежа возникла ошибка');
    },
  });

  return React.useMemo(
    () =>
      ({
        payments,
        isLoading,
        deleteAsync,
      } as const),
    [payments, isLoading, deleteAsync]
  );
};
