import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { Reviews } from '@/components/manage/reviews';

export const metadata: Metadata = {
  title: 'Отзывы',
  ...NO_INDEX_PAGE,
};

export default function ReviewsPage() {
  return <Reviews />;
}
