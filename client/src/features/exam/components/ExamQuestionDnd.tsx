import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, arraySwap, rectSwappingStrategy } from '@dnd-kit/sortable';
import { Button, Flex } from 'antd';
import { useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { QuestionDnd } from '@/features/exam/components';
import type { Question } from '../types';

interface ExamQuestionDndProps {
  questions: Question[];
}

export function ExamQuestionDnd({ questions }: ExamQuestionDndProps) {
  const [items, setItems] = useState(questions);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldPos = items.map((i) => i.index);

      const oldIndex = oldPos.indexOf(active.id);
      const newIndex = oldPos.indexOf(over.id);

      const newItems = arraySwap(items, oldIndex, newIndex);

      setItems(newItems);
    }
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.index)} strategy={rectSwappingStrategy}>
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
