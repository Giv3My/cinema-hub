import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { reviewService } from '@/common/services/review.service';
import { getRatingString } from '@/common/utils';
import type { ListItem } from '@/components/manage/manage-table/types';

export const useManageReviews = () => {
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['get manage reviews'],
    queryFn: () => reviewService.getAll(),
    select: ({ data }) =>
      data.map<ListItem>((review) => ({
        id: review.id,
        items: [getRatingString(review.rating), review.user.name],
      })),
  });

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete review'],
    mutationFn: (id: string) => reviewService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage reviews'],
      });
      toast.success('Отзыв успешно удалён');
    },
    onError: () => {
      toast.error('При удалении возникла ошибка');
    },
  });

  return React.useMemo(
    () =>
      ({
        reviews,
        isLoading,
        deleteAsync,
      } as const),
    [reviews, isLoading, deleteAsync]
  );
};
