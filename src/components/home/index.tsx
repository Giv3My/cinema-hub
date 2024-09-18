'use client';

import React from 'react';

import type { Slide } from '@/components/slider/slide-item';
import type { GalleryItem } from '../gallery/gallery-item';

import { Slider } from '@/components/slider';
import { Gallery } from '@/components/gallery';
import { Heading } from '@/components/ui';

interface Props {
  slides: Slide[];
  trendingMovies: GalleryItem[];
  actors: GalleryItem[];
}

export const Home: React.FC<Props> = ({ slides, trendingMovies, actors }) => {
  return (
    <>
      {Boolean(slides.length) && <Slider slides={slides} />}
      <div className="px-6 my-3">
        <Heading as="h2" className="mx-2">
          В тренде
        </Heading>
        {Boolean(trendingMovies.length) && <Gallery items={trendingMovies} />}
      </div>
      <div className="px-6 my-3">
        <Heading as="h2" className="mx-2">
          В тренде
        </Heading>
        {Boolean(actors.length) && <Gallery items={actors} />}
      </div>
    </>
  );
};
