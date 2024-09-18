import React from 'react';
import { useThrottle } from 'react-use';
import cn from 'clsx';

import { RangeSlider } from '@/components/ui';
import styles from './progress-bar.module.scss';

interface Props {
  className?: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  totalTime: number;
  progress: number;
}

export const ProgressBar: React.FC<Props> = ({
  className,
  videoRef,
  totalTime,
  progress,
}) => {
  const [currentProgress, setCurrentProgress] = React.useState(progress);

  const throttledVideoProgress = useThrottle(currentProgress, 100);

  React.useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.currentTime = Math.floor((throttledVideoProgress / 100) * totalTime);
  }, [throttledVideoProgress]);

  const handleSliderChange = (value: number) => {
    setCurrentProgress(value);
  };

  return (
    <div className={cn(className)} onClick={(e) => e.stopPropagation()}>
      <RangeSlider
        className={styles.slider}
        value={progress}
        max={100}
        onChange={handleSliderChange}
      />
    </div>
  );
};
