import { Button, Dropdown, List, Table } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { CustomTable } from '@/components';
import { useUserClassMutation } from '@/features/userClass/hooks/useUserClassMutation';
import type { UserClass } from '@/features/userClass/types';
import { genDropdownItems } from '@/utils';
import { columns } from './columns';
import { useAuth } from '@/features/auth';
import { Excel } from '@/components/FileIO/Excel';
import { excelUrls } from '@/constants/excel';

interface UserClassTableProps {
  dataSource?: UserClass[];
}
export function UserClassTable({ dataSource }: UserClassTableProps) {
  const { deleteFn, addManyFn } = useUserClassMutation();
  const { user } = useAuth();

  const [data, setData] = useState([]);

  console.log(data);

  const handleOk = () => {};

  return (
    <CustomTable
      searchBy="User.fullname"
      showActionHeader
      actionHeader={[
        {
          element: <Button>Thêm học sinh</Button>,
        },
        {
          element: (
            <Excel.Uploader
              templateUrl={excelUrls.template.studentList}
              content="Nhập từ danh sách Excel"
              data={data}
              setData={setData}
              handleOk={handleOk}
              table={
                <List
                  itemLayout="horizontal"
                  dataSource={data.slice(1, data.length)}
                  bordered
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
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
  );
}
