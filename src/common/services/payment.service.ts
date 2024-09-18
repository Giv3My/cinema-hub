import { apiWithAuth } from '../api';
import { API } from '../constants';
import type { Payment } from '@/types/payment.types';

class PaymentService {
  async getAll() {
    return apiWithAuth.get<Payment[]>(API.payments());
  }

  async checkout(amount: number) {
    return apiWithAuth.post<string>(API.payments(), {
      amount,
    });
  }

  async delete(id: string) {
    return apiWithAuth.delete<Payment>(API.payments(`${id}`));
  }
}

export const paymentService = new PaymentService();
