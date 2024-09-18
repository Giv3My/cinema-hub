import React from 'react';

import type { Menu as IMenu } from '../types';

import { Heading } from '@/components/ui';
import { MenuItem } from './menu-item';
import styles from './menu.module.scss';

interface Props {
  menu: IMenu;
}

export const Menu: React.FC<Props> = ({ menu }) => {
  return (
    <div className={styles.menu}>
      <Heading className={styles.heading}>{menu.title}</Heading>
      <div className={styles.items}>
        {menu.items.map((item) => (
          <MenuItem key={item.link} item={item} />
        ))}
      </div>
    </div>
  );
};
