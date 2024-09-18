import React from 'react';
import makeAnimated from 'react-select/animated';
import cn from 'clsx';

import type { ControllerRenderProps } from 'react-hook-form';
import type { FieldProps } from '../field';

import ReactSelect, { type OnChangeValue, type Options } from 'react-select';
import styles from './select.module.scss';

export interface Option {
  label: string;
  value: string;
}

interface Props extends FieldProps {
  field: ControllerRenderProps<any, any>;
  options: Options<Option>;
  isLoading?: boolean;
  isMulti?: boolean;
}

const animatedComponents = makeAnimated();

export const Select: React.FC<Props> = ({
  className,
  label,
  field,
  options,
  error,
  isLoading,
  isMulti,
}) => {
  const onChange = (newValue: OnChangeValue<Option | string, boolean>) => {
    field.onChange(
      isMulti
        ? (newValue as Option[]).map((item) => item.value)
        : (newValue as Option).value
    );
  };

  const getValue = () => {
    if (!field.value) {
      return isMulti ? [] : '';
    }

    return isMulti
      ? options.filter((option) => field.value.indexOf(option.value) >= 0)
      : options.find((option) => option.value === field.value);
  };

  return (
    <div className={cn(styles.select_container, className)}>
      <label>
        <span>{label}</span>
        <ReactSelect
          classNamePrefix="custom-select"
          placeholder=""
          options={options}
          value={getValue()}
          isMulti={isMulti}
          onChange={onChange}
          components={animatedComponents}
          isLoading={isLoading}
        />
      </label>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};
