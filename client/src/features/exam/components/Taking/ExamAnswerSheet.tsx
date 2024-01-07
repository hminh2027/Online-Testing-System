import { Space, Flex, Badge, List } from 'antd';
import { useEffect } from 'react';
import type { Question } from '../../types';
import ExamAnswerBox from './ExamAnswerBox';

import type { AnswerStatusType } from '../../stores/answerSheetStore';
import { useAnswerSheetStore } from '../../stores/answerSheetStore';

interface ExamAnswerSheetProps {
  questions: Question[];
}

export function ExamAnswerSheet({ questions }: ExamAnswerSheetProps) {
  const { setQuestionMap } = useAnswerSheetStore();

  useEffect(() => {
    const questionMap = new Map<number, AnswerStatusType>();

    questions.forEach((_, index) => {
      questionMap.set(index, 'unvisited');
    });

    setQuestionMap(questionMap);
  }, []);

  return (
    <Space direction="vertical" size="middle">
      <Flex gap={12} style={{ width: '100%' }} justify="space-between">
        <Badge color="blue" text="Câu hiện tại" />
        <Badge color="orange" text="Đánh dấu" />
        <Badge color="green" text="Đã trả lời" />
      </Flex>
      <List
        grid={{
          gutter: 24,
          column: 5,
        }}
        dataSource={questions}
        renderItem={(_, index) => (
          <List.Item>
            <ExamAnswerBox index={index} />
          </List.Item>
        )}
      />
    </Space>
  );
}
