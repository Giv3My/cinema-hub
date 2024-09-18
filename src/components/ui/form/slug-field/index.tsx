import React from 'react';
import cn from 'clsx';

import type { UseFormRegister } from 'react-hook-form';

import { Field, type FieldProps } from '../field';
import styles from './slug-field.module.scss';

interface Props extends Omit<FieldProps, 'label'> {
  register: UseFormRegister<any>;
  onClickGenerateSlug: VoidFunction;
}

export const SlugField: React.FC<Props> = ({
  style,
  className,
  register,
  error,
  onClickGenerateSlug,
}) => {
  return (
    <div style={style} className={cn('relative', className)}>
      <Field
        label="Ссылка"
        error={error}
        {...register('slug', {
          required: 'Ссылка обязательна',
        })}
      />
      <div className={styles.badge} onClick={onClickGenerateSlug}>
        сгенерировать
      </div>
    </div>
  );
};
