import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { genreService } from '@/common/services/genre.service';
import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';
import type { PageIdParam } from '@/types/page-params.types';

import { GenreEdit } from '@/components/manage/genres';

export const metadata: Metadata = {
  title: 'Редактирование жанра',
  ...NO_INDEX_PAGE,
};

export default async function GenreEditPage({ params }: PageIdParam) {
  const cookieStorage = cookies();

  try {
    const token = cookieStorage.get('accessToken')?.value;

    await genreService.getById(params.id, token);
  } catch {
    notFound();
  }

  return <GenreEdit genreId={params.id} />;
}
