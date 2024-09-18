import React from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { reviewService } from '@/common/services/review.service';
import type { ReviewCreateInput } from '@/types/review.types';

import { Rating } from 'react-simple-star-rating';
import { Heading, Loader } from '@/components/ui';
import { Button } from '@/components/ui/form';
import styles from './review-form.module.scss';

interface Props {
  movieId: string;
  setModalOpen: (isOpen: boolean) => void;
}

export const ReviewForm: React.FC<Props> = ({ movieId, setModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ReviewCreateInput>({
    mode: 'onBlur',
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['leave review'],
    mutationFn: (data: ReviewCreateInput) => reviewService.create(movieId, data),
    onSuccess() {
      toast.success('Отзыв успешно опубликован!');
      queryClient.refetchQueries({ queryKey: ['movie', movieId] });
      setModalOpen(false);
    },
    onError() {
      toast.error('При публикации отзыва возникла ошибка');
    },
  });

  const onSubmit: SubmitHandler<ReviewCreateInput> = (data) => {
    mutate(data);
    reset();
  };

  return (
    <div className={styles.rating_form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading className={styles.heading}>Написать отзыв</Heading>
        {isPending ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <div>
            <Controller
              control={control}
              name="rating"
              render={({ field: { value, onChange } }) => (
                <Rating
                  size={20}
                  initialValue={value}
                  SVGstyle={{
                    display: 'inline-block',
                  }}
                  onClick={onChange}
                  transition
                />
              )}
              rules={{
                required: 'Рейтинг обязателен',
              }}
            />
            <textarea
              {...register('text', {
                required: 'Текст обязателен',
              })}
              placeholder="Текст..."
              className={styles.textarea}
            />
            {errors && (
              <ul className={styles.errors}>
                {Object.values(errors).map((error) => (
                  <li>{error?.message}</li>
                ))}
              </ul>
            )}
            <div className="text-right mb-2 mt-8">
              <Button type="submit">Добавить</Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
