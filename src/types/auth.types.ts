import type { User } from './user.types';

export interface AuthForm {
  name?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
