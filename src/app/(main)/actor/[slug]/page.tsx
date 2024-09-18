import { redirect } from 'next/navigation';

import { actorService } from '@/common/services/actor.service';
import { movieService } from '@/common/services/movie.service';
import type { Metadata } from 'next';
import type { PageSlugParam } from '@/types/page-params.types';

import { Catalog } from '@/components/catalog-movies';

export const revalidate = 60;

export const generateStaticParams = async () => {
  const { data: actors } = await actorService.getAll();

  const params = actors.map((actor) => ({
    params: { slug: actor.slug },
  }));

  return params;
};

const getContent = async (slug?: string) => {
  try {
    const { data: actor } = await actorService.getBySlug(slug as string);
    const { data: movies } = await movieService.getByActor(actor.id);

    return { actor, movies };
  } catch {
    redirect('/404');
  }
};

export const generateMetadata = async ({
  params: { slug },
}: PageSlugParam): Promise<Metadata> => {
  const { actor } = await getContent(slug);

  return {
    title: actor.name,
    openGraph: {
      images: {
        url: actor.photoUrl,
      },
    },
  };
};

export default async function ActorPage({ params: { slug } }: PageSlugParam) {
  const { actor, movies } = await getContent(slug);

  return (
    <div className="px-6">
      <Catalog title={actor.name} movies={movies} />
    </div>
  );
}
