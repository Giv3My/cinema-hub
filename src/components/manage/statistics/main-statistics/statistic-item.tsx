import React from 'react';

import { getIcon } from './utils';
import type { StatisticItem as IStatisticItem } from '@/types/statistics.types';

import CountUp from 'react-countup';
import { Heading } from '@/components/ui';
import styles from './main-statistics.module.scss';

interface Props {
  item: IStatisticItem;
}

export const StatisticItem: React.FC<Props> = ({ item }) => {
  const Icon = getIcon(item.id);

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <p className={styles.name}>{item.name}</p>
        <Icon className={styles.icon} />
      </div>
      <Heading>
        <CountUp end={item.value} />
      </Heading>
    </div>
  );
};
