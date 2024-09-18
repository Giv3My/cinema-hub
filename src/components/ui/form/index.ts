import dynamic from 'next/dynamic';

export * from './button';
export * from './field';
export * from './slug-field';
export * from './upload-field';
export * from './select';

export const DynamicTextEditor = dynamic(
  () => import('./text-editor').then((module) => module.TextEditor),
  {
    ssr: false,
  }
);
