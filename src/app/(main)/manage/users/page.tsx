import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { Users } from '@/components/manage/users';

export const metadata: Metadata = {
  title: 'Пользователи',
  ...NO_INDEX_PAGE,
};

export default function UsersPage() {
  return <Users />;
}
