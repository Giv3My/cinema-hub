'use client';

import React from 'react';

import { useProfile } from '@/common/hooks/react-query/users';

import { Catalog } from '../catalog-movies';

export const Favorites: React.FC = () => {
  const { user, isLoading } = useProfile();

  return (
    <div className="px-6">
      <Catalog title="Избранное" movies={user?.favorites || []} isLoading={isLoading} />
    </div>
  );
};
