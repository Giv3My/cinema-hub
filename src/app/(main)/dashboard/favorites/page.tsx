import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { Favorites } from '@/components/dashboard';

export const metadata: Metadata = {
  title: 'Избранное',
  ...NO_INDEX_PAGE,
};

export default function FavoritesPage() {
  return <Favorites />;
}
