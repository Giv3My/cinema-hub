import React from 'react';
import cn from 'clsx';

interface Props {
  className?: string;
}

export const SkeletonLoader: React.FC<Props> = ({ className }) => {
  return <div className={cn('rounded-lg bg-[#292a2e] animate-pulse', className)} />;
};
