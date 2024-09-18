import { useQuery } from '@tanstack/react-query';

import { movieService } from '@/common/services/movie.service';
import type { Movie } from '@/types/movie.types';

export const useMovie = (slug: string, initialMovie: Movie) => {
  const { data: movie } = useQuery({
    queryKey: ['movie', initialMovie.id],
    queryFn: async () => (await movieService.getBySlug(slug)).data,
    initialData: initialMovie,
    enabled: Boolean(slug),
  });

  return { movie } as const;
};
