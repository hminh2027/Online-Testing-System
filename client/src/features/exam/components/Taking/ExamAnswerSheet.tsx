import { Space, Flex, Badge, List } from 'antd';
import { useState } from 'react';
import type { Question } from '../../types';
import ExamAnswerBox from './ExamAnswerBox';

interface ExamAnswerSheetProps {
  questions: Question[];
}

enum QuestionStatus {
  flagged,
  visited,
  unvisited,
}

interface QuestionWithStatus {
  question: Question;
  status: keyof typeof QuestionStatus;
}

export function ExamAnswerSheet({ questions }: ExamAnswerSheetProps) {
  const [localQuestions, setLocalQuestions] = useState<QuestionWithStatus>();

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
          xs: 1,
          md: 2,
          lg: 3,
          sm: 4,
          xl: 5,
          column: 7,
        }}
        dataSource={questions}
        renderItem={(item, index) => (
          <List.Item>
            <ExamAnswerBox index={index} item={item} />
          </List.Item>
        )}
      />
    </Space>
  );
}
