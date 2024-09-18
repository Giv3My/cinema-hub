import React from 'react';

import { useGenresMenu } from '@/common/hooks/react-query/genres';

import { Menu } from './menu';
import { SkeletonLoader } from '@/components/ui';

interface Props {}

export const GenreMenu: React.FC<Props> = ({}) => {
  const { genres, isLoading } = useGenresMenu();

  return isLoading ? (
    <div className="space-y-3">
      {[...Array(4)].map((_, index) => (
        <SkeletonLoader key={index} className="h-10 mx-4 mt-2" />
      ))}
    </div>
  ) : genres ? (
    <Menu menu={{ title: 'Популярные жанры', items: genres }} />
  ) : null;
};
