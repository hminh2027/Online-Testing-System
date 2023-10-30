import { Button, Collapse, Modal, Space, Typography } from 'antd';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CloseOutlined, EditOutlined, HolderOutlined } from '@ant-design/icons';
import { useToggle } from 'react-use';
import type { Question } from '../types';
import { QuestionContent } from './QuestionContent';
import { CustomCard } from '@/components';

interface QuestionDndProps {
  question: Question;
  index: number;
}
export function QuestionDnd({ question, index }: QuestionDndProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: question.index,
  });

  const [isModalOpen, setIsModalOpen] = useToggle(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '20rem',
  };

  const handleEdit = () => {
    // Modal.confirm({
    //   title: `Câu hỏi thứ ${index + 1}`,
    //   content: <QuestionContent question={question} />,
    //   icon: null,
    //   footer: null,
    //   centered: true,
    //   maskClosable: true,
    // });

    setIsModalOpen(true);
  };

  return (
    <div style={style} ref={setNodeRef}>
      <CustomCard
        title={
          <Typography.Text
            strong
            style={{
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Câu {index + 1}
          </Typography.Text>
        }
        extra={
          <Space>
            <Button icon={<EditOutlined />} onClick={handleEdit} type="text" />
            <Button icon={<HolderOutlined />} type="text" {...attributes} {...listeners} />
            <Button icon={<CloseOutlined />} type="text" />
          </Space>
        }
      >
        <Typography.Text ellipsis>{question.content}</Typography.Text>
      </CustomCard>
      <Modal title="Basic Modal" open={isModalOpen}>
        <QuestionContent question={question} />
      </Modal>
    </div>
  );
}
