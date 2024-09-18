import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { userService } from '@/common/services/user.service';
import type { SubmitHandler } from 'react-hook-form';
import type { UserEditInput } from '@/types/user.types';

export const useUserEdit = (userId: string) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getById(userId),
    enabled: Boolean(userId),
    select: ({ data }) => data,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['update user'],
    mutationFn: (values: UserEditInput) => {
      return userService.update(userId, values);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage users'],
      });
      toast.success('Пользователь успешно обновлён');
    },
    onError() {
      toast.error('При обновлении возникла ошибка');
    },
  });

  const onSubmit: SubmitHandler<UserEditInput> = async (values) => {
    await mutateAsync(values);
  };

  return { user, isLoading, isPending, onSubmit } as const;
};
