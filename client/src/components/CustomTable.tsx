import type { TableProps } from 'antd';
import { Button, Flex, Input, Space, Table } from 'antd';
import type { ReactNode } from 'react';
import { useDrawer } from '@/hooks/useDrawer';
import { MODE } from '@/constants';
import type { Either } from '@/types';

export type Action = { element: ReactNode };

interface CustomTableProps<T extends object> extends TableProps<T> {
  showSearch?: boolean;
  hasShadow?: boolean;
}

interface TableWithActionHeader<T> extends CustomTableProps<T> {
  actionHeader?: Action[];
  showActionHeader?: boolean;
}

type TableProp<T> = Either<TableWithActionHeader<T>, CustomTableProps<T>>;

export function CustomTable<T extends object>(props: TableProp<T>) {
  const {
    dataSource,
    columns,
    actionHeader,
    showActionHeader = false,
    showSearch = false,
    hasShadow,
    pagination,
    ...rest
  } = props;

  const { toggleMode } = useDrawer();

  const handleCreate = () => {
    toggleMode(MODE.ADD);
  };

  return (
    <Flex vertical gap={16}>
      <Flex gap={16}>
        {showActionHeader &&
          (actionHeader ? (
            <Flex>
              {actionHeader.map((action: Action) => (
                <>{action.element}</>
              ))}
            </Flex>
          ) : (
            <Space>
              <Button onClick={handleCreate}>Tạo</Button>
            </Space>
          ))}
        {showSearch && <Input placeholder="Nhập và enter để tìm kiếm..." />}
      </Flex>
      <Table
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
