import { apiWithAuth } from '../api';
import { API } from '../constants';
import type { Review, ReviewCreateInput } from '@/types/review.types';

class ReviewService {
  async getAll() {
    return apiWithAuth.get<Review[]>(API.reviews());
  }

  async create(movieId: string, data: ReviewCreateInput) {
    return apiWithAuth.post<Review>(API.reviews(`create/${movieId}`), data);
  }

  async delete(id: string) {
    return apiWithAuth.delete<Review>(API.reviews(`${id}`));
  }
}

export const reviewService = new ReviewService();
