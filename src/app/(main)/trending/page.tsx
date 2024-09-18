import { movieService } from '@/common/services/movie.service';
import type { Metadata } from 'next';

import { Catalog } from '@/components/catalog-movies';

export const metadata: Metadata = {
  title: 'Популярные фильмы',
};

export const revalidate = 60;

const getMovies = async () => {
  const { data } = await movieService.getMostPopularMovies();

  return data;
};

export default async function TrendingPage() {
  try {
    const movies = await getMovies();

    return (
      <div className="px-6">
        <Catalog
          title="Популярные фильмы"
          description="Актуальные фильмы в отличном качестве: легально, безопасно, без рекламы."
          movies={movies}
        />
      </div>
    );
  } catch {
    return null;
  }
}
