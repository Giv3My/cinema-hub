import React from 'react';

import type { ListItem } from '../types';

import { ManageListHeader } from './manage-list-header';
import { ManageListItem } from './manage-list-item';
import { Heading, SkeletonLoader } from '@/components/ui';
import styles from './manage-list.module.scss';

interface Props {
  isLoading: boolean;
  headerItems: string[];
  listItems: ListItem[];
  removeHandler?: (id: string) => void;
}

export const ManageList: React.FC<Props> = ({
  isLoading,
  headerItems,
  listItems,
  removeHandler,
}) => {
  const handleRemove = (id: string) => {
    return removeHandler ? () => removeHandler(id) : undefined;
  };

  return (
    <div className="mb-12">
      <ManageListHeader headerItems={headerItems} />
      {isLoading ? (
        <div className={styles.loading}>
          {[...Array(5)].map((_, index) => (
            <SkeletonLoader key={index} className="h-11" />
          ))}
        </div>
      ) : listItems.length ? (
        listItems.map((item) => (
          <ManageListItem
            key={item.id}
            listItem={item}
            removeHandler={handleRemove(item.id)}
          />
        ))
      ) : (
        <Heading as="h3" className={styles.not_found}>
          Данные отсутствуют
        </Heading>
      )}
    </div>
  );
};
