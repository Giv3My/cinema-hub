import React from 'react';
import { useMutation } from '@tanstack/react-query';

import { movieService } from '@/common/services/movie.service';

export const useUpdateCountViews = (slug: string) => {
  const { mutateAsync } = useMutation({
    mutationKey: ['update views count'],
    mutationFn: () => movieService.updateViewsCount(slug),
  });

  React.useEffect(() => {
    mutateAsync();
  }, []);
};
