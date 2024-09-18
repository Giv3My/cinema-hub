import React from 'react';
import cn from 'clsx';

import { useProfile } from '@/common/hooks/react-query/users';
import { useVideo } from '@/common/hooks/video';
import { formatVideoTime } from '@/common/utils';

import { PremiumPlaceholder } from '../premium-placeholer';
import { ProgressBar } from './progress-bar';
import { VolumeBar } from './volume-bar';
import { Loader } from '@/components/ui';
import { MdFullscreen, MdHistory, MdPause, MdPlayArrow, MdUpdate } from 'react-icons/md';
import styles from './video-player.module.scss';

interface Props {
  videoSource: string;
}

export const VideoPlayer: React.FC<Props> = ({ videoSource }) => {
  const { user, isLoading } = useProfile();

  const { containerRef, videoRef, video, actions } = useVideo();

  return (
    <div
      className={cn(styles.wrapper, {
        'h-96': !user?.isHasPremium,
      })}
    >
      {isLoading ? (
        <div className={styles.loading}>
          <Loader />
        </div>
      ) : user?.isHasPremium ? (
        <div
          ref={containerRef}
          className={cn(styles.video_container, {
            [styles.paused]: !video.isPlaying,
          })}
          onClick={actions.togglePlay}
          onDoubleClick={actions.toggleFullscreen}
        >
          <video
            ref={videoRef}
            className={styles.video}
            src={`${videoSource}#t=0.1`}
            preload="metadata"
          />
          <div className={styles.video_bottom}>
            <ProgressBar
              className={styles.progress_bar}
              videoRef={videoRef}
              totalTime={video.totalTime}
              progress={video.progress}
            />
            <div className={styles.controls} onClick={(e) => e.stopPropagation()}>
              <div>
                <button onClick={actions.rewind}>
                  <MdHistory />
                </button>
                <button className={styles.play_button} onClick={actions.togglePlay}>
                  {video.isPlaying ? <MdPause /> : <MdPlayArrow />}
                </button>
                <button onClick={actions.fastForward}>
                  <MdUpdate />
                </button>
                <VolumeBar
                  className={styles.volume}
                  volume={video.volume}
                  isMuted={video.isMuted}
                  onClick={actions.toggleMute}
                  onChange={actions.handleChangeVolume}
                />
                <div className={styles.time_controls}>
                  <p className={styles.controls_time}>
                    {formatVideoTime(video.currentTime)}
                  </p>
                  <p> / </p>
                  <p className={styles.controls_time}>
                    {formatVideoTime(video.totalTime)}
                  </p>
                </div>
              </div>
              <div>
                <button onClick={actions.toggleFullscreen}>
                  <MdFullscreen />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PremiumPlaceholder />
      )}
    </div>
  );
};
