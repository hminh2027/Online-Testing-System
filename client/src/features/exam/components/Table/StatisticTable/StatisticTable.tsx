import { Table } from 'antd';
import { useParams } from 'react-router-dom';
import type { Attempt } from '@/features/attempt/types';
import { columns } from './column';
import { CustomTable } from '@/components';
import { Excel } from '@/components/FileIO/Excel';

interface StatisticTableProps {
  data?: Attempt[];
}
export function StatisticTable({ data }: StatisticTableProps) {
  const { code } = useParams();
  const getLink = (id: number) => `/class/${code}/exams/${id}/result`;

  return (
    <CustomTable
      showActionHeader
      rowKey="id"
      actionHeader={[
        {
          element: (
            <Excel.Exporter
              fileName="bảng điểm"
              content="Xuất thống kê"
              table={
                <Table
                  id="excel-table"
                  rowKey="id"
                  columns={columns(getLink)}
                  dataSource={data || []}
                />
              }
            />
          ),
        },
      ]}
      hasShadow
      columns={columns(getLink)}
      dataSource={data || []}
    />
  );
}
