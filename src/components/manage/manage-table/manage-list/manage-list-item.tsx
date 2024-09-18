import React from 'react';

import type { ListItem } from '../types';

import { ManageActions } from './manage-actions';
import styles from './manage-list.module.scss';

interface Props {
  listItem: ListItem;
  removeHandler?: VoidFunction;
}

export const ManageListItem: React.FC<Props> = ({ listItem, removeHandler }) => {
  return (
    <div className={styles.item}>
      {listItem.items.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
      <ManageActions
        viewUrl={listItem.viewUrl}
        editUrl={listItem.editUrl}
        removeHandler={removeHandler}
      />
    </div>
  );
};
