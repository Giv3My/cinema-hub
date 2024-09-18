'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useGenreEdit } from '@/common/hooks/react-query/genres';
import { generateSlug } from '@/common/utils';
import type { GenreEditInput } from '@/types/genre.types';

import { Heading, Loader, SkeletonLoader } from '@/components/ui';
import { Button, Field, SlugField, DynamicTextEditor } from '@/components/ui/form';
import formStyles from '../manage-form.module.scss';

interface Props {
  genreId: string;
}

export const GenreEdit: React.FC<Props> = ({ genreId }) => {
  const { genre, isLoading, isPending, onSubmit } = useGenreEdit(genreId);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<GenreEditInput>({
    mode: 'onBlur',
    values: {
      name: genre?.name || '',
      slug: genre?.slug || '',
      description: genre?.description || '',
      icon: genre?.icon! || '',
    },
  });

  const handleGenerateSlug = () => {
    setValue('slug', generateSlug(getValues('name')));
  };

  return (
    <div className="px-6">
      <Heading>Редактирование жанра</Heading>
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
                style={{ width: '31%' }}
                className={formStyles.field}
                label="Название"
                error={errors.name}
                {...register('name', {
                  required: 'Название обязательно',
                })}
              />
              <div style={{ width: '31%' }} className={formStyles.field}>
                <SlugField
                  register={register}
                  error={errors.slug}
                  onClickGenerateSlug={handleGenerateSlug}
                />
              </div>
              <Field
                style={{ width: '31%' }}
                className={formStyles.field}
                label="Иконка"
                error={errors.icon}
                {...register('icon', {
                  required: 'Иконка обязательна',
                })}
              />
            </div>
            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <DynamicTextEditor
                  label="Описание"
                  value={value}
                  onChange={onChange}
                  error={error}
                />
              )}
            />
            <Button type="submit">
              {isPending ? <Loader className={formStyles.loader} /> : 'Сохранить'}
            </Button>
          </>
        )}
      </form>
    </div>
  );
};
