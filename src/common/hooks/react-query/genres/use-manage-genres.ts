import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useSearch } from '@/common/hooks';
import { genreService } from '@/common/services/genre.service';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/common/constants';
import type { ListItem } from '@/components/manage/manage-table/types';

export const useManageGenres = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { searchTerm, debouncedSearch, handleSearch } = useSearch();

  const { data: genres, isLoading } = useQuery({
    queryKey: ['get manage genres', debouncedSearch],
    queryFn: () => genreService.getAll(debouncedSearch),
    select: ({ data }) =>
      data.map<ListItem>((genre) => ({
        id: genre.id,
        viewUrl: PUBLIC_ROUTES.genre(genre.slug),
        editUrl: ADMIN_ROUTES.genreEdit(genre.id),
        items: [genre.name, genre.slug],
      })),
  });

  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['create genre'],
    mutationFn: () => genreService.create(),
    onSuccess({ data: id }) {
      queryClient.invalidateQueries({
        queryKey: ['get manage genres'],
      });
      toast.success('Жанр успешно создан');
      router.push(ADMIN_ROUTES.genreEdit(id));
    },
    onError: () => {
      toast.error('При создании возникла ошибка');
    },
  });

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete genre'],
    mutationFn: (id: string) => genreService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage genres'],
      });
      toast.success('Жанр успешно удалён');
    },
    onError: () => {
      toast.error('При удалении возникла ошибка');
    },
  });

  return React.useMemo(
    () =>
      ({
        genres,
        isLoading,
        searchTerm,
        handleSearch,
        createAsync,
        deleteAsync,
      } as const),
    [genres, isLoading, searchTerm, handleSearch, createAsync, deleteAsync]
  );
};
