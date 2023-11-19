import type { ColumnsType } from 'antd/es/table';
import type { ResultList } from '@/features/exam/hooks/useResult';

export const columns = (isShowAnswer?: boolean): ColumnsType<ResultList> => [
  {
    key: 'index',
    title: 'Câu thứ',
    dataIndex: 'index',
    align: 'center',
  },
  {
    key: 'questionContent',
    title: 'Nội dung',
    align: 'center',
    dataIndex: 'questionContent',
  },
  {
    key: 'userAnswers',
    align: 'center',
    title: 'Chọn',
    dataIndex: 'userAnswers',
    render: (answers: string[]) => (
      <div>
        {answers.map((ans) => (
          <div key={ans}>{ans}</div>
        ))}
      </div>
    ),
  },
  {
    key: 'correctAnswers',
    title: 'Đáp án đúng',
    dataIndex: 'correctAnswers',
    align: 'center',
    render: (answers: string[]) =>
      isShowAnswer ? (
        <div>
          {answers.map((ans) => (
            <div key={ans}>{ans}</div>
          ))}
        </div>
      ) : (
        '_'
      ),
  },
  {
    key: 'explanation',
    title: 'Giải thích',
    align: 'center',
    dataIndex: 'explanation',
    render: (explanation: string) => (isShowAnswer ? explanation : '_'),
  },
  {
    key: 'point',
    title: 'Điểm',
    align: 'center',
    dataIndex: 'point',
  },
  {
    key: 'isPointPerCorrection',
    title: 'Tính điểm theo mỗi đáp án đúng',
    dataIndex: 'isPointPerCorrection',
    align: 'center',
    render: (value) => (value ? 'Có' : 'Không'),
  },
];
