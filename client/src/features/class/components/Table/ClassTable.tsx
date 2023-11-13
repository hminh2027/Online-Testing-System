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
import { genDropdownItems } from '@/utils';
import { useClassMutation } from '../../hooks/useClassMutation';

export function ClassTable() {
  const { data: classData } = useListClass({});
  const { deleteFn } = useClassMutation();
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

  const handleDelete = (code: string) => deleteFn({ id: code });

  return (
    <>
      <ClassFindModal open={isModalOpen} setIsOpen={toggleModal} />
      <CustomTable
        showActionHeader
        actionHeader={[
          {
            element: user?.isTeacher ? (
              <Button onClick={() => toggleMode(MODE.ADD)}>Tạo lớp học</Button>
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
          user?.isTeacher
            ? {
                render: (value: ClassRoom) => (
                  <Dropdown
                    menu={{
                      items: genDropdownItems({
                        modify: () => handleEdit(value.code),
                        view: () => handleDetail(value.code),
                        delete: () => handleDelete(value.code),
                      }),
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
              }
            : {},
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
