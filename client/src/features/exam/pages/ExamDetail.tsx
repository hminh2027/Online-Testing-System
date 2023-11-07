import { Button, Flex, Steps } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ExamAssignment, ExamContent, ExamMeta } from '../components';
import { useExam } from '../hooks/useExam';

export default function ExamDetail() {
  const { id } = useParams();
  const [curStep, setCurStep] = useState(0);

  const { data } = useExam(id || '', { enabled: !!id });
  const exam = data?.content;

  // SU DUNG ZUSTAND CONTEXT LUU THOI
  console.log('refetch');

  const steps = [
    {
      title: 'Thông tin bài kiểm tra',
      content: exam && <ExamMeta exam={exam} />,
    },
    {
      title: 'Nội dung bài kiểm tra',
      content: exam && <ExamContent exam={exam} />,
    },
    {
      title: 'Giao bài kiểm tra',
      content: <ExamAssignment />,
    },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handlePrev = () => curStep > 0 && setCurStep(curStep - 1);
  const handleNext = () => curStep < steps.length - 1 && setCurStep(curStep + 1);

  return (
    <Flex
      justify="space-between"
      vertical
      gap={24}
      style={{
        height: '80%',
        width: '70%',
        margin: '4rem auto',
      }}
    >
      <Steps current={curStep} items={items} />
      {steps[curStep].content}
      <Flex gap={24}>
        {curStep > 0 && <Button onClick={handlePrev}>Quay lại</Button>}
        <Button onClick={handleNext} type="primary" block>
          {curStep < steps.length - 1 ? 'Tiếp tục' : 'Hoàn tất'}
        </Button>
      </Flex>
    </Flex>
  );
}
