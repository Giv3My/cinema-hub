'use client';

import React from 'react';

import { useMovie, useUpdateCountViews } from '@/common/hooks/react-query/movies';
import type { Movie as IMovie } from '@/types/movie.types';
import type { GalleryItem } from '../gallery/gallery-item';

import { Banner } from '../banner';
import { Content } from './content';
import { VideoPlayer } from './video-player';
import { SimilarMovies } from './similar-movies';
import { Reviews } from './reviews';

interface Props {
  initialMovie: IMovie;
  similarMovies: GalleryItem[];
  slug?: string;
}

export const Movie: React.FC<Props> = ({ initialMovie, similarMovies, slug = '' }) => {
  const { movie } = useMovie(slug, initialMovie);

  useUpdateCountViews(slug);

  return (
    <div>
      <Banner image={movie.bigPoster}>
        <Content movie={movie} />
      </Banner>
      <div className="px-6 mb-10">
        <VideoPlayer videoSource={movie.videoUrl} />
        <SimilarMovies similarMovies={similarMovies} />
        <Reviews movieId={movie.id} reviews={movie.reviews} />
      </div>
    </div>
  );
};
