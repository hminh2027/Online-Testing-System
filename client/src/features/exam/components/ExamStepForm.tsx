import { Flex, Steps } from 'antd';
import { useState } from 'react';
import { ExamQuestionDnd } from '.';
import type { Exam } from '../types';

interface ExamStepFormProps {
  exam: Exam;
}

export function ExamStepForm({ exam }: ExamStepFormProps) {
  const [curStep, setCurStep] = useState<number>(0);

  const steps = [
    {
      title: 'Đáp án',
      content: <ExamQuestionDnd questions={exam.Question} />,
    },
    {
      title: 'Thông tin',
      content: 'asdasd',
    },
    {
      title: 'Hoàn tất',
      content: 'DONE',
    },
  ];

  const items = steps.map((step) => ({ title: step.title }));

  return (
    <div>
      <Flex vertical gap={12}>
        <Steps onChange={(value) => setCurStep(value)} current={curStep} items={items} />
        {steps[curStep].content}
      </Flex>
    </div>
  );
}
