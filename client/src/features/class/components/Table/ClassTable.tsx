import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useToggle } from 'react-use';
import { columns } from './column';
import { useListClass } from '../../hooks/useClass';
import { CustomTable, Status } from '@/components';
import { CLASS_STATUS, MODE } from '@/constants';
import { useDrawer } from '@/hooks/useDrawer';
import type { ClassRoom } from '../../types';
import { useAuth } from '@/features/auth';
import { ClassFindModal } from '@/features/class/components/ClassFindModal';
import { genDropdownItems } from '@/utils';
import { useClassMutation } from '../../hooks/useClassMutation';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';

export function ClassTable() {
  const { deleteFn } = useClassMutation();
  const { toggleMode, setDetailId } = useDrawer();
  const { user } = useAuth();
  const [isModalOpen, toggleModal] = useToggle(false);

  const { data: classData, isLoading: isTeacherClassLoading } = useListClass({});
  const { data: requestData, isLoading: isStudentClassLoading } = useListUserClass({});

  const requests = requestData?.content;

  const studentClasses = requests
    ?.filter((req) => req.studentId === user?.id)
    .map((req) => req.Class);
  const teacherClasses = classData?.content;

  if (isTeacherClassLoading || isStudentClassLoading) return <>Loading</>;

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
        searchBy="name"
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
            : {
                render: (value: ClassRoom) => {
                  const isPending = requests?.find(
                    (req) => req.isPending && req.classCode === value.code,
                  );

                  return <Status status={isPending ? CLASS_STATUS.PENDING : CLASS_STATUS.ACTIVE} />;
                },
                key: 'status',
                title: 'Trạng thái',
                fixed: 'right',
                width: 150,
              },
        ]}
        dataSource={user?.isTeacher ? teacherClasses : studentClasses}
        scroll={{
          x: 1500,
        }}
        pagination={{ total: user?.isTeacher ? teacherClasses?.length : studentClasses?.length }}
      />
    </>
  );
}
