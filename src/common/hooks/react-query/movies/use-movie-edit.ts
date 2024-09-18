import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { movieService } from '@/common/services/movie.service';
import { genreService } from '@/common/services/genre.service';
import { actorService } from '@/common/services/actor.service';
import type { SubmitHandler } from 'react-hook-form';
import type { MovieEditInput } from '@/types/movie.types';
import type { Option } from '@/components/ui/form';

export const useMovieEdit = (movieId: string) => {
  const queryClient = useQueryClient();

  const { data: movie, isLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => movieService.getById(movieId),
    enabled: Boolean(movieId),
    select: ({ data }) => data,
  });

  const { data: genres, isLoading: isGenresLoading } = useQuery({
    queryKey: ['get genres for movie edit'],
    queryFn: () => genreService.getAll(),
    select: ({ data }) =>
      data.map<Option>((genre) => ({
        label: genre.name,
        value: genre.id,
      })),
  });

  const { data: actors, isLoading: isActorsLoading } = useQuery({
    queryKey: ['get actors for movie edit'],
    queryFn: () => actorService.getAll(),
    select: ({ data }) =>
      data.map<Option>((actor) => ({
        label: actor.name,
        value: actor.id,
      })),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['update movie'],
    mutationFn: (values: MovieEditInput) => {
      return movieService.update(movieId, values);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage movies'],
      });
      toast.success('Фильм успешно обновлён');
    },
    onError() {
      toast.error('При обновлении возникла ошибка');
    },
  });

  const onSubmit: SubmitHandler<MovieEditInput> = async (values) => {
    values.year = Number(values.year);
    values.duration = Number(values.duration);

    await mutateAsync(values);
  };

  return {
    movie,
    genres,
    actors,
    isLoading,
    isGenresLoading,
    isActorsLoading,
    isPending,
    onSubmit,
  } as const;
};
