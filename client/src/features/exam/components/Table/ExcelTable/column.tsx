import type { ColumnType } from 'antd/es/table';
import type { TableFormatData } from '@/features/exam/types';

const handleOnCell = (value: TableFormatData) =>
  value.rowSpan > 0 ? { rowSpan: value.rowSpan } : { rowSpan: 0 };

export const columns: ColumnType<TableFormatData>[] = [
  {
    dataIndex: 'question',
    title: 'Câu hỏi',
    onCell: handleOnCell,
  },
  {
    dataIndex: 'explanation',
    title: 'Giải thích',
    onCell: handleOnCell,
  },
  {
    dataIndex: 'point',
    title: 'Số điểm',
    align: 'center',

    onCell: handleOnCell,
  },
  {
    dataIndex: 'answer',
    title: 'Đáp án',
    render: (_, record) => record.answer,
  },
  {
    dataIndex: 'isCorrect',
    title: 'Đáp án đúng',
    render: (_, record) => (record.isCorrect ? 'V' : ''),
  },
];
