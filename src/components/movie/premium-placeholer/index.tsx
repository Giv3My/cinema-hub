import React from 'react';
import Link from 'next/link';

import { PUBLIC_ROUTES } from '@/common/constants';

import { Button } from '@/components/ui/form';
import styles from './premium-placeholer.module.scss';

export const PremiumPlaceholder: React.FC = () => {
  return (
    <div className={styles.placeholder}>
      <div>
        <p>Для просмотра фильмов необходимо оформить премиум-подписку.</p>
        <Link href={PUBLIC_ROUTES.premium()}>
          <Button className={styles.button} size="sm">
            Купить премиум
          </Button>
        </Link>
      </div>
    </div>
  );
};
