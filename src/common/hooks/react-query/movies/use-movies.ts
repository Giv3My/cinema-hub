import { useQuery } from '@tanstack/react-query';

import { useSearch } from '@/common/hooks';
import { movieService } from '@/common/services/movie.service';

export const useMovies = () => {
  const { searchTerm, debouncedSearch, handleSearch, clearSearch } = useSearch();

  const { data: movies, isSuccess } = useQuery({
    queryKey: ['get movies', debouncedSearch],
    queryFn: () => movieService.getAll(debouncedSearch),
    enabled: Boolean(debouncedSearch),
    select: ({ data }) => data,
  });

  return { movies, isSuccess, searchTerm, handleSearch, clearSearch } as const;
};
