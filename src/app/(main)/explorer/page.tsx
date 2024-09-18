import { movieService } from '@/common/services/movie.service';
import type { Metadata } from 'next';

import { Catalog } from '@/components/catalog-movies';

export const metadata: Metadata = {
  title: 'Новые фильмы',
};

export const revalidate = 60;

const getMovies = async () => {
  const { data } = await movieService.getAll();

  return data;
};

export default async function ExplorerPage() {
  try {
    const movies = await getMovies();

    return (
      <div className="px-6">
        <Catalog
          title="Новые фильмы"
          description="Новые фильмы и сериалы в отличном качестве: легально, безопасно, без рекламы."
          movies={movies}
        />
      </div>
    );
  } catch {
    return null;
  }
}
