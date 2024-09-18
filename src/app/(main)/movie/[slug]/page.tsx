import { redirect } from 'next/navigation';

import { movieService } from '@/common/services/movie.service';
import { PUBLIC_ROUTES } from '@/common/constants';
import type { Metadata } from 'next';
import type { PageSlugParam } from '@/types/page-params.types';
import type { GalleryItem } from '@/components/gallery/gallery-item';

import { Movie } from '@/components/movie';

export const revalidate = 60;

export const generateStaticParams = async () => {
  const { data: movies } = await movieService.getAll();

  const params = movies.map((movie) => ({
    params: { slug: movie.slug },
  }));

  return params;
};

const getContent = async (slug?: string) => {
  try {
    const { data: movie } = await movieService.getBySlug(slug as string);

    const { data: moviesByGenres } = await movieService.getByGenres(
      movie.genres.map((genre) => genre.id)
    );

    const similarMovies = moviesByGenres
      .slice(0, 6)
      .filter((item) => item.id !== movie.id)
      .map<GalleryItem>((movie) => ({
        name: movie.title,
        poster: movie.poster,
        link: PUBLIC_ROUTES.movie(movie.slug),
      }));

    return { movie, similarMovies };
  } catch {
    redirect('/404');
  }
};

export const generateMetadata = async ({
  params: { slug },
}: PageSlugParam): Promise<Metadata> => {
  const { movie } = await getContent(slug);

  return {
    title: movie.title,
    openGraph: {
      images: {
        url: movie.poster,
      },
    },
  };
};

export default async function MoviePage({ params: { slug } }: PageSlugParam) {
  const { movie, similarMovies } = await getContent(slug);

  return <Movie initialMovie={movie} similarMovies={similarMovies} slug={slug} />;
}
