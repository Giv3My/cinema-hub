import React from 'react';

import type { Payload } from 'recharts/types/component/DefaultTooltipContent';
import styles from '../middle-statistics.module.scss';

interface Props {
  active?: boolean;
  payload?: Payload<'', ''>[];
}

export const TopMoviesTooltip: React.FC<Props> = ({ active, payload }) => {
  if (!active) return null;

  const title = payload?.[0].payload?.title;
  const value = payload?.[0].value;

  return (
    <div className={styles.tooltip}>
      <p className={styles.title}>{title}</p>
      <p className={styles.value}>
        Просмотры:
        <span className="ml-2">{value}</span>
      </p>
    </div>
  );
};
