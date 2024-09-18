import React from 'react';
import cn from 'clsx';

import { RangeSlider } from '@/components/ui';
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import styles from './volume-bar.module.scss';

interface Props {
  className?: string;
  volume: number;
  isMuted: boolean;
  onClick: VoidFunction;
  onChange: (value: number) => void;
}

export const VolumeBar: React.FC<Props> = ({
  className,
  volume,
  isMuted,
  onClick,
  onChange,
}) => {
  return (
    <div className={cn(styles.volume, className)}>
      <button onClick={onClick}>
        {!isMuted && volume ? <MdVolumeUp /> : <MdVolumeOff />}
      </button>
      <RangeSlider
        value={!isMuted ? volume : 0}
        max={1}
        step={0.05}
        withThumb={false}
        onChange={onChange}
      />
    </div>
  );
};
