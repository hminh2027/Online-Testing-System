import { Space, Flex, Badge, Button, List } from 'antd';
import type { Question } from '../../types';

interface ExamAnswerSheetProps {
  questions: Question[];
}
export function ExamAnswerSheet({ questions }: ExamAnswerSheetProps) {
  return (
    <Space direction="vertical" size="middle">
      <Flex style={{ width: '100%' }} justify="space-between">
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
            <Button href={`#question-${item.id}`} key={item.id}>
              {index + 1}
            </Button>
          </List.Item>
        )}
      />
    </Space>
  );
}
