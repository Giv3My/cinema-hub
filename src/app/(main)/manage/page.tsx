import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';

import { MainStatistics, MiddleStatistics } from '@/components/manage/statistics';

export const metadata: Metadata = {
  title: 'Панель администратора',
  ...NO_INDEX_PAGE,
};

export default function ManagePage() {
  return (
    <div className="px-6">
      <MainStatistics />
      <MiddleStatistics />
    </div>
  );
}
