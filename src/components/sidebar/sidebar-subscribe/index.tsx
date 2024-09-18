import React from 'react';
import Link from 'next/link';

import { useProfile } from '@/common/hooks/react-query/users';
import { PUBLIC_ROUTES } from '@/common/constants';

import { Heading } from '@/components/ui';
import { Button } from '@/components/ui/form';
import styles from './sidebar-subscribe.module.scss';

interface Props {
  isAdminPage: boolean;
}

export const SidebarSubscribe: React.FC<Props> = ({ isAdminPage }) => {
  const { user } = useProfile();

  return (
    !isAdminPage && (
      <div className={styles.subscribe}>
        <Heading as="h2" className={styles.heading}>
          {user?.isHasPremium ? 'У вас уже есть премиум' : 'Премиум подписка'}
        </Heading>
        <p>
          {user?.isHasPremium
            ? 'Вы уже имеете неограниченный доступ ко всем фильмам.'
            : 'С премиум-подпиской у вас неограниченный доступ ко всем фильмам.'}
        </p>
        <Link
          href={user?.isHasPremium ? PUBLIC_ROUTES.explorer() : PUBLIC_ROUTES.premium()}
        >
          <Button size="sm" className={styles.button}>
            {user?.isHasPremium ? 'Смотреть фильмы' : 'Оформить подписку'}
          </Button>
        </Link>
      </div>
    )
  );
};
