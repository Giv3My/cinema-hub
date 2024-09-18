import React from 'react';

export const useSlider = (length: number, timeout: number = 400) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [slideIn, setSlideIn] = React.useState(true);
  const [direction, setDirection] = React.useState<'next' | 'prev'>('next');
  const [startPosition, setStartPosition] = React.useState(0);
  const [endPosition, setEndPosition] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const isPrevExists = currentIndex ? currentIndex - 1 < length : false;
  const isNextExists = currentIndex + 1 < length;

  React.useEffect(() => {
    if (isDragging) {
      return;
    }

    const diff = endPosition - startPosition;

    if (Math.abs(diff) < 100) {
      return;
    }

    if (diff > 0) {
      prevSlide();
    } else {
      nextSlide();
    }
  }, [isDragging, endPosition]);

  const handleChangeSlide = (direction: 'next' | 'prev') => () => {
    if (
      (direction === 'prev' && !isPrevExists) ||
      (direction === 'next' && !isNextExists)
    ) {
      return;
    }

    if (!slideIn) {
      return;
    }

    setSlideIn(false);
    setDirection(direction);

    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    setTimeout(() => {
      setCurrentIndex(newIndex);
      setSlideIn(true);
    }, timeout);
  };

  const prevSlide = handleChangeSlide('prev');

  const nextSlide = handleChangeSlide('next');

  const onMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setStartPosition(e.clientX);
  };

  const onMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    setEndPosition(e.clientX);
  };

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setIsDragging(true);
    setStartPosition(e.touches[0].clientX);
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setEndPosition(e.touches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  return React.useMemo(
    () =>
      ({
        index: currentIndex,
        isPrev: isPrevExists,
        isNext: isNextExists,
        slideIn,
        direction,
        timeout,
        handleChangeSlide: {
          nextSlide,
          prevSlide,
        },
        handlers: {
          onMouseDown,
          onMouseUp,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
        },
      } as const),
    [currentIndex, isPrevExists, isNextExists, slideIn, direction, timeout]
  );
};
