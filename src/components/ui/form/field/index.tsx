import React from 'react';
import cn from 'clsx';

import type { FieldError } from 'react-hook-form';

import styles from './field.module.scss';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  ({ className, label, error, style, ...props }, ref) => {
    return (
      <div style={style} className={cn(styles.field, className)}>
        <label>
          <span>{label}</span>
          <input ref={ref} type="text" placeholder={label} {...props} />
        </label>
        {error && <div className={styles.error}>{error.message}</div>}
      </div>
    );
  }
);

Field.displayName = 'Field';

export { Field };
