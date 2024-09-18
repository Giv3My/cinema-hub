import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { PUBLIC_ROUTES } from '@/common/constants';
import type { Movie } from '@/types/movie.types';

import { Heading } from '@/components/ui';
import styles from './search-list.module.scss';

interface Props {
  movies: Movie[];
  onMovieItemClick: VoidFunction;
}

export const SearchList: React.FC<Props> = ({ movies, onMovieItemClick }) => {
  return (
    <div className={styles.list}>
      {movies.length ? (
        movies.map((movie) => (
          <Link
            key={movie.id}
            href={PUBLIC_ROUTES.movie(movie.slug)}
            className={styles.item}
            onClick={onMovieItemClick}
          >
            <Image
              src={movie.poster}
              width={70}
              height={80}
              className="object-cover object-top rounded-md"
              alt={movie.title}
            />
          </Link>
        ))
      ) : (
        <Heading as="h3" className={styles.not_found}>
          Ничего не найдено
        </Heading>
      )}
    </div>
  );
};
