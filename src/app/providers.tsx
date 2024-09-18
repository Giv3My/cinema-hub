'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    })
  );

  return (
    <>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            color: '#fff',
            backgroundColor: '#333',
          },
        }}
      />
    </>
  );
};
