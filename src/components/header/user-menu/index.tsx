'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useProfile } from '@/common/hooks/react-query/users';
import { ADMIN_ROUTES, DASHBOARD_ROUTES, PUBLIC_ROUTES } from '@/common/constants';
import { UserRole } from '@/types/user.types';

import { Icon } from '@/components/ui';
import { Button } from '@/components/ui/form';
import { LuLoader } from 'react-icons/lu';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import styles from './user-menu.module.scss';

export const UserMenu: React.FC = () => {
  const { user, isLoading } = useProfile();

  return (
    <div className={styles.wrapper}>
      {isLoading ? (
        <LuLoader className={styles.loader} />
      ) : user ? (
        <div className={styles.menu}>
          {user.role === UserRole.ADMIN && (
            <Link href={ADMIN_ROUTES.home()}>
              <MdOutlineAdminPanelSettings className={styles.icon} />
            </Link>
          )}
          <Link href={DASHBOARD_ROUTES.favorites()}>
            <AiOutlineHeart className={styles.icon} />
          </Link>
          <Link href={DASHBOARD_ROUTES.home()}>
            <Image
              src={user.avatarPath}
              width={42}
              height={42}
              className={styles.avatar}
              alt={user.name}
            />
          </Link>
        </div>
      ) : (
        <Link href={PUBLIC_ROUTES.auth()}>
          <Button variant="outlined" className="px-4">
            <Icon name="LuLogOut" className="mr-2 size-4" />
            Войти
          </Button>
        </Link>
      )}
    </div>
  );
};
