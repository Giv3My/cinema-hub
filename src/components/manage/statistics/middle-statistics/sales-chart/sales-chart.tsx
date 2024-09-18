import React from 'react';

import type { SalesByWeek } from '@/types/statistics.types';

import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { SalesChartTooltip } from './sales-chart-tooltip';
import styles from './sales-chart.module.scss';

interface Props {
  data: SalesByWeek[];
}

export const SalesChart: React.FC<Props> = ({ data }) => {
  return (
    <div className={styles.sales_chart}>
      <ResponsiveContainer width="100%" height={390}>
        <BarChart data={data} width={500} height={300}>
          <XAxis
            dataKey="date"
            style={{ fontSize: '12px' }}
            tickMargin={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip cursor={{ fill: 'transparent' }} content={<SalesChartTooltip />} />
          <Bar
            dataKey="total"
            fill="#b61c1c"
            activeBar={<Rectangle fill="#9d1c1c" />}
            radius={[7, 7, 7, 7]}
            barSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
