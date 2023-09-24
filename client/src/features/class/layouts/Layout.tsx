import * as React from 'react';

import { Head } from '@/components/Head';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head title={title} />
      {children}
    </>
  );
}
