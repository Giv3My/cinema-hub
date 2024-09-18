import React from 'react';

import { GalleryItem, type GalleryItem as IGalleryItem } from './gallery-item';
import styles from './gallery.module.scss';

interface Props {
  items: IGalleryItem[];
}

export const Gallery: React.FC<Props> = ({ items }) => {
  return (
    <div className={styles.gallery}>
      {items.map((item) => (
        <GalleryItem key={item.link} variant="vertical" item={item} />
      ))}
    </div>
  );
};
