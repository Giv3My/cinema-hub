import { useQuery } from '@tanstack/react-query';

import { genreService } from '@/common/services/genre.service';
import { PUBLIC_ROUTES } from '@/common/constants';
import type { MenuItem } from '@/components/sidebar/sidebar-menu-container/types';

export const useGenresMenu = () => {
  const { data: genres, isLoading } = useQuery({
    queryKey: ['menu genres'],
    queryFn: () => genreService.getAll(),
    select: ({ data }) =>
      data.slice(0, 4).map<MenuItem>((genre) => ({
        value: genre.name,
        icon: genre.icon,
        link: PUBLIC_ROUTES.genre(genre.slug),
      })),
  });

  return { genres, isLoading } as const;
};
