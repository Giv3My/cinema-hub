'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { statisticsService } from '@/common/services/statistics.service';

import { TopMovies, TopMoviesLoader } from './top-movies';
import { SalesChart, SalesChartLoader } from './sales-chart';
import styles from './middle-statistics.module.scss';

export const MiddleStatistics: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['middle statistics'],
    queryFn: () => statisticsService.getMiddle(),
    select: ({ data }) => data,
  });

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.top_movies}>
          <TopMoviesLoader />
        </div>
        <div className={styles.sales_chart}>
          <SalesChartLoader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {data ? (
        <>
          <div className={styles.top_movies}>
            <TopMovies data={data.topMovies} />
          </div>
          <div className={styles.sales_chart}>
            <SalesChart data={data.salesByWeek} />
          </div>
        </>
      ) : null}
    </div>
  );
};
