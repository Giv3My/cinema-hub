import React from 'react';

import { Loader } from '@/components/ui';

export default function Loading() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}
