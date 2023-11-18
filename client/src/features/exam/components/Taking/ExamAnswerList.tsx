import type { RadioChangeEvent } from 'antd';
import { Checkbox, Flex, Radio } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState, useEffect } from 'react';
import type { Answer } from '../../types';
import { useAttemptStore } from '@/features/attempt/stores';
import type { Choice } from '@/features/attempt/types/choice';
import { useChoiceMutation } from '@/features/attempt/hooks/useChoiceMutation';

const ALPHABETICAL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

interface ExamAnswerListProps {
  answers: Answer[];
  questionId: number;
}

export function ExamAnswerList({ answers, questionId }: ExamAnswerListProps) {
  const { addFn, addManyFn } = useChoiceMutation();

  const { attempt } = useAttemptStore();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const isMultiple = answers.filter((item) => item.isCorrect).length > 1;

  const handleOnRadioSelect = (event: RadioChangeEvent) => {
    const answerId = event.target.value as number;

    setSelectedAnswers([answerId]);

    addFn({
      answerId,
      questionId,
      attemptId: attempt?.id as number,
    });
  };

  const handleOnChangeCheckbox = (values: CheckboxValueType[]) => {
    setSelectedAnswers(values as number[]);

    const mappedAnswers = values.map((answerId) => ({
      attemptId: attempt?.id as number,
      questionId,
      answerId: +answerId,
    }));

    addManyFn(mappedAnswers);
  };

  useEffect(() => {
    const userChoices = attempt?.Choice.filter(
      (choice) => choice.questionId === questionId,
    ) as Choice[];

    setSelectedAnswers(userChoices.map((uc) => uc.answerId));
  }, [attempt?.Choice, questionId]);

  return isMultiple ? (
    <Checkbox.Group onChange={handleOnChangeCheckbox} value={selectedAnswers}>
      <Flex gap={16} vertical style={{ width: '100%' }}>
        {answers.map((ans, index) => (
          <Checkbox
            key={ans.id}
            value={ans.id}
            style={{
              border: '1px solid grey',
              borderRadius: 8,
              padding: 12,
            }}
          >
            {ALPHABETICAL[index]}. {ans.content}
          </Checkbox>
        ))}
      </Flex>
    </Checkbox.Group>
  ) : (
    <Radio.Group
      value={selectedAnswers.length > 0 && selectedAnswers[0]}
      onChange={handleOnRadioSelect}
    >
      <Flex gap={16} vertical style={{ width: '100%' }}>
        {answers.map((ans, index) => (
          <Radio
            key={ans.id}
            value={ans.id}
            style={{
              border: '1px solid grey',
              borderRadius: 8,
              padding: 12,
            }}
          >
            {ALPHABETICAL[index]}. {ans.content}
          </Radio>
        ))}
      </Flex>
    </Radio.Group>
  );
}
