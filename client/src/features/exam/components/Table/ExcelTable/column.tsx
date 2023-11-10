import { Checkbox } from 'antd';

export const columns = [
  {
    dataIndex: 'question',
    title: 'Câu hỏi',
    onCell: (record) => (record.rowSpan > 0 ? { rowSpan: record.rowSpan } : { rowSpan: 0 }),
  },
  {
    dataIndex: 'explanation',
    title: 'Giải thích',
    onCell: (record) => (record.rowSpan > 0 ? { rowSpan: record.rowSpan } : { rowSpan: 0 }),
  },
  {
    dataIndex: 'point',
    title: 'Số điểm',
    align: 'center',

    onCell: (record) => (record.rowSpan > 0 ? { rowSpan: record.rowSpan } : { rowSpan: 0 }),
  },
  {
    dataIndex: 'answer',
    title: 'Đáp án',
    render: (_, record) => record.answer,
  },
  {
    dataIndex: 'isCorrect',
    title: 'Đáp án đúng',
    render: (_, record) => <Checkbox disabled checked={!!record.isCorrect} />,
  },
];
