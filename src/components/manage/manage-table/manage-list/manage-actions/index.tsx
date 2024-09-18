'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { ListItem } from '../../types';

import { Icon } from '@/components/ui';
import styles from './manage-actions.module.scss';

interface Props extends Pick<ListItem, 'editUrl' | 'viewUrl'> {
  removeHandler?: VoidFunction;
}

export const ManageActions: React.FC<Props> = ({ editUrl, viewUrl, removeHandler }) => {
  const router = useRouter();

  const goToUrl = (url: string) => () => {
    router.push(url);
  };

  return (
    <div className={styles.actions}>
      {viewUrl && (
        <button onClick={goToUrl(viewUrl)}>
          <Icon name="LuExternalLink" />
        </button>
      )}
      {editUrl && (
        <button onClick={goToUrl(editUrl)}>
          <Icon name="LuPencil" />
        </button>
      )}
      {removeHandler && (
        <button onClick={removeHandler}>
          <Icon name="LuTrash" />
        </button>
      )}
    </div>
  );
};
