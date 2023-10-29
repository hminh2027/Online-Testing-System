import { Button, Flex, Form, Typography } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CloseOutlined } from '@ant-design/icons';
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
        <Form>
          <Flex vertical>
            <div>{question.content}</div>
            <div>{question.score}</div>
            <div>tinh diem theo so dap an</div>
          </Flex>
        </Form>
      </CustomCard>
    </div>
  );
}
