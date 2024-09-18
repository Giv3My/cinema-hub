import React from 'react';
import { useVideoControls } from './use-video-controls';

export const useVideo = () => {
  const [totalTime, setTotalTime] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [progress, setProgress] = React.useState(0);

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const {
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
  } = useVideoControls(containerRef, videoRef, progress);

  React.useEffect(() => {
    if (progress < 100) {
      return;
    }

    togglePlay();
  }, [progress]);

  React.useEffect(() => {
    videoRef.current?.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      videoRef.current?.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [videoRef.current]);

  React.useEffect(() => {
    videoRef.current?.addEventListener('timeupdate', updateProgress);

    return () => {
      videoRef.current?.removeEventListener('timeupdate', updateProgress);
    };
  }, [totalTime]);

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (!isFocused) {
        return;
      }

      e.preventDefault();

      switch (e.code) {
        case 'ArrowUp':
          increaseVolume();
          break;
        case 'ArrowDown':
          decreaseVolume();
          break;
        case 'ArrowRight':
          fastForward();
          break;
        case 'ArrowLeft':
          rewind();
          break;
        case 'Space':
          togglePlay();
          break;
        case 'KeyM':
          toggleMute();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        default:
          break;
      }
    },
    [isFocused, togglePlay, toggleMute]
  );

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const onLoadedMetadata = () => {
    if (!videoRef.current) {
      return;
    }

    setTotalTime(videoRef.current?.duration);
  };

  const updateProgress = () => {
    if (!videoRef.current) {
      return;
    }

    setCurrentTime(videoRef.current.currentTime);
    setProgress((videoRef.current.currentTime / totalTime) * 100);
  };

  return React.useMemo(
    () =>
      ({
        containerRef,
        videoRef,
        actions: {
          toggleFullscreen,
          togglePlay,
          toggleMute,
          handleChangeVolume,
          fastForward,
          rewind,
        },
        video: {
          totalTime,
          currentTime,
          progress,
          volume,
          isPlaying,
          isMuted,
        },
      } as const),
    [totalTime, currentTime, progress, volume, isPlaying, isMuted]
  );
};
