'use client';

import React from 'react';

import { useManageMovies } from '@/common/hooks/react-query/movies';

import { ManageHeader } from '../manage-table/mange-header';
import { ManageList } from '../manage-table/manage-list';
import { Heading } from '@/components/ui';

const headerItems = ['Название', 'Жанры', 'Просмотры'];

export const Movies: React.FC = () => {
  const { movies, isLoading, searchTerm, handleSearch, createAsync, deleteAsync } =
    useManageMovies();

  return (
    <div className="px-6">
      <Heading>Фильмы</Heading>
      <ManageHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onClick={createAsync}
      />
      <ManageList
        headerItems={headerItems}
        listItems={movies || []}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </div>
  );
};
