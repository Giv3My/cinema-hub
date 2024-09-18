'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { ADMIN_ROUTES } from '@/common/constants';

import { SidebarLogo } from './sidebar-logo';
import { SidebarMenuContainer } from './sidebar-menu-container';
import { SidebarSubscribe } from './sidebar-subscribe';
import styles from './sidebar.module.scss';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  const isAdminPage = pathname.includes(ADMIN_ROUTES.home());

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <SidebarLogo />
        <SidebarMenuContainer isAdminPage={isAdminPage} />
        <SidebarSubscribe isAdminPage={isAdminPage} />
      </div>
    </div>
  );
};
