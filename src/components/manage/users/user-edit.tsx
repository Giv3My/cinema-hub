'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useUserEdit } from '@/common/hooks/react-query/users';
import { validEmail } from '@/components/auth/utils';
import { UserRole, type UserEditInput } from '@/types/user.types';

import { Heading, Loader, SkeletonLoader } from '@/components/ui';
import { Button, Field, Select, type Option } from '@/components/ui/form';
import formStyles from '../manage-form.module.scss';

interface Props {
  userId: string;
}

const roles: Option[] = [
  {
    label: 'Пользователь',
    value: UserRole.USER,
  },
  {
    label: 'Администратор',
    value: UserRole.ADMIN,
  },
];

export const UserEdit: React.FC<Props> = ({ userId }) => {
  const { user, isLoading, isPending, onSubmit } = useUserEdit(userId);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<UserEditInput>({
    mode: 'onBlur',
    values: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || UserRole.USER,
    },
  });

  return (
    <div className="px-6">
      <Heading>Редактирование пользователя</Heading>
      <form className={formStyles.form} onSubmit={handleSubmit(onSubmit)}>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonLoader key={index} className="h-10" />
            ))}
          </div>
        ) : (
          <>
            <div className={formStyles.fields}>
              <Field
                className={formStyles.field}
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
              <Field
                className={formStyles.field}
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
              <Controller
                control={control}
                name="role"
                render={({ field, fieldState: { error } }) => (
                  <Select
                    className={formStyles.field}
                    label="Жанры"
                    field={field}
                    options={roles}
                    error={error}
                  />
                )}
                rules={{
                  required: 'Выберете роль',
                }}
              />
            </div>
            <Button type="submit">
              {isPending ? <Loader className={formStyles.loader} /> : 'Сохранить'}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};
