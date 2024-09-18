import React from 'react';
import cn from 'clsx';

import * as Icons from 'react-icons/lu';

export type TypeIconName = keyof typeof Icons;

interface Props {
  className?: string;
  name: TypeIconName;
}

export const Icon: React.FC<Props> = ({ className, name }) => {
  const IconComponent = Icons[name];

  return <IconComponent className={cn('size-4', className)} />;
};
