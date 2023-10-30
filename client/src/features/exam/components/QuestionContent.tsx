import { Checkbox, Divider, Flex, Form, Input, InputNumber, Typography } from 'antd';
import type { Question } from '../types';

interface QuestionContentProps {
  question: Question;
}
export function QuestionContent({ question }: QuestionContentProps) {
  return (
    <Form
      layout="vertical"
      initialValues={{
        content: question.content,
        answers: question.Answer.map((answer) => answer.content),
        score: question.score,
      }}
    >
      <Flex vertical>
        <Form.Item label="Số điểm" name="score">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Câu hỏi" name="content">
          <Input.TextArea />
        </Form.Item>
        <Typography.Text>Đáp án</Typography.Text>
        <Form.List name="answers">
          {(fields) => (
            <div>
              {fields.map((field) => (
                <Flex key={field.key} gap={14} align="center" justify="center">
                  <Form.Item>
                    <Checkbox />
                  </Form.Item>
                  <Form.Item style={{ width: '100%' }} {...field} name={field.name}>
                    <Input />
                  </Form.Item>
                </Flex>
              ))}
            </div>
          )}
        </Form.List>
        <Form.Item label="Tính điểm theo số đáp án đúng">
          <Checkbox />
        </Form.Item>
      </Flex>
    </Form>
  );
}
