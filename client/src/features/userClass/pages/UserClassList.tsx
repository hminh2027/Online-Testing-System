import { useParams } from 'react-router-dom';
import { Button, Dropdown, List, Skeleton } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useListUserClass } from '../hooks/useUserClass';
import { CustomAvatar } from '@/components';
import type { User } from '@/features/user';
import { genDropdownItems } from '@/utils';
import { useUserClassMutation } from '../hooks/useUserClassMutation';
import { useAuth } from '@/features/auth';

export function UserClassList() {
  const { code } = useParams();
  const { data, isLoading } = useListUserClass({ classCode: code });
  const { deleteFn } = useUserClassMutation();
  const { user } = useAuth();

  const requests = data?.content.filter((req) => !req.isPending);

  const concatInfo = (info: User): string => {
    const { email, phone } = info;
    const finalInfo: string = `${email} - ${phone} `;

    return finalInfo.trim();
  };

  return (
    <List
      className="user-class-list"
      loading={isLoading}
      itemLayout="horizontal"
      dataSource={requests}
      bordered
      renderItem={(item) => (
        <List.Item
          actions={[
            user?.isTeacher && (
              <Dropdown
                key="menu"
                menu={{
                  items: genDropdownItems({
                    delete: () => {
                      deleteFn({ id: item.id as number });
                    },
                  }),
                }}
                trigger={['click']}
              >
                <Button icon={<DownOutlined />}>Nhấp</Button>
              </Dropdown>
            ),
          ]}
        >
          <Skeleton avatar title={false} loading={isLoading} active>
            <List.Item.Meta
              style={{ alignItems: 'center' }}
              avatar={<CustomAvatar name={item.User.fullname} src={item.User.imageUrl} />}
              title={`${item.User.fullname} ${user?.id === item.studentId ? '(bạn)' : ''}`}
              description={concatInfo(item.User)}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
}
