import { Table } from 'antd';
import { columns } from '.';

interface ExcelTableProps {
  dataSource: [];
}
export function ExcelTable({ dataSource }: ExcelTableProps) {
  return (
    <Table
      scroll={{
        y: 500,
      }}
      pagination={false}
      rowKey="key"
      dataSource={dataSource}
      bordered
      columns={columns}
    />
  );
}
