'use client';

import React from 'react';

import { useManagePayments } from '@/common/hooks/react-query/payments';

import { ManageList } from '../manage-table/manage-list';
import { Heading } from '@/components/ui';

const headerItems = ['Пользователь', 'Дата создания', 'Сумма', 'Статус'];

export const Payments: React.FC = () => {
  const { payments, isLoading, deleteAsync } = useManagePayments();

  return (
    <div className="px-6">
      <Heading>Платежи</Heading>
      <ManageList
        headerItems={headerItems}
        listItems={payments || []}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </div>
  );
};
