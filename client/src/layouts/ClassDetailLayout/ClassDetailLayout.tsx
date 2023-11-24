import type { MenuProps } from 'antd';
import { Button, Flex, Layout, Menu } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './index.module.css';
import { useAuth } from '@/features/auth';
import { useUserClassMutation } from '@/features/userClass/hooks/useUserClassMutation';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';
import { CustomMessage } from '@/components';

interface ClassDetailLayoutProps {
  children?: ReactNode;
}

const sideNavItems = [
  {
    label: 'Bảng tin',
    path: 'newsfeed',
  },
  {
    label: 'Thành viên',
    path: 'students',
  },
  {
    label: 'Bài kiểm tra',
    path: 'exams',
  },
  {
    label: 'Lịch thi',
    path: 'schedule',
  },
];

const items: MenuProps['items'] = sideNavItems.map((item) => ({
  key: item.path,
  label: <NavLink to={`${item.path}`}>{item.label}</NavLink>,
}));

export function ClassDetailLayout({ children }: ClassDetailLayoutProps) {
  const { user } = useAuth();
  const { deleteFn } = useUserClassMutation();
  const navigate = useNavigate();

  const { code } = useParams();
  const { data, isLoading } = useListUserClass({ classCode: code });

  const request = data?.content.find((req) => !req.isPending && req.studentId === user?.id);

  const handleClick = () => {
    if (request?.Class.isStudentApprovalLeave) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.error('Vui lòng liên hệ giáo viên để thực hiện hành động rời lớp');

      return;
    }

    deleteFn({ id: request?.id as number });
    navigate('/class');
  };

  useEffect(() => {
    if (isLoading || user?.isTeacher) return;
    if (!request) navigate('/class');
  }, [isLoading, navigate, request, user?.isTeacher]);

  if (isLoading) return <>Loading</>;

  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      <Layout.Sider>
        <Flex style={{ height: '100%' }} vertical justify="space-between">
          <Menu
            mode="vertical"
            items={items}
            style={{
              width: '100%',
              border: 'none',
            }}
          />
          {!user?.isTeacher && (
            <Button block onClick={handleClick}>
              Rời lớp
            </Button>
          )}
        </Flex>
      </Layout.Sider>
      <Content className={styles.content}>{children ?? <Outlet />}</Content>
    </Layout>
  );
}
