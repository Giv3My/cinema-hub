import React from 'react';
import cn from 'clsx';

import styles from './manage-list.module.scss';

interface Props {
  headerItems: string[];
}

export const ManageListHeader: React.FC<Props> = ({ headerItems }) => {
  return (
    <div className={cn(styles.item, styles.item_header)}>
      {headerItems.map((item) => (
        <div key={item}>{item}</div>
      ))}
      <div>Действия</div>
    </div>
  );
};
