'use client';

import React from 'react';

import { useManageReviews } from '@/common/hooks/react-query/reviews';

import { ManageList } from '../manage-table/manage-list';
import { Heading } from '@/components/ui';

const headerItems = ['Рейтинг', 'Пользователь'];

export const Reviews: React.FC = () => {
  const { reviews, isLoading, deleteAsync } = useManageReviews();

  return (
    <div className="px-6">
      <Heading>Отзывы</Heading>
      <ManageList
        headerItems={headerItems}
        listItems={reviews || []}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </div>
  );
};
