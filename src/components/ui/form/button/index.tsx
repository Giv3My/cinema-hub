import React from 'react';
import cn from 'clsx';

import styles from './button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outlined';
  size?: 'sm' | 'md';
}

export const Button: React.FC<Props> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  return (
    <button
      type="button"
      className={cn(styles.button, className, {
        [styles.default]: variant === 'default',
        [styles.outlined]: variant === 'outlined',
        'rounded-md': size === 'sm',
        'px-4 rounded-lg': size === 'md',
      })}
      {...props}
    >
      {children}
    </button>
  );
};
