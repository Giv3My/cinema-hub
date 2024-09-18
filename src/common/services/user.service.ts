import { apiWithAuth } from '../api';
import { API } from '../constants';
import type { User, UserEditInput } from '@/types/user.types';

class UserService {
  async getAll(searchTerm?: string) {
    return apiWithAuth.get<User[]>(API.users(), {
      params: { searchTerm },
    });
  }

  async getProfile(token?: string) {
    return apiWithAuth.get<User>(
      API.users('profile'),
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
  }

  async toggleFavorite(movieId: string) {
    return apiWithAuth.post(API.users('profile/favorites'), { movieId });
  }

  async getById(id: string, token?: string) {
    return apiWithAuth.get<User>(
      API.users(`id/${id}`),
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
  }

  async update(id: string, data: UserEditInput) {
    return apiWithAuth.patch<User>(API.users(`${id}`), data);
  }

  async delete(id: string) {
    return apiWithAuth.delete<User>(API.users(`${id}`));
  }
}

export const userService = new UserService();
