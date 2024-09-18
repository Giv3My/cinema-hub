'use client';

import React from 'react';

import { useManageActors } from '@/common/hooks/react-query/actors';

import { ManageHeader } from '../manage-table/mange-header';
import { ManageList } from '../manage-table/manage-list';
import { Heading } from '@/components/ui';

const headerItems = ['Имя', 'Фильмы'];

export const Actors: React.FC = () => {
  const { actors, isLoading, searchTerm, handleSearch, createAsync, deleteAsync } =
    useManageActors();

  return (
    <div className="px-6">
      <Heading>Актёры</Heading>
      <ManageHeader
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        onClick={createAsync}
      />
      <ManageList
        headerItems={headerItems}
        listItems={actors || []}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </div>
  );
};
