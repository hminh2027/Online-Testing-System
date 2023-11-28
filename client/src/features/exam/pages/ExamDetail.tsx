import { Button, Flex, Steps } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExamContent, ExamMeta } from '../components';
import { useExam } from '../hooks/useExam';

export default function ExamDetail() {
  const { id } = useParams();
  const [curStep, setCurStep] = useState(0);
  const navigation = useNavigate();

  const { data } = useExam(id || '');

  console.log('first');

  const exam = data?.content;

  const steps = [
    {
      title: 'Thông tin bài kiểm tra',
      content: exam && <ExamMeta exam={exam} />,
    },
    {
      title: 'Nội dung bài kiểm tra',
      content: exam && id && <ExamContent examId={+id} questions={exam.Question} />,
    },
    // {
    //   title: 'Giao bài kiểm tra',
    //   content: <ExamAssignment />,
    // },
  ];

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const handlePrev = () => curStep > 0 && setCurStep(curStep - 1);
  const handleNext = () => curStep < steps.length - 1 && setCurStep(curStep + 1);
  const handleFinish = () => navigation('/class');

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
        {curStep < steps.length - 1 ? (
          <Button onClick={handleNext} type="primary" block>
            Tiếp tục
          </Button>
        ) : (
          <Button onClick={handleFinish} type="primary" block>
            Hoàn tất
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
