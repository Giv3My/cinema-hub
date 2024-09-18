import React from 'react';

import { SkeletonLoader } from '@/components/ui';
import styles from './main-statistics.module.scss';

export const StatisticItemSkeleton: React.FC = () => {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <SkeletonLoader className="w-24 h-5" />
        <SkeletonLoader className="size-[22px]" />
      </div>
      <SkeletonLoader className="w-16 h-7 mt-2" />
    </div>
  );
};
