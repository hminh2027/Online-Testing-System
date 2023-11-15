import { Flex, Typography } from 'antd';
import { CustomCard } from '@/components';
import { ExamAnswerList } from './ExamAnswerList';
import type { Question } from '../../types';

interface ExamQuestionCardProps {
  question: Question;
  index: number;
}

export function ExamQuestionCard({ question, index }: ExamQuestionCardProps) {
  return (
    <CustomCard
      id={`question-${question.id}`}
      style={{ width: '100%' }}
      hasShadow
      title={`Câu thứ ${index}`}
    >
      <Flex vertical gap={24}>
        <Typography.Text>{question.content}</Typography.Text>
        <ExamAnswerList answers={question.Answer} />
      </Flex>
    </CustomCard>
  );
}
