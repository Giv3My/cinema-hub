'use client';

import React from 'react';
import Image from 'next/image';
import { type SubmitHandler, useForm } from 'react-hook-form';

import { useAuthMutation } from '@/common/hooks/react-query/auth';
import { AuthForm } from '@/types/auth.types';

import { AuthFields } from './auth-fields';
import { Heading, Loader } from '../ui';
import { Button } from '../ui/form';
import authLogo from '@/assets/images/auth.svg';
import styles from './auth.module.scss';

export const Auth: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<AuthForm>({
    mode: 'onBlur',
  });

  const [isLoginForm, setIsLoginForm] = React.useState(true);

  const { mutate, isPending } = useAuthMutation(isLoginForm, reset);

  const toggleLoginForm = () => {
    setIsLoginForm((prev) => !prev);
    clearErrors();
  };

  const onSubmit: SubmitHandler<AuthForm> = (values) => {
    mutate(values);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Heading className={styles.heading}>
          {isLoginForm ? 'Войти в аккаунт' : 'Регистрация'}
        </Heading>
        <form className="w-[300px]" onSubmit={handleSubmit(onSubmit)}>
          <AuthFields isLoginForm={isLoginForm} register={register} errors={errors} />
          <Button type="submit" className={styles.button}>
            {isPending ? (
              <Loader className={styles.loader} />
            ) : isLoginForm ? (
              'Войти'
            ) : (
              'Создать аккаунт'
            )}
          </Button>
          <div className={styles.toggle}>
            <span>{isLoginForm ? 'Еще нет аккаунта? ' : 'Уже есть аккаунт? '}</span>
            <span className="text-primary" onClick={toggleLoginForm}>
              {isLoginForm ? 'Создать аккаунт' : 'Войти в аккаунт'}
            </span>
          </div>
        </form>
      </div>
      <div className={styles.right}>
        <Image src={authLogo} width={150} height={150} alt="auth-logo" />
      </div>
    </div>
  );
};
