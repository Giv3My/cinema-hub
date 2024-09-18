import { movieService } from '@/common/services/movie.service';
import { getGenresString, getMovieWordWithEnding } from '@/common/utils';
import { PUBLIC_ROUTES } from '@/common/constants';
import type { Metadata } from 'next';
import type { Slide } from '@/components/slider/slide-item';
import type { GalleryItem } from '@/components/gallery/gallery-item';

import { Home } from '@/components/home';
import { actorService } from '@/common/services/actor.service';

export const metadata: Metadata = {
  title: 'Смотреть фильмы онлайн',
};

export const revalidate = 60;

const getContent = async () => {
  const { data: popularMovies } = await movieService.getMostPopularMovies();
  const slides = popularMovies.slice(0, 3).map<Slide>((movie) => ({
    id: movie.id,
    title: movie.title,
    subTitle: getGenresString(movie.genres),
    bigPoster: movie.bigPoster,
    link: PUBLIC_ROUTES.movie(movie.slug),
  }));

  const trendingMovies = popularMovies.map<GalleryItem>((movie) => ({
    name: movie.title,
    poster: movie.poster,
    link: PUBLIC_ROUTES.movie(movie.slug),
    content: {
      title: movie.title,
      subTitle: movie.genres[0].name,
    },
  }));

  const { data: actorsData } = await actorService.getAll();
  const actors = actorsData.slice(0, 6).map<GalleryItem>((actor) => {
    return {
      name: actor.name,
      poster: actor.photoUrl,
      link: PUBLIC_ROUTES.actor(actor.slug),
      content: {
        title: actor.name,
        subTitle: getMovieWordWithEnding(actor.movies.length),
      },
    };
  });

  return { slides, trendingMovies, actors } as const;
};

export default async function HomePage() {
  try {
    const { slides, trendingMovies, actors } = await getContent();

    return <Home slides={slides} trendingMovies={trendingMovies} actors={actors} />;
  } catch {
    return null;
  }
}
