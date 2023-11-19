import { Table } from 'antd';
import type { Attempt } from '@/features/attempt/types';

interface ResultTableProps {
  attempt?: Attempt;
}
export default function ResultTable({ attempt }: ResultTableProps) {
  console.log(attempt);

  return <Table dataSource={[]} />;
}
