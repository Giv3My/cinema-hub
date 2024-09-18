import { User } from './user.types';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
  CANCELLED = 'CANCELLED',
}

export interface Payment {
  id: string;
  user: User;
  amount: number;
  status: PaymentStatus;
  createdAt: string;
}
