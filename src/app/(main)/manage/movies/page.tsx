import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { Movies } from '@/components/manage/movies';

export const metadata: Metadata = {
  title: 'Фильмы',
  ...NO_INDEX_PAGE,
};

export default function MoviesPage() {
  return <Movies />;
}
