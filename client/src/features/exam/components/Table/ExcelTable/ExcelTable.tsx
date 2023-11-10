import { Table } from 'antd';
import { columns } from './column';

interface ExcelTableProps {
  dataSource: [];
}
export function ExcelTable({ dataSource }: ExcelTableProps) {
  return (
    <Table
      scroll={{
        y: 500,
      }}
      id="excel-table"
      pagination={false}
      rowKey="key"
      dataSource={dataSource}
      bordered
      columns={columns}
    />
  );
}
