import type { Genre } from '@/types/genre.types';

export const getGenresString = (genres: Pick<Genre, 'name'>[]) => {
  return genres.map(({ name }) => name).join(', ');
};
