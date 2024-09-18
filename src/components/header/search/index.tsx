'use client';

import React from 'react';
import { useClickAway } from 'react-use';

import { useMovies } from '@/common/hooks/react-query/movies';

import { SearchInput } from '@/components/search-input';
import { SearchList } from './search-list';
import styles from './search.module.scss';

interface Props {}

export const Search: React.FC<Props> = ({}) => {
  const { movies, isSuccess, searchTerm, handleSearch, clearSearch } = useMovies();
  const [isFocused, setIsFocused] = React.useState(false);

  const searchRef = React.useRef<HTMLInputElement | null>(null);

  useClickAway(searchRef, () => {
    setIsFocused(false);
  });

  const handleSearchClick = () => {
    setIsFocused(true);
  };

  const handleMovieItemClick = () => {
    setIsFocused(false);
    clearSearch();
  };

  return (
    <div ref={searchRef} className={styles.search}>
      <SearchInput
        searchTerm={searchTerm}
        onClick={handleSearchClick}
        handleSearch={handleSearch}
      />
      {isFocused && isSuccess && (
        <SearchList movies={movies || []} onMovieItemClick={handleMovieItemClick} />
      )}
    </div>
  );
};
