import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { actorService } from '@/common/services/actor.service';
import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';
import type { PageIdParam } from '@/types/page-params.types';

import { ActorEdit } from '@/components/manage/actors';

export const metadata: Metadata = {
  title: 'Редактирование актёра',
  ...NO_INDEX_PAGE,
};

export default async function ActorEditPage({ params }: PageIdParam) {
  const cookieStorage = cookies();

  try {
    const token = cookieStorage.get('accessToken')?.value;

    await actorService.getById(params.id, token);
  } catch {
    notFound();
  }

  return <ActorEdit actorId={params.id} />;
}
