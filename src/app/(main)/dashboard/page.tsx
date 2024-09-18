import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { Dashboard } from '@/components/dashboard';

export const metadata: Metadata = {
  title: 'Личный кабинет',
  ...NO_INDEX_PAGE,
};

export default function DashboardPage({}) {
  return <Dashboard />;
}
