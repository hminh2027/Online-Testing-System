import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { columns } from './column';
import { CustomTable } from '@/components';
import { MODE } from '@/constants';
import { useDrawer } from '@/hooks/useDrawer';
import { useAuth } from '@/features/auth';
import { genDropdownItems, showConfirmation } from '@/utils';
import { useExamMutation } from '@/features/exam/hooks/useExamMutation';
import type { Exam } from '@/features/exam/types';

interface ExamTableProps {
  dataSource?: Exam[];
}
export function ExamTable({ dataSource }: ExamTableProps) {
  const { toggleMode, setDetailId } = useDrawer();
  const { user } = useAuth();
  const { deleteFn } = useExamMutation();

  const handleEdit = (code: string) => {
    toggleMode(MODE.EDIT);
    setDetailId(code);
  };

  const handleDetail = (code: string) => {
    toggleMode(MODE.DETAIL);
    setDetailId(code);
  };

  const handleDelete = (code: string) => showConfirmation(() => deleteFn({ id: code }));

  return (
    <CustomTable
      searchBy="title"
      showActionHeader={user?.isTeacher}
      actionHeader={[
        {
          element: <Button onClick={() => toggleMode(MODE.ADD)}>Tạo bài kiểm tra</Button>,
        },
      ]}
      showSearch
      hasShadow
      rowKey="id"
      key="exam-table"
      columns={[
        ...columns,
        user?.isTeacher
          ? {
              render: (value: Exam) => (
                <Dropdown
                  menu={{
                    items: genDropdownItems({
                      modify: () => handleEdit(value?.id as string),
                      view: () => handleDetail(value?.id as string),
                      delete: () => handleDelete(value?.id as string),
                    }),
                  }}
                  trigger={['click']}
                >
                  <Button icon={<DownOutlined />}>Nhấp</Button>
                </Dropdown>
              ),
              title: 'Hành động',
              fixed: 'right',
              width: 150,
            }
          : {},
      ]}
      dataSource={structuredClone(dataSource)}
      scroll={{
        x: 1500,
      }}
      pagination={{ total: dataSource?.length }}
    />
  );
}
