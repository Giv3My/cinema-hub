import { redirect } from 'next/navigation';

import { genreService } from '@/common/services/genre.service';
import { movieService } from '@/common/services/movie.service';
import type { Metadata } from 'next';
import type { PageSlugParam } from '@/types/page-params.types';

import { Catalog } from '@/components/catalog-movies';

export const revalidate = 60;

export const generateStaticParams = async () => {
  const { data: genres } = await genreService.getAll();

  const params = genres.map((genre) => ({
    params: { slug: genre.slug },
  }));

  return params;
};

const getContent = async (slug?: string) => {
  try {
    const { data: genre } = await genreService.getBySlug(slug as string);
    const { data: movies } = await movieService.getByGenres([genre.id]);

    return { genre, movies };
  } catch {
    redirect('/404');
  }
};

export const generateMetadata = async ({
  params: { slug },
}: PageSlugParam): Promise<Metadata> => {
  const { genre, movies } = await getContent(slug);

  return {
    title: genre.name,
    description: genre.description,
    openGraph: {
      images: {
        url: movies[0].poster,
      },
      description: genre.description,
    },
  };
};

export default async function GenrePage({ params: { slug } }: PageSlugParam) {
  const { genre, movies } = await getContent(slug);

  return (
    <div className="px-6">
      <Catalog title={genre.name} description={genre.description} movies={movies} />
    </div>
  );
}
