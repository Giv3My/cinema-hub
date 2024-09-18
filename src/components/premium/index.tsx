'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useProfile } from '@/common/hooks/react-query/users';
import { paymentService } from '@/common/services/payment.service';
import { convertPrice } from '@/common/utils';
import { DASHBOARD_ROUTES, PUBLIC_ROUTES } from '@/common/constants';

import { Heading } from '../ui';
import { Button } from '../ui/form';
import { BsCheckCircle } from 'react-icons/bs';
import { LuLoader } from 'react-icons/lu';
import styles from './premium.module.scss';

interface Props {}

export const Premium = (props: Props) => {
  const router = useRouter();
  const { user, isLoading } = useProfile();

  const { mutate, isPending } = useMutation({
    mutationKey: ['checkout'],
    mutationFn: (amount: number) => paymentService.checkout(amount),
    onSuccess({ data }) {
      toast.success('Платёж успешно создан');

      location.href = data;
    },
    onError() {
      toast.error('При создании платежа возникла ошибка');
    },
  });

  const handleClick = (amount: number) => () => {
    user?.isHasPremium
      ? router.push(DASHBOARD_ROUTES.home())
      : user
      ? mutate(amount)
      : router.push(PUBLIC_ROUTES.auth());
  };

  return (
    <div className={styles.wrapper}>
      <Heading className={styles.heading}>Оформить подписку</Heading>
      <div className={styles.description}>
        Приобретая премиум-подписку, вы получаете доступ к тысячам часов киноконтента в
        высоком качестве.
      </div>
      <div className={styles.card_wrapper}>
        <div className={styles.plan}>
          <h1 className={styles.heading}>{convertPrice(500)}</h1>

          <ul className={styles.features}>
            <li className={styles.feature}>
              <BsCheckCircle className={styles.icon} />
              Скачивание фильмов
            </li>
            <li className={styles.feature}>
              <BsCheckCircle className={styles.icon} />
              Отсутствие рекламы
            </li>
            <li className={styles.feature}>
              <BsCheckCircle className={styles.icon} />
              Высокое качество потока
            </li>
          </ul>
          <Button onClick={handleClick(500)} className={styles.button}>
            {isLoading || isPending ? (
              <LuLoader className={styles.loader} />
            ) : user?.isHasPremium ? (
              'Перейти в кабинет'
            ) : (
              `Оплатить ${convertPrice(500)}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
