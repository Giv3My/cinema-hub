'use client';

import React from 'react';

import { useProfile } from '@/common/hooks/react-query/users';
import { formatMovieRating } from '@/common/utils';
import { PUBLIC_ROUTES } from '@/common/constants';
import type { Movie } from '@/types/movie.types';

import { ContentList } from './content-list';
import { FavoriteButton } from './favorite-button';
import { Heading } from '@/components/ui';
import { MdStarRate } from 'react-icons/md';
import styles from './content.module.scss';

interface Props {
  movie: Movie;
}

export const Content: React.FC<Props> = ({ movie }) => {
  const { user } = useProfile();

  const movieRating = Math.round(
    movie.reviews.reduce((acc, review) => acc + review.rating, 0) /
      (movie.reviews.length || 1)
  );

  const genresLinks = movie.genres.slice(0, 3).map((genre) => ({
    id: genre.id,
    title: genre.name,
    href: PUBLIC_ROUTES.genre(genre.slug),
  }));

  const actorsLinks = movie.actors.slice(0, 3).map((actor) => ({
    id: actor.id,
    title: actor.name,
    href: PUBLIC_ROUTES.actor(actor.slug),
  }));

  return (
    <div className={styles.content}>
      <div className="flex items-center gap-x-4">
        <Heading>{movie.title}</Heading>
        <div className={styles.rating}>
          <MdStarRate />
          <span>{formatMovieRating(movieRating)}</span>
        </div>
        {user && <FavoriteButton movieId={movie.id} />}
      </div>
      <div className={styles.details}>
        <span>{movie.year} • </span>
        <span>{movie.country} • </span>
        <span>{movie.duration} мин </span>
      </div>
      <ContentList name="Жанры:" links={genresLinks} />
      <ContentList name="Актёры:" links={actorsLinks} />
    </div>
  );
};
