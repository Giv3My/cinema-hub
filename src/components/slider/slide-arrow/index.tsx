import React from 'react';
import cn from 'clsx';

import { Icon } from '../../ui/icon';
import styles from './slide-arrow.module.scss';

interface Props {
  variant: 'left' | 'right';
  onClick: VoidFunction;
}

export const SlideArrow: React.FC<Props> = ({ variant, onClick }) => {
  const isLeft = variant === 'left';

  return (
    <button
      className={cn(styles.arrow, {
        [styles.left]: isLeft,
        [styles.right]: !isLeft,
      })}
      onClick={onClick}
    >
      <Icon className={styles.icon} name={isLeft ? 'LuChevronLeft' : 'LuChevronRight'} />
    </button>
  );
};
