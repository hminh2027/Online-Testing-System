import type { InputProps, TableProps } from 'antd';
import { Button, Flex, Input, Space, Table } from 'antd';
import { useState, type ReactNode } from 'react';
import { useDrawer } from '@/hooks/useDrawer';
import { MODE } from '@/constants';
import type { Either } from '@/types';

export type Action = { element: ReactNode };

interface CustomTableProps<T> extends TableProps<T> {
  showSearch?: boolean;
  hasShadow?: boolean;
  searchBy?: string;
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
    searchBy,
    ...rest
  } = props;

  const { toggleMode } = useDrawer();

  const [internalDataSource, setInternalDataSource] = useState(dataSource);

  const handleCreate = () => {
    toggleMode(MODE.ADD);
  };

  function extractDataFromObject<X extends object>(object: X, keys: string[]): string {
    return keys.reduce((curObject, key) => curObject[key], object);
  }

  const handleSearch: InputProps['onChange'] = (e) => {
    if (!searchBy) return;

    const { value } = e.target;

    const keys = searchBy.split('.');

    const filteredDataSource = dataSource?.filter((data) => {
      const res = extractDataFromObject(data, keys);

      return res.toLocaleLowerCase().includes(value.toLocaleLowerCase());
    });

    setInternalDataSource(filteredDataSource);
  };

  return (
    <Flex vertical gap={16}>
      <Flex gap={16}>
        {showActionHeader &&
          (actionHeader ? (
            <Space>
              {actionHeader.map((action: Action) => (
                <>{action.element}</>
              ))}
            </Space>
          ) : (
            <Space>
              <Button onClick={handleCreate}>Tạo</Button>
            </Space>
          ))}
        {showSearch && <Input onChange={handleSearch} placeholder="Nhập và enter để tìm kiếm..." />}
      </Flex>
      <Table
        columns={columns}
        dataSource={internalDataSource}
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
