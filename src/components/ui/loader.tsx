import React from 'react';
import cn from 'clsx';

import { LuLoader } from 'react-icons/lu';

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className }) => {
  return <LuLoader className={cn('size-8 text-slate-400 animate-spin', className)} />;
};
