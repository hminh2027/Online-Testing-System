import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { Button, Flex } from 'antd';
import { useEffect, useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useToggle } from 'react-use';
import { QuestionDnd } from '@/features/exam/components';
import type { Question } from '../types';
import { useExam } from '../hooks/useExam';

interface ExamQuestionDndProps {
  id: number;
}

export function ExamQuestionDnd({ id }: ExamQuestionDndProps) {
  const { data: examData, isFetching } = useExam(id, {
    enabled: !!id,
  });
  const exam = examData?.content;
  const questions = exam?.Question;

  const [items, setItems] = useState<Question[]>([]);

  useEffect(() => {
    if (!questions) return;
    setItems(questions);
  }, [questions]);

  if (isFetching) return <></>;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldPos = items.map((i) => i.index);

      const oldIndex = oldPos.indexOf(active.id);
      const newIndex = oldPos.indexOf(over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);
    }
  };

  const handleDragStart = (event) => {};

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <SortableContext items={items.map((i) => i.index)}>
          <Flex gap={16} wrap="wrap" justify="start">
            {items.map((item, index) => (
              <QuestionDnd question={item} key={item.index} index={index} />
            ))}
            <Button block icon={<PlusSquareOutlined />} />
          </Flex>
        </SortableContext>
      </DndContext>
    </div>
  );
}
