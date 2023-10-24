import type { DropDownProps, TableProps } from 'antd';
import { Button, Flex, Space, Table } from 'antd';
import type { ReactNode } from 'react';
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
    <Flex vertical>
      {showActionHeader &&
        (actionHeader ? (
          <Flex>
            {actionHeader.map((action: Action) => (
              <>{action.element}</>
            ))}
          </Flex>
        ) : (
          <Space>
            <Button onClick={handleCreate}>Create</Button>
          </Space>
        ))}
      <Table
        rowKey="id"
        columns={columns}
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
    </Flex>
  );
}
