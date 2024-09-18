import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { authService } from '@/common/services/auth';
import { DASHBOARD_ROUTES } from '@/common/constants';
import type { UseFormReset } from 'react-hook-form';
import type { AuthForm } from '@/types/auth.types';

export const useAuthMutation = (isLoginForm: boolean, reset: UseFormReset<AuthForm>) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: (values: AuthForm) =>
      authService.main(isLoginForm ? 'login' : 'register', values),
    onSuccess() {
      toast.success(
        isLoginForm
          ? 'Вход в аккаунт выполнен успешно'
          : 'Регистрация аккаунта прошла успешно'
      );
      reset();
      router.push(DASHBOARD_ROUTES.home());
    },
    onError(error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Ошибка сервера. Повторите попытку позже');
      }
    },
  });

  return { mutate, isPending } as const;
};
