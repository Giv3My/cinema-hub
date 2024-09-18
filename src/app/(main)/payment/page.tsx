import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import { DASHBOARD_ROUTES, NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';
import type { PagePaymentStatusSearchParam } from '@/types/page-params.types';

import { Heading } from '@/components/ui';
import { Button } from '@/components/ui/form/button';
import success from '@/assets/images/success.png';
import failure from '@/assets/images/failure.png';
import styles from './payment.module.scss';

export const metadata: Metadata = {
  title: 'Статус оплаты',
  ...NO_INDEX_PAGE,
};

export default function PaymentPage({
  searchParams: { status },
}: PagePaymentStatusSearchParam) {
  if (!status || (status !== 'success' && status !== 'failure')) {
    redirect('/404');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.area}>
        {status === 'success' ? (
          <>
            <Image src={success} width={60} height={60} alt="success" />
            <Heading className={styles.heading}>Оплата прошла успешно</Heading>
            <p>Спасибо за приобретение на нашем сайте.</p>
          </>
        ) : (
          <>
            <Image src={failure} width={60} height={60} alt="failure" />
            <Heading className={styles.heading}>Ошибка оплаты</Heading>
            <p className="text-center">
              Во время оплаты произошла ошибка.
              <br />
              Повторите попытку позже.
            </p>
          </>
        )}
        <Link href={DASHBOARD_ROUTES.home()}>
          <Button>Перейти в личный кабинет</Button>
        </Link>
      </div>
    </div>
  );
}
