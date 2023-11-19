import { Table, Typography } from 'antd';
import type { Result } from '@/features/exam/hooks/useResult';
import { columns } from './column';

interface ResultTableProps {
  data?: Result['list'];
  isShowAnswer?: boolean;
}
export default function ResultTable({ data, isShowAnswer }: ResultTableProps) {
  const getTitle = () => (
    <Typography.Text mark strong>
      Giáo viên đã tắt tính năng xem đáp án và giải thích của bài kiểm tra này.
    </Typography.Text>
  );

  return (
    <Table
      title={data && !isShowAnswer ? () => getTitle() : undefined}
      rowKey="index"
      columns={columns(isShowAnswer)}
      dataSource={data || []}
    />
  );
}
