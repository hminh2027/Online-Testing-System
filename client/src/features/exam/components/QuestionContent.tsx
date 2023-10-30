import { Button, Checkbox, Flex, Form, Input, InputNumber, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import type { Question, QuestionCreateDTO } from '../types';
import { useUpdateQuestion } from '../hooks/useQuestion';
import { Uploader } from '@/components/Uploader';

interface QuestionContentProps {
  question: Question;
}
export function QuestionContent({ question }: QuestionContentProps) {
  const [image, setImage] = useState<string | null>(null);
  const [form] = Form.useForm();
  const { mutate } = useUpdateQuestion({
    onSuccess: () => {},
    onError: () => {},
  });

  const handleFinish = (values: QuestionCreateDTO) => {
    mutate({
      payload: {
        ...values,
        imageUrl: image as string,
      },
      id: question.id as number,
    });
  };

  return (
    <Form
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      initialValues={{
        content: question.content,
        answers: question.Answer,
        score: question.score,
      }}
    >
      <Form.Item label="Số điểm" name="score">
        <InputNumber />
      </Form.Item>
      <Uploader image={image} setImage={setImage} />
      <Form.Item label="Câu hỏi" name="content">
        <Input.TextArea />
      </Form.Item>
      <Typography.Text>Đáp án</Typography.Text>
      <Form.List name="answers">
        {(fields, { add, remove }) => (
          <Flex
            vertical
            style={{
              maxHeight: '25vh',
              overflow: 'auto',
            }}
          >
            {fields.map((field) => (
              <Flex key={field.key} gap={14} align="center" justify="center">
                <Form.Item name={[field.name, 'isCorrect']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
                <Form.Item style={{ width: '100%' }} {...field} name={[field.name, 'content']}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button icon={<DeleteOutlined />} onClick={() => remove(field.key)} />
                </Form.Item>
              </Flex>
            ))}
            <Button block onClick={add}>
              Thêm đáp án
            </Button>
          </Flex>
        )}
      </Form.List>
      <Form.Item label="Tính điểm theo số đáp án đúng">
        <Checkbox />
      </Form.Item>
      <Button onClick={() => form.submit()} block type="primary">
        Cập nhật
      </Button>
    </Form>
  );
}
