import Link from 'next/link';
import cn from 'clsx';

import { ADMIN_ROUTES } from '@/common/constants';

import { Heading } from '@/components/ui';
import styles from '@/app/[...not-found]/not-found.module.scss';

export default function ActorNotFoundPage() {
  return (
    <div className={cn(styles.wrapper, styles.manage)}>
      <div className={styles.area}>
        <Heading>404. Актёр не найден</Heading>
        <Link href={ADMIN_ROUTES.actors()} className={styles.link}>
          Перейти к актёрам
        </Link>
      </div>
    </div>
  );
}
