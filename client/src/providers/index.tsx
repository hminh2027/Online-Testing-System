import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Spin, ConfigProvider } from 'antd';
import { Suspense, type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorPage } from '@/features/error';
import { themeConfig } from '@/config';
import { AuthProvider } from './AuthProvider';

const queryClient = new QueryClient();

ConfigProvider.config({
  theme: {
    token: {
      ...themeConfig.token,
    },
    components: {
      ...themeConfig.components,
    },
  },
});

export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>
      <Suspense fallback={<Spin />}>
        <HelmetProvider>
          <ConfigProvider theme={themeConfig}>
            <QueryClientProvider client={queryClient}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          </ConfigProvider>
        </HelmetProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
