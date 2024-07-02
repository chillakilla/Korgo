'use client';

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TopButton from './(root)/_components/_button/TopButton';

type Props = {
  children: React.ReactNode;
};

const ProvidersLayout = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        {children}
        <TopButton />
      </NextUIProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ProvidersLayout;
