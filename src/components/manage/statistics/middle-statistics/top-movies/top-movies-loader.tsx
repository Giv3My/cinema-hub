import React from 'react';

import { Loader } from '@/components/ui';
import styles from './top-movies.module.scss';

export const TopMoviesLoader: React.FC = () => {
  return (
    <div className={styles.top_movies}>
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    </div>
  );
};
