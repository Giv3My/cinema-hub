import { api, apiWithAuth } from '../api';
import { API } from '../constants';
import type { Actor, ActorEditInput } from '@/types/actor.types';

class ActorService {
  async getAll(searchTerm?: string) {
    return api.get<Actor[]>(API.actors(), {
      params: { searchTerm },
    });
  }

  async getById(id: string, token?: string) {
    return apiWithAuth.get<Actor>(
      API.actors(`id/${id}`),
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
    return api.get<Actor>(API.actors(`slug/${slug}`));
  }

  async create() {
    return apiWithAuth.post<string>(API.actors());
  }

  async update(id: string, data: ActorEditInput) {
    return apiWithAuth.patch<Actor>(API.actors(`${id}`), data);
  }

  async delete(id: string) {
    return apiWithAuth.delete<Actor>(API.actors(`${id}`));
  }
}

export const actorService = new ActorService();
