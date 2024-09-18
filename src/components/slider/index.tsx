'use client';

import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cn from 'clsx';

import { useSlider } from '@/common/hooks';

import { SlideArrow } from './slide-arrow';
import { SlideItem, type Slide } from './slide-item';
import styles from './slider.module.scss';

interface Props {
  slides: Slide[];
}

export const Slider: React.FC<Props> = ({ slides }) => {
  const {
    index,
    isPrev,
    isNext,
    slideIn,
    direction,
    timeout,
    handleChangeSlide,
    handlers,
  } = useSlider(slides.length);

  return (
    <div className={styles.slider} {...handlers}>
      {isPrev && <SlideArrow variant="left" onClick={handleChangeSlide.prevSlide} />}
      <CSSTransition
        classNames={cn(
          {
            'right-to-left': direction === 'next',
            'left-to-right': direction === 'prev',
          },
          'scale'
        )}
        in={slideIn}
        timeout={timeout}
        unmountOnExit
      >
        <SlideItem slide={slides[index]} />
      </CSSTransition>
      {isNext && <SlideArrow variant="right" onClick={handleChangeSlide.nextSlide} />}
    </div>
  );
};
