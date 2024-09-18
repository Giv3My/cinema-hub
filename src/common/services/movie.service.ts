import { api, apiWithAuth } from '../api';
import { API } from '../constants';
import type { Movie, MovieEditInput } from '@/types/movie.types';

class MovieService {
  async getAll(searchTerm?: string) {
    return api.get<Movie[]>(API.movies(), {
      params: { searchTerm },
    });
  }

  async getMostPopularMovies() {
    return api.get<Movie[]>(API.movies('popular'));
  }

  async getById(id: string, token?: string) {
    return apiWithAuth.get<Movie>(
      API.movies(`id/${id}`),
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
    return api.get<Movie>(API.movies(`slug/${slug}`));
  }

  async getByActor(actorId: string) {
    return api.get<Movie[]>(API.movies(`actor/${actorId}`));
  }

  async getByGenres(genreIds: string[]) {
    return api.post<Movie[]>(API.movies('genres'), { genreIds });
  }

  async updateViewsCount(slug: string) {
    return api.patch<Movie>(API.movies('views'), { slug });
  }

  async create() {
    return apiWithAuth.post<string>(API.movies());
  }

  async update(id: string, data: MovieEditInput) {
    return apiWithAuth.patch<Movie>(API.movies(`${id}`), data);
  }

  async delete(id: string) {
    return apiWithAuth.delete<Movie>(API.movies(`${id}`));
  }
}

export const movieService = new MovieService();
