import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { Genres } from '@/components/manage/genres';

export const metadata: Metadata = {
  title: 'Жанры',
  ...NO_INDEX_PAGE,
};

export default function GenresPage() {
  return <Genres />;
}
