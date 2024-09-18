import React from 'react';
import Image from 'next/image';

import type { Review } from '@/types/review.types';

import { Rating } from 'react-simple-star-rating';
import styles from './reviews.module.scss';

interface Props {
  review: Review;
}

export const ReviewItem: React.FC<Props> = ({ review }) => {
  return (
    <div className={styles.review}>
      <div className={styles.user}>
        <Image
          className={styles.avatar}
          src={review.user.avatarPath}
          width={40}
          height={40}
          alt={review.user.name}
        />
        <span>{review.user.name}</span>
      </div>
      <Rating
        size={18}
        initialValue={review.rating}
        SVGstyle={{
          display: 'inline-block',
        }}
        readonly
        allowFraction
        transition
      />
      <div className={styles.text}>{review.text}</div>
    </div>
  );
};
