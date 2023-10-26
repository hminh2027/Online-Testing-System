import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useToggle } from 'react-use';
import { columns } from './column';
import { useListClass } from '../../hooks/useClass';
import { CustomTable } from '@/components';
import { MODE } from '@/constants';
import { useDrawer } from '@/hooks/useDrawer';
import type { ClassRoom } from '../../types';
import { useAuth } from '@/features/auth';
import { ClassFindModal } from '@/features/class/components/ClassFindModal';

export function ClassTable() {
  const { data: classData } = useListClass({});
  const { toggleMode, setDetailId } = useDrawer();
  const { user } = useAuth();
  const [isModalOpen, toggleModal] = useToggle(false);

  const classes = classData?.content;

  if (!classes) return <>Loading</>;

  const handleEdit = (code: string) => {
    toggleMode(MODE.EDIT);
    setDetailId(code);
  };

  const handleDetail = (code: string) => {
    toggleMode(MODE.DETAIL);
    setDetailId(code);
  };

  const handleDelete = (code: string) => {};

  return (
    <>
      <ClassFindModal open={isModalOpen} setIsOpen={toggleModal} />
      <CustomTable
        showActionHeader
        actionHeader={[
          {
            element: user?.isTeacher ? (
              <Button>Tạo lớp học</Button>
            ) : (
              <Button onClick={() => toggleModal(true)}>Tham gia lớp học</Button>
            ),
          },
        ]}
        showSearch
        hasShadow
        rowKey="code"
        key="class-table"
        columns={[
          ...columns,
          {
            render: (value: ClassRoom) => (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: 'Sửa',
                      key: '0',
                      onClick: () => handleEdit(value.code),
                    },
                    {
                      label: 'Xem',
                      key: '1',
                      onClick: () => handleDetail(value.code),
                    },
                    {
                      label: 'Xoá',
                      key: '3',
                      onClick: () => handleDelete(value.code),
                    },
                  ],
                }}
                trigger={['click']}
              >
                <Button icon={<DownOutlined />}>Nhấp</Button>
              </Dropdown>
            ),
            key: 'action',
            title: 'Hành động',
            fixed: 'right',
            width: 150,
          },
        ]}
        dataSource={classes}
        scroll={{
          x: 1500,
        }}
        pagination={{ total: classes.length }}
      />
    </>
  );
}
