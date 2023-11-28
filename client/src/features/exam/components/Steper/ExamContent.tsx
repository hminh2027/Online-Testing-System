import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Button, Divider, Flex, Form, Input, List, Modal, Space } from 'antd';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useToggle } from 'react-use';
import type { Question } from '../../types';
import { useQuestionMutation } from '../../hooks/useQuestionMutation';
import { QuestionForm } from '../Form';
import { QuestionCard } from '../Card';

interface ExamContentProps {
  examId: number;
  questions: Question[];
}
export function ExamContent({ examId, questions }: ExamContentProps) {
  const [form] = Form.useForm();

  const [items, setItems] = useState<Question[]>([]);
  const [isModalOpen, toggleModal] = useToggle(false);
  const { updateIndex } = useQuestionMutation(examId);

  useEffect(() => {
    if (!questions) return;
    setItems(questions);
  }, [questions]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldPos = items.map((i) => i.index);

      const oldIndex = oldPos.indexOf(+active.id);
      const newIndex = oldPos.indexOf(+over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);

      const newIdArray = newItems.map((item) => item.id) as number[];

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      updateIndex({
        indexArray: newIdArray,
      });
    }
  };

  const handleAdd = () => {
    toggleModal(true);
  };

  const handleOk = () => {
    form.submit();
  };

  return (
    <div
      style={{
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Divider orientation="left">Thông tin</Divider>
      <Flex justify="space-between">
        <Space size="large">
          <Input readOnly addonBefore="Tổng số câu hỏi" addonAfter="câu" value={items.length} />
          <Input
            readOnly
            addonBefore="Tổng số điểm"
            addonAfter="điểm"
            value={items.reduce((acc, item) => acc + item.point, 0)}
          />
        </Space>
        <Space>
          <Button onClick={handleAdd} type="primary" icon={<PlusOutlined />}>
            Tạo câu hỏi mới
          </Button>
        </Space>
      </Flex>
      <Divider orientation="left">Nội dung</Divider>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.index)}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              md: 2,
              column: 4,
            }}
            dataSource={items}
            renderItem={(item, index) => (
              <List.Item>
                <QuestionCard question={item} key={item.index} index={index + 1} />
              </List.Item>
            )}
          />
        </SortableContext>
      </DndContext>
      <Modal
        centered
        closable
        destroyOnClose
        onCancel={toggleModal}
        onOk={handleOk}
        okText="Tạo"
        cancelText="Huỷ"
        title="Tạo câu hỏi"
        open={isModalOpen}
      >
        <QuestionForm toggleModal={toggleModal} examId={examId} form={form} />
      </Modal>
    </div>
  );
}
