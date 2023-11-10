import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { columns } from './column';
import { CustomTable } from '@/components';
import { MODE } from '@/constants';
import { useDrawer } from '@/hooks/useDrawer';
import { useAuth } from '@/features/auth';
import { showConfirmation } from '@/utils';
import { useExamMutation } from '@/features/exam/hooks/useExamMutation';
import type { Exam } from '@/features/exam/types';
import { useListExam } from '@/features/exam/hooks/useExam';

export function ExamTable() {
  const { data: examData, isLoading } = useListExam({});
  const { toggleMode, setDetailId } = useDrawer();
  const { user } = useAuth();
  const { deleteFn } = useExamMutation();

  const exams = examData?.content;

  if (!exams) return <>Loading</>;

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
      loading={isLoading}
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
                    items: [
                      {
                        label: 'Sửa',
                        key: 'Sửa',
                        onClick: () => handleEdit(value?.id as string),
                      },
                      {
                        label: 'Xem',
                        key: 'Xem',
                        onClick: () => handleDetail(value?.id as string),
                      },
                      {
                        label: 'Xoá',
                        key: 'Xoá',
                        onClick: () => handleDelete(value?.id as string),
                      },
                    ],
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
      dataSource={exams}
      scroll={{
        x: 1500,
      }}
      pagination={{ total: exams.length }}
    />
  );
}
