import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { genreService } from '@/common/services/genre.service';
import type { SubmitHandler } from 'react-hook-form';
import type { GenreEditInput } from '@/types/genre.types';

export const useGenreEdit = (genreId: string) => {
  const queryClient = useQueryClient();

  const { data: genre, isLoading } = useQuery({
    queryKey: ['genre', genreId],
    queryFn: () => genreService.getById(genreId),
    enabled: Boolean(genreId),
    select: ({ data }) => data,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['update genre'],
    mutationFn: (values: GenreEditInput) => genreService.update(genreId, values),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage genres'],
      });
      toast.success('Жанр успешно обновлён');
    },
    onError() {
      toast.error('При обновлении возникла ошибка');
    },
  });

  const onSubmit: SubmitHandler<GenreEditInput> = async (values) => {
    await mutateAsync(values);
  };

  return { genre, isLoading, isPending, onSubmit } as const;
};
