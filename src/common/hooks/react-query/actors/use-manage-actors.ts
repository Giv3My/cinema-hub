import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useSearch } from '@/common/hooks';
import { actorService } from '@/common/services/actor.service';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/common/constants';
import type { ListItem } from '@/components/manage/manage-table/types';

export const useManageActors = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { searchTerm, debouncedSearch, handleSearch } = useSearch();

  const { data: actors, isLoading } = useQuery({
    queryKey: ['get manage actors', debouncedSearch],
    queryFn: () => actorService.getAll(debouncedSearch),
    select: ({ data }) =>
      data.map<ListItem>((actor) => ({
        id: actor.id,
        viewUrl: PUBLIC_ROUTES.actor(actor.slug),
        editUrl: ADMIN_ROUTES.actorEdit(actor.id),
        items: [actor.name, String(actor.movies.length)],
      })),
  });

  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['create actor'],
    mutationFn: () => actorService.create(),
    onSuccess({ data: id }) {
      queryClient.invalidateQueries({
        queryKey: ['get manage actors'],
      });
      toast.success('Актёр успешно создан');
      router.push(ADMIN_ROUTES.actorEdit(id));
    },
    onError: () => {
      toast.error('При создании возникла ошибка');
    },
  });

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete actor'],
    mutationFn: (id: string) => actorService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage actors'],
      });
      toast.success('Актёр успешно удалён');
    },
    onError: () => {
      toast.error('При удалении возникла ошибка');
    },
  });

  return React.useMemo(
    () =>
      ({
        actors,
        isLoading,
        searchTerm,
        handleSearch,
        createAsync,
        deleteAsync,
      } as const),
    [actors, isLoading, searchTerm, handleSearch, createAsync, deleteAsync]
  );
};
