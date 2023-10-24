import type { TableProps } from 'antd';
import { Button, Table } from 'antd';
import type { ReactNode } from 'react';
import { CustomSpace } from '@/components/CustomSpace';
import { useDrawer } from '@/hooks/useDrawer';
import { MODE } from '@/constants';

export type Action = { element: ReactNode };

interface CustomTableProps<T extends object> extends TableProps<T> {
  actionHeader?: Action[];
  showActionHeader?: boolean;
  hasShadow?: boolean;
}
export function CustomTable<T extends object>(props: CustomTableProps<T>) {
  const { dataSource, columns, actionHeader, showActionHeader = false, hasShadow, ...rest } = props;

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
        rowSelection={{
          type: 'checkbox',
        }}
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        style={{
          boxShadow: hasShadow ? '0px 2px 12px rgba(39, 49, 60, 0.16)' : 'inherit',
        }}
        {...rest}
      />
    </CustomSpace>
  );
}
