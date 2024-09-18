import React from 'react';
import cn from 'clsx';

type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface Props {
  className?: string;
  as?: HeadingElement;
}

const mapSizeByTag = {
  h1: 'text-2xl',
  h2: 'text-xl',
  h3: 'text-lg',
  h4: 'text-md',
  h5: 'text-sm',
  h6: 'text-xs',
} as const;

export const Heading: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  as: Component = 'h1',
}) => {
  const size = mapSizeByTag[Component];

  return (
    <Component className={cn(`${size} font-semibold`, className)}>{children}</Component>
  );
};
