import { useQuery } from '@tanstack/react-query';

import { userService } from '@/common/services/user.service';

export const useProfile = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.getProfile(),
    select: ({ data }) => data,
    retry: 0,
  });

  return { user, isLoading } as const;
};
