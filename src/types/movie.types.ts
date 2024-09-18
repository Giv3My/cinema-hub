import type { Actor } from './actor.types';
import type { Genre } from './genre.types';
import type { Review } from './review.types';

export interface Movie {
  id: string;
  poster: string;
  bigPoster: string;
  title: string;
  year: number;
  slug: string;
  videoUrl: string;
  duration: number;
  views: number;
  country: string;
  genres: Genre[];
  actors: Actor[];
  reviews: Review[];
}

export interface MovieEditInput
  extends Omit<Movie, 'id' | 'views' | 'reviews' | 'genres' | 'actors'> {
  genres: string[];
  actors: string[];
}
