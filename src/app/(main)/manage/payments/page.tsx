import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { Payments } from '@/components/manage/payments';

export const metadata: Metadata = {
  title: 'Платежи',
  ...NO_INDEX_PAGE,
};

export default function PaymentsPage() {
  return <Payments />;
}
