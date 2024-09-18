import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { actorService } from '@/common/services/actor.service';
import type { SubmitHandler } from 'react-hook-form';
import type { ActorEditInput } from '@/types/actor.types';

export const useActorEdit = (actorId: string) => {
  const queryClient = useQueryClient();

  const { data: actor, isLoading } = useQuery({
    queryKey: ['actor', actorId],
    queryFn: () => actorService.getById(actorId),
    enabled: Boolean(actorId),
    select: ({ data }) => data,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['update actor'],
    mutationFn: (values: ActorEditInput) => {
      return actorService.update(actorId, values);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['get manage actors'],
      });
      toast.success('Актёр успешно обновлён');
    },
    onError() {
      toast.error('При обновлении возникла ошибка');
    },
  });

  const onSubmit: SubmitHandler<ActorEditInput> = async (values) => {
    await mutateAsync(values);
  };

  return { actor, isLoading, isPending, onSubmit };
};
