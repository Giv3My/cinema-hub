import React from 'react';

import { Loader } from '@/components/ui';
import styles from './sales-chart.module.scss';

export const SalesChartLoader: React.FC = () => {
  return (
    <div className={styles.sales_chart}>
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    </div>
  );
};
