import { Button, Dropdown, Modal, Select, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useToggle } from 'react-use';
import { useState } from 'react';
import { CustomTable } from '@/components';
import { useUserClassMutation } from '@/features/userClass/hooks/useUserClassMutation';
import type { UserClass } from '@/features/userClass/types';
import { genDropdownItems, transformToAntdSelectOptions } from '@/utils';
import { columns } from './columns';
import { useAuth } from '@/features/auth';
import { Excel } from '@/components/FileIO/Excel';
import type { User } from '@/features/user';
import { useListUser } from '@/features/user';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';

interface UserClassTableProps {
  dataSource?: UserClass[];
}
export function UserClassTable({ dataSource }: UserClassTableProps) {
  const { user } = useAuth();
  const { code } = useParams();
  const { deleteFn, addManyFn } = useUserClassMutation();
  const [selectedStudentList, setSelectedStudentList] = useState<number[]>([]);

  const [open, toggleOpen] = useToggle(false);
  const { data, isFetching } = useListUser(
    {},
    {
      enabled: open,
      refetchOnWindowFocus: false,
    },
  );

  const { data: requestData, isFetching: isFetchingUserClass } = useListUserClass(
    { classCode: code },
    {
      enabled: open,
      refetchOnWindowFocus: false,
    },
  );

  const users = data?.content;
  const requests = requestData?.content;

  const validUsers: User[] = users
    ? users?.filter((u) => !requests?.find((req) => req.studentId === u.id))
    : [];

  const handleOnOk = () =>
    addManyFn(
      selectedStudentList.map((id) => ({
        classCode: code as string,
        isStudentRequested: false,
        studentId: id,
      })),
    );

  return (
    <>
      <CustomTable
        searchBy="User.fullname"
        showActionHeader
        actionHeader={[
          {
            element: <Button onClick={toggleOpen}>Thêm học sinh</Button>,
          },
          {
            element: (
              <Excel.Exporter
                fileName={`danh sách học sinh - mã lớp ${code}`}
                content="Xuất file Excel"
                table={
                  <Table id="excel-table" rowKey="id" columns={columns} dataSource={dataSource} />
                }
              />
            ),
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
                render: (value: UserClass) => (
                  <Dropdown
                    menu={{
                      items: genDropdownItems({
                        delete: () => {
                          deleteFn({ id: value.id as number });
                        },
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
        dataSource={dataSource}
        scroll={{
          x: 1500,
        }}
        pagination={{ total: dataSource?.length }}
      />
      <Modal
        destroyOnClose
        centered
        closable
        title="Thêm học sinh vào lớp"
        open={open}
        onCancel={toggleOpen}
        onOk={handleOnOk}
      >
        {!isFetching && !isFetchingUserClass && users && (
          <Select
            showSearch
            mode="multiple"
            allowClear
            placeholder="Vui lòng chọn hoặc gõ để tìm kiếm..."
            style={{ width: '100%' }}
            options={transformToAntdSelectOptions(
              validUsers,
              'fullname',
              'id',
              (value, _index, context) => `${value} - ${context?.email}`,
            )}
            optionFilterProp="children"
            maxTagCount="responsive"
            filterOption={(input, option) => ((option?.label as string) ?? '').includes(input)}
            onChange={(value: number[]) => setSelectedStudentList(value)}
          />
        )}
      </Modal>
    </>
  );
}
