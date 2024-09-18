'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import cn from 'clsx';

import { useMovieEdit } from '@/common/hooks/react-query/movies';
import { generateSlug } from '@/common/utils';
import type { MovieEditInput } from '@/types/movie.types';

import { Heading, Loader, SkeletonLoader } from '@/components/ui';
import { Button, Field, Select, SlugField, UploadField } from '@/components/ui/form';
import formStyles from '../manage-form.module.scss';

interface Props {
  movieId: string;
}

export const MovieEdit: React.FC<Props> = ({ movieId }) => {
  const {
    movie,
    genres,
    actors,
    isLoading,
    isGenresLoading,
    isActorsLoading,
    isPending,
    onSubmit,
  } = useMovieEdit(movieId);

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<MovieEditInput>({
    mode: 'onBlur',
    values: {
      title: movie?.title || '',
      slug: movie?.slug || '',
      country: movie?.country || '',
      duration: movie?.duration || 0,
      year: movie?.year || 0,
      poster: movie?.poster || '',
      bigPoster: movie?.bigPoster || '',
      videoUrl: movie?.videoUrl || '',
      genres: movie?.genres?.map((genre) => genre.id) || [],
      actors: movie?.actors?.map((actor) => actor.id) || [],
    },
  });

  const handleGenerateSlug = () => {
    setValue('slug', generateSlug(getValues('title')));
  };

  return (
    <div className="px-6">
      <Heading>Редактирование фильма</Heading>
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
                label="Название"
                error={errors.title}
                {...register('title', {
                  required: 'Название обязательно',
                })}
              />
              <SlugField
                className={formStyles.field}
                register={register}
                error={errors.slug}
                onClickGenerateSlug={handleGenerateSlug}
              />
              <Field
                style={{ width: '31%' }}
                className={formStyles.field}
                label="Страна"
                error={errors.country}
                {...register('country', {
                  required: 'Страна обязательна',
                })}
              />
              <Field
                style={{ width: '31%' }}
                className={formStyles.field}
                label="Длительность (в мин)"
                error={errors.duration}
                {...register('duration', {
                  required: 'Длительность обязательно',
                })}
              />
              <Field
                style={{ width: '31%' }}
                className={formStyles.field}
                label="Год"
                error={errors.year}
                {...register('year', {
                  required: 'Год обязателен',
                })}
              />
              <Controller
                control={control}
                name="genres"
                render={({ field, fieldState: { error } }) => (
                  <Select
                    className={formStyles.field}
                    label="Жанры"
                    field={field}
                    options={genres || []}
                    isLoading={isGenresLoading}
                    error={error}
                    isMulti
                  />
                )}
                rules={{
                  required: 'Выберете хотя бы один жанр',
                }}
              />
              <Controller
                control={control}
                name="actors"
                render={({ field, fieldState: { error } }) => (
                  <Select
                    className={formStyles.field}
                    label="Актёры"
                    field={field}
                    options={actors || []}
                    isLoading={isActorsLoading}
                    error={error}
                    isMulti
                  />
                )}
                rules={{
                  required: 'Выберете хотя бы одного актёра',
                }}
              />
              <Controller
                control={control}
                name="poster"
                defaultValue=""
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <UploadField
                    className={formStyles.field}
                    label="Постер"
                    folder="movies"
                    value={value}
                    onChange={onChange}
                    error={error}
                  />
                )}
                rules={{
                  required: 'Постер обязателен',
                }}
              />
              <Controller
                control={control}
                name="bigPoster"
                defaultValue=""
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <UploadField
                    className={formStyles.field}
                    label="Большой постер"
                    folder="movies"
                    value={value}
                    onChange={onChange}
                    error={error}
                  />
                )}
                rules={{
                  required: 'Большой постер обязателен',
                }}
              />
              <Controller
                control={control}
                name="videoUrl"
                defaultValue=""
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <UploadField
                    className={cn(formStyles.field, 'mb-[35px]')}
                    label="Видео"
                    folder="movies"
                    value={value}
                    onChange={onChange}
                    error={error}
                    isImage={false}
                  />
                )}
                rules={{
                  required: 'Видео обязательно',
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
