import React from 'react';

import { Search } from './search';
import { UserMenu } from './user-menu';
import styles from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Search />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
