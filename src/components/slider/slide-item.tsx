'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Heading } from '../ui/heading';
import { Button } from '../ui/form';
import styles from './slider.module.scss';

export interface Slide {
  id: string;
  title: string;
  subTitle: string;
  link: string;
  bigPoster: string;
}

interface Props {
  slide: Slide;
}

export const SlideItem: React.FC<Props> = ({ slide }) => {
  const router = useRouter();

  const goToSlideLink = () => {
    router.push(slide.link);
  };

  return (
    <div className={styles.slide}>
      <Image
        className={styles.image}
        src={slide.bigPoster}
        alt={slide.title}
        draggable={false}
        fill
        priority
      />
      <div className={styles.content}>
        <Heading className={styles.title}>{slide.title}</Heading>
        <p className={styles.sub_title}>{slide.subTitle}</p>
        <Button className={styles.button} onClick={goToSlideLink}>
          Смотреть
        </Button>
      </div>
    </div>
  );
};
