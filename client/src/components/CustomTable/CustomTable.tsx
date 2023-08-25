import type { TableProps } from 'antd';
import { Button, Input, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { CustomSpace } from '@/components/CustomSpace';
import { CustomCard } from '@/components/CustomCard';

export type Action = { element: ReactNode };

interface CustomTableProps<T extends object> extends TableProps<T> {
  actionHeader?: Action[];
  showSearch?: boolean;
  showFilter?: boolean;
}
export function CustomTable<T extends object>(props: CustomTableProps<T>) {
  const { dataSource, columns, actionHeader, showSearch, showFilter, ...rest } =
    props;
  const navigation = useNavigate();

  return (
    <CustomSpace direction="vertical" isFullWidth>
      {actionHeader && (
        <CustomSpace justify="space-between" isFullWidth>
          <CustomSpace>
            {actionHeader.map((action: Action) => (
              <>{action.element}</>
            ))}
          </CustomSpace>
          <CustomSpace>
            {showFilter && <Button />}
            {showSearch && <Input />}
          </CustomSpace>
        </CustomSpace>
      )}
      <CustomCard hasShadow>
        <Table
          rowSelection={{
            type: 'checkbox',
          }}
          onRow={(record) => ({
            onClick: () => navigation(`/class/${record.id}`),
          })}
          rowKey="id"
          columns={columns}
          dataSource={dataSource}
          {...rest}
        />
      </CustomCard>
    </CustomSpace>
  );
}
