import type { DropDownProps, TableProps } from 'antd';
import { Button, Dropdown, Table } from 'antd';
import type { ReactNode } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { CustomSpace } from '@/components/CustomSpace';
import { useDrawer } from '@/hooks/useDrawer';
import { MODE } from '@/constants';

export type Action = { element: ReactNode };

interface CustomTableProps<T extends object> extends TableProps<T> {
  actionHeader?: Action[];
  showActionHeader?: boolean;
  showActionColumn?: boolean;
  actionColumnItems?: DropDownProps['menu'];
  hasShadow?: boolean;
}
export function CustomTable<T extends object>(props: CustomTableProps<T>) {
  const {
    dataSource,
    columns,
    actionHeader,
    showActionHeader = false,
    hasShadow,
    pagination,
    ...rest
  } = props;

  const { toggleMode } = useDrawer();

  const handleCreate = () => {
    toggleMode(MODE.ADD);
  };

  return (
    <CustomSpace direction="vertical" isFullWidth>
      {showActionHeader &&
        (actionHeader ? (
          <CustomSpace justify="space-between" isFullWidth>
            <CustomSpace>
              {actionHeader.map((action: Action) => (
                <>{action.element}</>
              ))}
            </CustomSpace>
          </CustomSpace>
        ) : (
          <CustomSpace>
            <Button onClick={handleCreate}>Create</Button>
          </CustomSpace>
        ))}
      <Table
        rowKey="id"
        columns={[
          ...columns,
          {
            render: (value) => (
              <Dropdown menu={actionColumnItems} trigger={['click']}>
                <Button icon={<DownOutlined />}>Nhấp</Button>
              </Dropdown>
            ),
            key: 'action',
            title: 'Hành động',
            fixed: 'right',
            width: 150,
          },
        ]}
        dataSource={dataSource}
        style={{
          boxShadow: hasShadow ? '0px 2px 12px rgba(39, 49, 60, 0.16)' : 'inherit',
        }}
        pagination={{
          position: ['bottomCenter'],
          showTotal: (total) => `Tổng ${total}`,
          showSizeChanger: true,
          ...pagination,
        }}
        {...rest}
      />
    </CustomSpace>
  );
}
