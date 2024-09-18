'use client';

import React from 'react';

import { useManageGenres } from '@/common/hooks/react-query/genres';

import { ManageHeader } from '../manage-table/mange-header';
import { ManageList } from '../manage-table/manage-list';
import { Heading } from '@/components/ui';

const headerItems = ['Название', 'Ссылка'];

export const Genres: React.FC = () => {
  const { genres, isLoading, searchTerm, handleSearch, createAsync, deleteAsync } =
    useManageGenres();

  return (
    <div className="px-6">
      <Heading>Жанры</Heading>
      <ManageHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onClick={createAsync}
      />
      <ManageList
        headerItems={headerItems}
        listItems={genres || []}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </div>
  );
};
