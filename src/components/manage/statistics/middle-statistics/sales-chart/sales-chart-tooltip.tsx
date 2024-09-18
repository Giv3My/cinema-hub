import React from 'react';

import { convertPrice } from '@/common/utils';
import type { Payload } from 'recharts/types/component/DefaultTooltipContent';

import styles from '../middle-statistics.module.scss';

interface Props {
  active?: boolean;
  payload?: Payload<'', ''>[];
  label?: string;
}

export const SalesChartTooltip: React.FC<Props> = ({ active, payload, label }) => {
  if (!active || !payload?.length) {
    return null;
  }

  const price = convertPrice(Number(payload[0].value));

  return (
    <div className={styles.tooltip}>
      <p className={styles.title}>{label}</p>
      <p className={styles.value}>
        Прибыль:
        <span className="ml-2">{price}</span>
      </p>
    </div>
  );
};
