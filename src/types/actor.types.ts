import type { Movie } from './movie.types';

export interface Actor {
  id: string;
  name: string;
  slug: string;
  photoUrl: string;
  movies: Movie[];
}

export interface ActorEditInput extends Omit<Actor, 'id' | 'movies'> {}
