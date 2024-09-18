'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useProfile } from '@/common/hooks/react-query/users';
import { authService } from '@/common/services/auth';
import { PUBLIC_ROUTES } from '@/common/constants';

import { Heading } from '../ui';
import { Button } from '../ui/form';
import styles from './dashboard.module.scss';

export const Dashboard: React.FC = () => {
  const router = useRouter();
  const { user } = useProfile();

  if (!user) {
    return null;
  }

  const logout = async () => {
    await authService.logout();
    router.push(PUBLIC_ROUTES.auth());
  };

  return (
    <div className="px-6">
      <div className={styles.wrapper}>
        <Heading className={styles.heading}>Привет, {user.name}</Heading>
        <div className={styles.avatar}>
          <Image
            src={user.avatarPath}
            className="rounded-md"
            width={180}
            height={180}
            alt={user.name}
          />
        </div>
        <Button className={styles.button} variant="outlined" onClick={logout}>
          Выйти
        </Button>
      </div>
    </div>
  );
};
