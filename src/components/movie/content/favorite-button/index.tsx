'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useProfile } from '@/common/hooks/react-query/users';
import { userService } from '@/common/services/user.service';
import { AiFillHeart } from 'react-icons/ai';
import styles from './favorite-button.module.scss';

interface Props {
  movieId: string;
}

export const FavoriteButton: React.FC<Props> = ({ movieId }) => {
  const { user } = useProfile();

  if (!user) {
    return null;
  }

  const isExists = user.favorites.some((favorite) => favorite.id === movieId);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['toggle favorite'],
    mutationFn: () => userService.toggleFavorite(movieId),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
  });

  const handleClick = () => {
    mutate();
  };

  return (
    <button className={styles.button} disabled={isPending} onClick={handleClick}>
      {isExists ? (
        <AiFillHeart size={33} color="#f6004a" />
      ) : (
        <AiFillHeart size={33} opacity={0.7} />
      )}
    </button>
  );
};
