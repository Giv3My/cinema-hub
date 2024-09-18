import React from 'react';
import { useClickAway } from 'react-use';
import screenfull from 'screenfull';

export const useVideoControls = (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  progress: number
) => {
  const [volume, setVolume] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  useClickAway(containerRef, () => {
    setIsFocused(false);
  });

  const togglePlay = React.useCallback(() => {
    setIsFocused(true);

    if (!isPlaying) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const toggleFullscreen = () => {
    if (!containerRef.current || !screenfull.isEnabled) {
      return;
    }

    screenfull.toggle(containerRef.current);
  };

  const fastForward = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.currentTime += 10;
  };

  const rewind = () => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.currentTime -= 10;
  };

  const toggleMute = React.useCallback(() => {
    if (!videoRef.current) {
      return;
    }

    if (!isMuted) {
      setIsMuted(true);
      videoRef.current.muted = true;
    } else {
      setIsMuted(false);
      videoRef.current.muted = false;
    }
  }, [isMuted]);

  const handleChangeVolume = (value: number) => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.volume = value;
    setVolume(value);
  };

  const increaseVolume = () => {
    setVolume((prev) => {
      if (!videoRef.current) {
        return prev;
      }

      if (prev + 0.05 >= 1) {
        videoRef.current.volume = 1;
        return 1;
      }

      videoRef.current.volume += 0.05;
      return prev + 0.05;
    });
  };

  const decreaseVolume = () => {
    setVolume((prev) => {
      if (!videoRef.current) {
        return prev;
      }

      if (prev - 0.05 <= 0) {
        videoRef.current.volume = 0;
        return 0;
      }

      videoRef.current.volume -= 0.05;
      return prev - 0.05;
    });
  };

  return React.useMemo(
    () =>
      ({
        isPlaying,
        volume,
        isMuted,
        isFocused,
        togglePlay,
        toggleFullscreen,
        fastForward,
        rewind,
        toggleMute,
        handleChangeVolume,
        increaseVolume,
        decreaseVolume,
      } as const),
    [isPlaying, volume, isMuted, isFocused]
  );
};
