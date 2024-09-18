import React from 'react';

import { useProfile } from '@/common/hooks/react-query/users';
import type { Review } from '@/types/review.types';

import { ReviewForm } from './review-form';
import { ReviewItem } from './review-item';
import { Heading, Modal } from '@/components/ui';
import styles from './reviews.module.scss';

interface Props {
  movieId: string;
  reviews: Review[];
}

export const Reviews: React.FC<Props> = ({ movieId, reviews }) => {
  const { user } = useProfile();

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-8">
      <div className="mb-6">
        <Heading className="mb-3">Отзывы</Heading>
        {user && (
          <button
            className="text-white/80 duration-200 hover:text-white"
            onClick={openModal}
          >
            Оставить отзыв
          </button>
        )}
      </div>
      {user && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <ReviewForm movieId={movieId} setModalOpen={setIsModalOpen} />
        </Modal>
      )}
      <div className={styles.reviews}>
        {reviews.length ? (
          reviews.map((review) => <ReviewItem key={review.id} review={review} />)
        ) : (
          <p className={styles.not_found}>У этого фильма нет ни одного отзыва</p>
        )}
      </div>
    </div>
  );
};
