import React from 'react';

import type { Movie } from '@/types/movie.types';

import { GalleryItem } from '../gallery/gallery-item';
import { Heading, Description, SkeletonLoader } from '../ui';
import styles from './catalog.module.scss';
import { PUBLIC_ROUTES } from '@/common/constants';

interface Props {
  title?: string;
  description?: string;
  movies: Movie[];
  isLoading?: boolean;
}

export const Catalog: React.FC<Props> = ({ movies, title, description, isLoading }) => {
  return (
    <div>
      <Heading className={styles.heading}>{title}</Heading>
      {description && <Description text={description} />}
      <section className={styles.movies}>
        {isLoading ? (
          [...Array(8)].map((_, index) => (
            <SkeletonLoader key={index} className={styles.loading} />
          ))
        ) : movies.length ? (
          movies.map((movie) => (
            <GalleryItem
              key={movie.id}
              variant="horizontal"
              item={{
                name: movie.title,
                poster: movie.poster,
                link: PUBLIC_ROUTES.movie(movie.slug),
                content: {
                  title: movie.title,
                },
              }}
            />
          ))
        ) : (
          <p className={styles.not_found}>Фильмы не найдены</p>
        )}
      </section>
    </div>
  );
};
