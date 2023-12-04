import type { MenuProps } from 'antd';
import { Button, Divider, Flex, Layout, Menu, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import type { ReactNode } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { useAuth } from '@/features/auth';
import { useUserClassMutation } from '@/features/userClass/hooks/useUserClassMutation';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';
import { LoadingModal } from '@/components';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

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
  const { notify } = useAntDNoti();
  const { code } = useParams();
  const { data, isLoading } = useListUserClass({ classCode: code });

  const request = data?.content.find((req) => !req.isPending && req.studentId === user?.id);

  const handleClick = () => {
    if (request?.Class.isStudentApprovalLeave) {
      notify({
        type: 'error',
        description: 'Vui lòng liên hệ giáo viên để thực hiện hành động rời lớp',
      });

      return;
    }

    deleteFn({ id: request?.id as number });
    navigate('/class');
  };

  useEffect(() => {
    if (isLoading || user?.isTeacher) return;
    if (!request) navigate('/class');
  }, [isLoading, navigate, request, user?.isTeacher]);

  if (isLoading) return <LoadingModal />;

  return (
    <Layout
      style={{
        height: '100%',
      }}
    >
      <Layout.Sider>
        <Flex style={{ height: '100%' }} vertical justify="space-between">
          <Space direction="vertical">
            <Divider>Thông tin lớp học</Divider>
            <Flex justify="space-around">
              <Typography.Text>Mã lớp:</Typography.Text>
              <Typography.Text copyable strong>
                {code}
              </Typography.Text>
            </Flex>
            <Divider>Danh mục</Divider>
            <Menu
              mode="vertical"
              items={items}
              style={{
                width: '100%',
                border: 'none',
              }}
            />
          </Space>

          {user?.isTeacher ? (
            <Button
              icon={<SettingOutlined />}
              style={{
                borderRadius: 0,
                height: 50,
              }}
              block
              onClick={() => navigate('edit')}
            >
              Cài đặt lớp học
            </Button>
          ) : (
            <Button
              icon={<PoweroffOutlined />}
              style={{
                borderRadius: 0,
                height: 50,
              }}
              block
              onClick={handleClick}
            >
              Rời lớp
            </Button>
          )}
        </Flex>
      </Layout.Sider>
      <Content className={styles.content}>{children ?? <Outlet />}</Content>
    </Layout>
  );
}
