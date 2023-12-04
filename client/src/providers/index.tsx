import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Spin, ConfigProvider } from 'antd';
import { Suspense, type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorPage } from '@/features/error';
import { themeConfig } from '@/config';
import { AuthProvider } from './AuthProvider';
import { NotificationProvider } from '@/hooks/useAntDNoti/useAntDNoti';

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
      <Suspense fallback={<Spin fullscreen />}>
        <HelmetProvider>
          <ConfigProvider theme={themeConfig}>
            <QueryClientProvider client={queryClient}>
              <NotificationProvider>
                <AuthProvider>{children}</AuthProvider>
              </NotificationProvider>
            </QueryClientProvider>
          </ConfigProvider>
        </HelmetProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
