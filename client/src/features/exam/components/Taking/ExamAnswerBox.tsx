import { Button } from 'antd';
import { useLocation } from 'react-use';
import type { CSSProperties } from 'react';
import { useAnswerSheetStore } from '../../stores/answerSheetStore';

interface ExamAnswerBoxProps {
  index: number;
}
export default function ExamAnswerBox({ index }: ExamAnswerBoxProps) {
  const { questionMap } = useAnswerSheetStore();
  const { hash } = useLocation();

  const getColorByStatus = (
    questionIndex: number,
  ): CSSProperties['borderColor'] | CSSProperties['color'] => {
    const id = hash?.split('-')[1];

    if (!id) return 'initial';

    if (+id - 1 === index) return 'blue';

    const status = questionMap?.get(questionIndex);

    switch (status) {
      case 'flagged':
        return 'orange';

      case 'visited':
        return 'green';

      case 'unvisited':
        return 'initial';

      default:
        return 'initial';
    }
  };

  return (
    <Button
      style={{
        borderColor: getColorByStatus(index),
        color: getColorByStatus(index),
        boxSizing: 'border-box',
      }}
      href={`#question-${index + 1}`}
    >
      {index + 1}
    </Button>
  );
}
