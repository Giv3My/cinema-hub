import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { userService } from '@/common/services/user.service';
import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';
import type { PageIdParam } from '@/types/page-params.types';

import { UserEdit } from '@/components/manage/users';

export const metadata: Metadata = {
  title: 'Редактирование пользователя',
  ...NO_INDEX_PAGE,
};

export default async function UserEditPage({ params }: PageIdParam) {
  const cookieStorage = cookies();

  try {
    const token = cookieStorage.get('accessToken')?.value;

    await userService.getById(params.id, token);
  } catch {
    notFound();
  }

  return <UserEdit userId={params.id} />;
}
