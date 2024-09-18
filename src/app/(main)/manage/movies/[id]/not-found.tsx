import Link from 'next/link';
import cn from 'clsx';

import { ADMIN_ROUTES } from '@/common/constants';

import { Heading } from '@/components/ui';
import styles from '@/app/[...not-found]/not-found.module.scss';

export default function MovieNotFoundPage() {
  return (
    <div className={cn(styles.wrapper, styles.manage)}>
      <div className={styles.area}>
        <Heading>404. Фильм не найден</Heading>
        <Link href={ADMIN_ROUTES.movies()} className={styles.link}>
          Перейти к фильмам
        </Link>
      </div>
    </div>
  );
}
