'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { statisticsService } from '@/common/services/statistics.service';

import { StatisticItem } from './statistic-item';
import { StatisticItemSkeleton } from './statistic-item-skeleton';
import { Heading } from '@/components/ui';
import styles from './main-statistics.module.scss';

export const MainStatistics: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['main statistics'],
    queryFn: () => statisticsService.getMain(),
    select: ({ data }) => data,
  });

  return (
    <div>
      <Heading>Статистика</Heading>
      <div className={styles.main_statistics}>
        {isLoading
          ? [...Array(4)].map((_, index) => <StatisticItemSkeleton key={index} />)
          : data
          ? data.map((item) => <StatisticItem key={item.id} item={item} />)
          : null}
      </div>
    </div>
  );
};
