'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import cn from 'clsx';

import type { MenuItem as IMenuItem } from '../types';

import { Icon } from '@/components/ui';
import styles from './menu.module.scss';

interface Props {
  item: IMenuItem;
}

export const MenuItem: React.FC<Props> = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.link}
      className={cn(styles.item, {
        [styles.active]: pathname === item.link,
      })}
    >
      <Icon className={styles.icon} name={item.icon} />
      {item.value}
    </Link>
  );
};
