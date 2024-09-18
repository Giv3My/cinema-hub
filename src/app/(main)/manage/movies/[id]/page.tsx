import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { movieService } from '@/common/services/movie.service';
import { NO_INDEX_PAGE } from '@/common/constants';
import type { Metadata } from 'next';
import type { PageIdParam } from '@/types/page-params.types';

import { MovieEdit } from '@/components/manage/movies';

export const metadata: Metadata = {
  title: 'Редактирование фильма',
  ...NO_INDEX_PAGE,
};

export default async function MovieEditPage({ params }: PageIdParam) {
  const cookieStorage = cookies();

  try {
    const token = cookieStorage.get('accessToken')?.value;

    await movieService.getById(params.id, token);
  } catch {
    notFound();
  }

  return <MovieEdit movieId={params.id} />;
}
