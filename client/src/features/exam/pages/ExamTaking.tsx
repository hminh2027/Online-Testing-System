import { Button, Col, Flex, Modal, Row, Typography } from 'antd';
import { useBeforeUnload, usePageLeave, useToggle, useWindowSize } from 'react-use';
import { useEffect } from 'react';
import { CustomCard } from '@/components';
import { useExam } from '../hooks/useExam';
import { ExamAnswerSheet, ExamTimer, ExamQuestionCard } from '../components';
import type { Question } from '../types';

export default function ExamTaking() {
  useBeforeUnload(true, 'You have unsaved changes, are you sure?');

  const { height } = useWindowSize();

  const [openWanring, toggleOpen] = useToggle(false);

  const { data: examData, isFetching } = useExam(1);
  const exam = examData?.content;

  usePageLeave(() => console.log('Page left...'));

  useEffect(() => {
    toggleOpen(height + 50 < window.screen.height && height < window.screen.height);
  }, [toggleOpen, height]);

  if (isFetching || !exam) return <>Loading</>;

  return (
    <>
      <Typography.Title level={2}>Đề thi {exam?.title}</Typography.Title>
      <Row
        gutter={24}
        style={{
          width: '80%',
          margin: 'auto',
        }}
      >
        <Col span={8}>
          <CustomCard bodyStyle={{ height: '100%' }} style={{ height: '80vh' }}>
            <Flex style={{ height: '100%' }} vertical justify="space-between">
              <Flex justify="center" align="center" vertical gap={20}>
                <Typography.Title level={2}>Thời gian</Typography.Title>
                <ExamTimer duration={exam.duration * 60} />
                <ExamAnswerSheet questions={exam.Question as Question[]} />
              </Flex>
              <Button block danger type="primary">
                Nộp bài
              </Button>
            </Flex>
          </CustomCard>
        </Col>
        <Col span={16}>
          <CustomCard
            style={{
              height: '80vh',
              overflow: 'auto',
            }}
          >
            <Flex vertical align="center" gap={24}>
              {exam.Question?.map((ques, index) => (
                <ExamQuestionCard index={index + 1} key={ques.id} question={ques} />
              ))}
            </Flex>
          </CustomCard>
        </Col>
        <Modal centered open={!openWanring} title="Cảnh báo!" footer={false} closeIcon={false}>
          <Typography.Text>
            Vui lòng <Typography.Text strong>bật F11</Typography.Text> và làm bài ở chế độ{' '}
            <Typography.Text strong>toàn màn hình.</Typography.Text>
          </Typography.Text>
        </Modal>
      </Row>
    </>
  );
}
