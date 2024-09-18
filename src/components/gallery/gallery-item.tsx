import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cn from 'clsx';

import { Heading } from '../ui';
import styles from './gallery.module.scss';

export interface GalleryItem {
  poster: string;
  name: string;
  link: string;
  content?: {
    title: string;
    subTitle?: string;
  };
}

interface Props {
  variant: 'horizontal' | 'vertical';
  item: GalleryItem;
}

export const GalleryItem: React.FC<Props> = ({ variant, item }) => {
  return (
    <Link
      href={item.link}
      className={cn(styles.item, {
        [styles.with_text]: item.content,
        [styles.horizontal]: variant === 'horizontal',
        [styles.vertical]: variant === 'vertical',
      })}
    >
      <Image src={item.poster} alt={item.name} fill priority />
      {item.content && (
        <div className={styles.content}>
          <Heading as="h3" className={styles.title}>
            {item.content.title}
          </Heading>
          {item.content.subTitle && (
            <p className={styles.sub_title}>{item.content.subTitle}</p>
          )}
        </div>
      )}
    </Link>
  );
};
