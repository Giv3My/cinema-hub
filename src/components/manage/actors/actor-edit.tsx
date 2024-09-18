'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import cn from 'clsx';

import { useActorEdit } from '@/common/hooks/react-query/actors';
import { generateSlug } from '@/common/utils';
import type { ActorEditInput } from '@/types/actor.types';

import { Heading, Loader, SkeletonLoader } from '@/components/ui';
import { Button, Field, SlugField, UploadField } from '@/components/ui/form';
import formStyles from '../manage-form.module.scss';

interface Props {
  actorId: string;
}

export const ActorEdit: React.FC<Props> = ({ actorId }) => {
  const { actor, isLoading, isPending, onSubmit } = useActorEdit(actorId);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<ActorEditInput>({
    mode: 'onBlur',
    values: {
      name: actor?.name || '',
      slug: actor?.slug || '',
      photoUrl: actor?.photoUrl || '',
    },
  });

  const handleGenerateSlug = () => {
    setValue('slug', generateSlug(getValues('name')));
  };

  return (
    <div className="px-6">
      <Heading>Редактирование актёра</Heading>
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
                })}
              />
              <SlugField
                className={formStyles.field}
                register={register}
                error={errors.slug}
                onClickGenerateSlug={handleGenerateSlug}
              />
              <Controller
                control={control}
                name="photoUrl"
                defaultValue=""
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <UploadField
                    className={cn(formStyles.field, 'mt-[15px]')}
                    label="Фотография"
                    folder="actors"
                    value={value}
                    onChange={onChange}
                    error={error}
                  />
                )}
                rules={{
                  required: 'Фотография обязательна',
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
