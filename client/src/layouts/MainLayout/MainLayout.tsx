import { Layout, Space } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAsync, useEffectOnce } from 'react-use';
import styles from './index.module.css';
import { studentTabs, teacherTabs } from '@/components/TabBar/config';
import { TabBar } from '@/components/TabBar';
import { Notification } from '@/components/Notification';
import { UserHeader } from '@/components/UserHeader';
import { useAuthStore } from '@/features/auth/stores';
import { DrawerContextProvider } from '@/hooks/useDrawer';
import { Logo } from '@/components';
import useOngoingAttempt from '@/features/attempt/hooks/useOnGoingAttempt';
import { useAttemptStore } from '@/features/attempt/stores';

interface MainLayoutProps {
  children?: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { user } = useAuthStore();
  const { setAttempt } = useAttemptStore();
  const navigation = useNavigate();

  const { fetchOnGoingAttempt } = useOngoingAttempt();

  useAsync(async () => {
    const { content } = await fetchOnGoingAttempt();

    if (content) {
      setAttempt(content);
      navigation(`/class/${content.Exam.Class.code}/exams/${content.examId}/taking`);
    }
  }, []);

  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      <Header className={styles.header}>
        {/* <Image preview={false} height="100%" src={Logo} /> */}
        <Logo />
        <TabBar items={user?.isTeacher ? teacherTabs : studentTabs} />
        <Space>
          <Notification count={15} />
          <UserHeader username={user?.fullname} />
        </Space>
      </Header>
      <Content
        style={{
          height: 'calc(100vh - 64px)',
          overflow: 'auto',
        }}
      >
        <DrawerContextProvider>{children ?? <Outlet />}</DrawerContextProvider>
      </Content>
    </Layout>
  );
}
