import { Button } from 'antd';
import type { Question } from '../../types';

interface ExamAnswerBoxProps {
  item: Question;
  index: number;
}
export default function ExamAnswerBox({ index, item }: ExamAnswerBoxProps) {
  return (
    <Button href={`#question-${index + 1}`} key={item.id}>
      {index + 1}
    </Button>
  );
}
