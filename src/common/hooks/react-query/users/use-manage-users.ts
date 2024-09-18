import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useSearch } from '@/common/hooks';
import { userService } from '@/common/services/user.service';
import { ADMIN_ROUTES } from '@/common/constants';
import { UserRole } from '@/types/user.types';
import type { ListItem } from '@/components/manage/manage-table/types';

export const useManageUsers = () => {
  const queryClient = useQueryClient();

  const { searchTerm, debouncedSearch, handleSearch } = useSearch();

  const { data: users, isLoading } = useQuery({
    queryKey: ['get manage users', debouncedSearch],
    queryFn: () => userService.getAll(debouncedSearch),
    select: ({ data }) =>
      data.map<ListItem>((user) => ({
        id: user.id,
        editUrl: ADMIN_ROUTES.userEdit(user.id),
        items: [
          user.name,
          user.email,
          user.role === UserRole.USER ? 'Пользователь' : 'Админ',
        ],
      })),
  });

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete user'],
    mutationFn: (id: string) => userService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage users'],
      });
      toast.success('Пользователь успешно удалён');
    },
    onError: () => {
      toast.error('При удалении возникла ошибка');
    },
  });

  return React.useMemo(
    () =>
      ({
        users,
        isLoading,
        searchTerm,
        handleSearch,
        deleteAsync,
      } as const),
    [users, isLoading, searchTerm, handleSearch, deleteAsync]
  );
};
