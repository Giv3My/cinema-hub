import type { Movie } from './movie.types';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarPath: string;
  role: UserRole;
  isHasPremium: boolean;
  favorites: Movie[];
}

export interface UserEditInput extends Pick<User, 'name' | 'email' | 'role'> {}
