import React from 'react';
import Image from 'next/image';

import styles from './banner.module.scss';

interface Props {
  image: string;
}

export const Banner: React.FC<React.PropsWithChildren<Props>> = ({ children, image }) => {
  return (
    <div className={styles.banner}>
      <Image
        className={styles.image}
        src={image}
        alt="banner-image"
        draggable={false}
        fill
        priority
        unoptimized
      />
      {children}
    </div>
  );
};
