'use client';

import React from 'react';

import { useManageUsers } from '@/common/hooks/react-query/users';

import { ManageHeader } from '../manage-table/mange-header';
import { ManageList } from '../manage-table/manage-list';
import { Heading } from '@/components/ui';

const headerItems = ['Имя', 'Почта', 'Роль'];

export const Users: React.FC = () => {
  const { users, isLoading, searchTerm, handleSearch, deleteAsync } = useManageUsers();

  return (
    <div className="px-6">
      <Heading>Пользователи</Heading>
      <ManageHeader searchTerm={searchTerm} handleSearch={handleSearch} />
      <ManageList
        headerItems={headerItems}
        listItems={users || []}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </div>
  );
};
