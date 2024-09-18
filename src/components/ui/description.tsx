import React from 'react';
import parse from 'html-react-parser';
import cn from 'clsx';

interface Props {
  className?: string;
  text: string;
}

export const Description: React.FC<Props> = ({ text, className }) => {
  return <div className={cn('text-white/60', className)}>{parse(text)}</div>;
};
