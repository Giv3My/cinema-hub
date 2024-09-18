import Link from 'next/link';

import { NO_INDEX_PAGE, PUBLIC_ROUTES } from '@/common/constants';
import type { Metadata } from 'next';

import { Heading } from '@/components/ui';
import styles from './not-found.module.scss';

export const metadata: Metadata = {
  title: 'Страница не найдена',
  ...NO_INDEX_PAGE,
};

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.area}>
        <Heading>404. Страница не найдена</Heading>
        <p>Хм, похоже, этой страницы не существует.</p>
        <Link href={PUBLIC_ROUTES.home()} className={styles.link}>
          Перейти на главную
        </Link>
      </div>
    </div>
  );
}
