import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Spin, ConfigProvider } from 'antd';
import { Suspense, type PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorPage } from '@/features/error';
import { themeConfig } from '@/config';
import { AuthProvider } from './AuthProvider';
import { NotificationProvider } from '@/hooks/useAntDNoti/useAntDNoti';
import { DrawerContextProvider } from '@/hooks/useDrawer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
    },
  },
});

ConfigProvider.config({
  theme: {
    token: {
      ...themeConfig.token,
      colorPrimary: '#1c375b',
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
                <DrawerContextProvider>
                  <AuthProvider>{children}</AuthProvider>
                </DrawerContextProvider>
              </NotificationProvider>
            </QueryClientProvider>
          </ConfigProvider>
        </HelmetProvider>
      </Suspense>
    </ErrorBoundary>
  );
}
