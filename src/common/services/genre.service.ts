import { api, apiWithAuth } from '../api';
import { API } from '../constants';
import type { Genre, GenreEditInput } from '@/types/genre.types';

class GenreService {
  async getAll(searchTerm?: string) {
    return api.get<Genre[]>(API.genres(), {
      params: { searchTerm },
    });
  }

  async getById(id: string, token?: string) {
    return apiWithAuth.get<Genre>(
      API.genres(`id/${id}`),
      token
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {}
    );
  }

  async getBySlug(slug: string) {
    return api.get<Genre>(API.genres(`slug/${slug}`));
  }

  async create() {
    return apiWithAuth.post<string>(API.genres());
  }

  async update(id: string, data: GenreEditInput) {
    return apiWithAuth.patch<Genre>(API.genres(`${id}`), data);
  }

  async delete(id: string) {
    return apiWithAuth.delete<Genre>(API.genres(`${id}`));
  }
}

export const genreService = new GenreService();
