import { Button, Checkbox, Flex, Form, Input, Select, Typography } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CloseOutlined } from '@ant-design/icons';
import FormList from 'antd/es/form/FormList';
import TextArea from 'antd/es/input/TextArea';
import { CustomCard } from '@/components';
import type { Question } from '../types';

interface QuestionDndProps {
  question: Question;
  index: number;
}
export function QuestionDnd({ question, index }: QuestionDndProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: question.index,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '30%',
  };

  return (
    <div style={style} ref={setNodeRef}>
      <CustomCard
        title={
          <Typography.Text
            strong
            {...attributes}
            {...listeners}
            style={{
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Câu hỏi thứ {index + 1}
          </Typography.Text>
        }
        extra={<Button type="text" icon={<CloseOutlined />} />}
        hasShadow
      >
        <Form
          layout="vertical"
          initialValues={{
            content: question.content,
            answers: question.Answer.map((answer) => answer.content),
          }}
        >
          <Flex vertical>
            <Form.Item label="Câu hỏi">
              <TextArea />
            </Form.Item>
            <div>{question.score}</div>

            <div>tinh diem theo so dap an</div>
            <FormList name="answers">
              {(fields) => (
                <div>
                  {fields.map((field) => (
                    <Form.Item {...field} key={field.key} name={field.name}>
                      <Flex gap={14}>
                        <Checkbox />
                        <Input />
                      </Flex>
                    </Form.Item>
                  ))}
                </div>
              )}
            </FormList>
          </Flex>
        </Form>
      </CustomCard>
    </div>
  );
}
