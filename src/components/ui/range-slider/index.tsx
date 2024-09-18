import React from 'react';
import cn from 'clsx';

import styles from './range-slider.module.scss';

interface Props {
  className?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  withThumb?: boolean;
  onChange: (value: number) => void;
}

export const RangeSlider: React.FC<Props> = ({
  className,
  value,
  min = 0,
  max = 100,
  step = 0.5,
  withThumb = true,
  onChange,
}) => {
  const [sliderWidth, setSliderWidth] = React.useState(0);
  const [thumbPosition, setThumbPosition] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const sliderRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    setSliderWidth(sliderRef.current.offsetWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  React.useEffect(() => {
    updateThumbPosition(value);
  }, [sliderWidth, value]);

  const handleResize = () => {
    if (!sliderRef.current) {
      return;
    }

    const newWidth = sliderRef.current.offsetWidth;
    setSliderWidth(newWidth);
  };

  const updateThumbPosition = (value: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    setThumbPosition((percentage / 100) * sliderWidth);
  };

  const moveThumb = (mouseX: number) => {
    if (!sliderRef.current) {
      return;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    let offsetX = mouseX - rect.left;

    if (offsetX < 0) {
      offsetX = 0;
    } else if (offsetX > sliderWidth) {
      offsetX = sliderWidth;
    }

    const newValue =
      Math.round(((offsetX / sliderWidth) * (max - min) + min) / step) * step;
    onChange(newValue);
  };

  const handleClick = (e: React.MouseEvent) => {
    moveThumb(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) {
      return;
    }

    moveThumb(e.clientX);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    moveThumb(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) {
      return;
    }

    moveThumb(e.touches[0].clientX);
    document.body.style.overflow = 'hidden';
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.body.style.overflow = '';
  };

  return (
    <div
      ref={sliderRef}
      className={cn(styles.slider, className)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        style={{ width: `${(thumbPosition / sliderWidth) * 100}%` }}
        className={styles.slider_track}
      />
      {withThumb && (
        <div style={{ left: `${thumbPosition}px` }} className={styles.slider_thumb} />
      )}
    </div>
  );
};
