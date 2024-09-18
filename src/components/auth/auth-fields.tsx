import React from 'react';

import { validEmail } from './utils';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { AuthForm } from '@/types/auth.types';

import { Field } from '../ui/form';

interface Props {
  isLoginForm?: boolean;
  register: UseFormRegister<AuthForm>;
  errors: FieldErrors<AuthForm>;
}

export const AuthFields: React.FC<Props> = ({ isLoginForm, register, errors }) => {
  return (
    <>
      {!isLoginForm && (
        <Field
          label="Имя"
          error={errors.name}
          {...register('name', {
            required: 'Имя обязательно',
            minLength: {
              value: 2,
              message: 'Имя должно содержать не менее 2-х символов',
            },
          })}
        />
      )}
      <Field
        label="Email"
        error={errors.email}
        {...register('email', {
          required: 'Email обязателен',
          pattern: {
            value: validEmail,
            message: 'Введите корректный email',
          },
        })}
      />
      <Field
        label="Пароль"
        type="password"
        error={errors.password}
        {...register('password', {
          required: 'Пароль обязателен',
          minLength: {
            value: 6,
            message: 'Пароль должен содержать не менее 6-ти символов',
          },
        })}
      />
    </>
  );
};
