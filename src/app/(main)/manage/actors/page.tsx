import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { Actors } from '@/components/manage/actors';

export const metadata: Metadata = {
  title: 'Актёры',
  ...NO_INDEX_PAGE,
};

export default function ActorsPage() {
  return <Actors />;
}
