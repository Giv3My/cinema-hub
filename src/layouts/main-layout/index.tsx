import React from 'react';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import styles from './main-layout.module.scss';

export const MainLayoutComponent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className="flex-1">
        <Header />
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};
