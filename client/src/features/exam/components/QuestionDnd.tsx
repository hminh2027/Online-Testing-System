import { Button, Form, Modal, Space, Typography } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CloseOutlined, EditOutlined, HolderOutlined } from '@ant-design/icons';
import { useToggle } from 'react-use';
import type { Question } from '../types';
import { CustomCard } from '@/components';
import { useDeleteQuestion } from '../hooks/useQuestion';
import { QuestionModal } from './QuestionModal';

interface QuestionDndProps {
  question: Question;
  index: number;
  refetch: () => void;
}
export function QuestionDnd({ question, index, refetch }: QuestionDndProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: question.index,
  });
  const [form] = Form.useForm();
  const { mutate: deleteFn } = useDeleteQuestion({
    onSuccess: () => refetch(),
  });

  const [isModalOpen, setIsModalOpen] = useToggle(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '20rem',
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleDelete = () => {
    Modal.confirm({
      onOk: () => deleteFn({ id: question.id as number }),
      title: 'Câu hỏi này sẽ bị xoá?',
    });
  };

  return (
    <div style={style} ref={setNodeRef}>
      <CustomCard
        title={
          <Typography.Text
            strong
            style={{
              fontSize: '1rem',
            }}
          >
            Câu {index} _ {question.score} điểm
          </Typography.Text>
        }
        extra={
          <Space>
            <Button icon={<EditOutlined />} onClick={handleEdit} type="text" />
            <Button icon={<HolderOutlined />} type="text" {...attributes} {...listeners} />
            <Button icon={<CloseOutlined />} onClick={handleDelete} type="text" />
          </Space>
        }
      >
        <Typography.Text ellipsis>{question.content}</Typography.Text>
      </CustomCard>
      <Modal
        centered
        closable
        destroyOnClose
        onCancel={setIsModalOpen}
        onOk={handleOk}
        okText="Cập nhật"
        cancelText="Huỷ"
        title={`Cập nhật câu hỏi ${index}`}
        open={isModalOpen}
      >
        <QuestionModal examId={question.examId} form={form} questionId={question.id as number} />
      </Modal>
    </div>
  );
}
