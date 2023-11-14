import { Button, Col, Flex, Input, Modal, Radio, Row, Space, Typography } from 'antd';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useBeforeUnload, usePageLeave, useToggle, useWindowSize } from 'react-use';
import { useEffect } from 'react';
import { CustomCard } from '@/components';
import { useExam } from '../hooks/useExam';

export default function ExamTaking() {
  useBeforeUnload(true, 'You have unsaved changes, are you sure?');

  const { height } = useWindowSize();

  const [openWanring, toggleOpen] = useToggle(false);

  const { data: examData } = useExam(1);
  const exam = examData?.content;

  usePageLeave(() => console.log('Page left...'));

  useEffect(() => {
    toggleOpen(height + 50 < window.screen.height && height < window.screen.height);
  }, [toggleOpen, height]);

  return (
    <Row
      gutter={24}
      style={{
        width: '80%',
        margin: 'auto',
      }}
    >
      <Col span={6}>
        <CustomCard bodyStyle={{ height: '100%' }} style={{ height: '80vh' }}>
          <Flex style={{ height: '100%' }} vertical justify="space-between">
            <Flex justify="center" align="center" vertical>
              <Typography.Title level={2}>Thời gian</Typography.Title>
              <CountdownCircleTimer
                size={120}
                isPlaying
                duration={7}
                colors={['#008000', '#0000FF', '#FF0000', '#FF0000']}
                colorsTime={[7, 5, 2, 0]}
              >
                {({ remainingTime }) => remainingTime}
              </CountdownCircleTimer>
            </Flex>
            <Button block danger type="primary">
              Nộp bài
            </Button>
          </Flex>
        </CustomCard>
      </Col>
      <Col span={18}>
        <CustomCard style={{ height: '80vh' }}>
          <Flex vertical align="center">
            <Typography.Title level={2}>Đề thi {exam?.title}</Typography.Title>
            <ExamQuestionContent />
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
  );
}

function ExamQuestionContent() {
  return (
    <CustomCard style={{ width: '100%' }} hasShadow title="Câu thứ 1">
      <Flex>
        <Typography.Text>thế nào là tự biên tự diễn?</Typography.Text>
        <Radio.Group>
          <Space direction="vertical">
            <Radio value={1}>Option A</Radio>
            <Radio value={2}>Option B</Radio>
            <Radio value={3}>Option C</Radio>
          </Space>
        </Radio.Group>
      </Flex>
    </CustomCard>
  );
}

function ExamTakingQuestion() {
  return <></>;
}
