import React from 'react';

import type { GalleryItem } from '../gallery/gallery-item';

import { Heading } from '../ui';
import { Gallery } from '../gallery';

interface Props {
  similarMovies: GalleryItem[];
}

export const SimilarMovies: React.FC<Props> = ({ similarMovies }) => {
  return similarMovies.length ? (
    <div className="mt-8">
      <Heading className="mb-3">Похожие фильмы</Heading>
      <Gallery items={similarMovies} />
    </div>
  ) : null;
};
