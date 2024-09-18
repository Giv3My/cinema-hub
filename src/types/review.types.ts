import type { User } from './user.types';

export interface Review {
  id: string;
  rating: number;
  text: string;
  user: User;
  createdAt: string;
}

export interface ReviewCreateInput extends Pick<Review, 'rating' | 'text'> {}
