import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Button, Flex, Form, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useToggle } from 'react-use';
import { QuestionDnd } from '@/features/exam/components';
import type { Question } from '../types';
import { useExam } from '../hooks/useExam';
import { CustomCard } from '@/components';
import { QuestionModal } from './QuestionModal';
import { useQuestionMutation } from '../hooks/useQuestionMutation';

interface ExamQuestionDndProps {
  id: number;
}

export function ExamQuestionDnd({ id }: ExamQuestionDndProps) {
  const {
    data: examData,
    isFetching,
    refetch,
  } = useExam(id, {
    enabled: !!id,
  });
  const exam = examData?.content;
  const questions = exam?.Question;
  const [form] = Form.useForm();

  const [items, setItems] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useToggle(false);
  const { updateIndex } = useQuestionMutation(id);

  useEffect(() => {
    if (!questions) return;
    setItems(questions);
  }, [questions]);

  if (isFetching) return <>Loading</>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldPos = items.map((i) => i.index);

      const oldIndex = oldPos.indexOf(active.id);
      const newIndex = oldPos.indexOf(over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);

      const newIdArray = newItems.map((item) => item.id);

      (async () => {
        await updateIndex({
          indexArray: newIdArray,
        });
      })();
    }
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.index)}>
          <Flex gap={16} wrap="wrap" justify="start">
            {items.map((item, index) => (
              <QuestionDnd refetch={refetch} question={item} key={item.index} index={index + 1} />
            ))}
            <CustomCard bodyStyle={{ height: '100%' }} style={{ width: '20rem' }}>
              <Button
                onClick={handleAdd}
                block
                style={{ height: '100%' }}
                type="text"
                icon={<PlusSquareOutlined />}
              />
            </CustomCard>
          </Flex>
        </SortableContext>
      </DndContext>
      <Modal
        centered
        closable
        destroyOnClose
        onCancel={setIsModalOpen}
        onOk={handleOk}
        okText="Tạo"
        cancelText="Huỷ"
        title="Tạo câu hỏi"
        open={isModalOpen}
      >
        <QuestionModal examId={id} form={form} />
      </Modal>
    </div>
  );
}
