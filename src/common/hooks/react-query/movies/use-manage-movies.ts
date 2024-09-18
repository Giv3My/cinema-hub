import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useSearch } from '@/common/hooks';
import { movieService } from '@/common/services/movie.service';
import { getGenresString } from '@/common/utils';
import { ADMIN_ROUTES, PUBLIC_ROUTES } from '@/common/constants';
import type { ListItem } from '@/components/manage/manage-table/types';

export const useManageMovies = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { searchTerm, debouncedSearch, handleSearch } = useSearch();

  const { data: movies, isLoading } = useQuery({
    queryKey: ['get manage movies', debouncedSearch],
    queryFn: () => movieService.getAll(debouncedSearch),
    select: ({ data }) =>
      data.map<ListItem>((movie) => ({
        id: movie.id,
        viewUrl: PUBLIC_ROUTES.movie(movie.slug),
        editUrl: ADMIN_ROUTES.movieEdit(movie.id),
        items: [movie.title, getGenresString(movie.genres), String(movie.views)],
      })),
  });

  const { mutateAsync: createAsync } = useMutation({
    mutationKey: ['create movie'],
    mutationFn: () => movieService.create(),
    onSuccess({ data: id }) {
      queryClient.invalidateQueries({
        queryKey: ['get manage movies'],
      });
      toast.success('Фильм успешно создан');
      router.push(ADMIN_ROUTES.movieEdit(id));
    },
    onError: () => {
      toast.error('При создании возникла ошибка');
    },
  });

  const { mutateAsync: deleteAsync } = useMutation({
    mutationKey: ['delete movie'],
    mutationFn: (id: string) => movieService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage movies'],
      });
      toast.success('Фильм успешно удалён');
    },
    onError: () => {
      toast.error('При удалении возникла ошибка');
    },
  });

  return React.useMemo(
    () =>
      ({
        movies,
        isLoading,
        searchTerm,
        handleSearch,
        createAsync,
        deleteAsync,
      } as const),
    [movies, isLoading, searchTerm, handleSearch, createAsync, deleteAsync]
  );
};
