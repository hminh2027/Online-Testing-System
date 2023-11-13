import { Button, Col, Flex, Modal, Row, Typography } from 'antd';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useBeforeUnload, usePageLeave, useToggle, useWindowSize } from 'react-use';
import { useEffect } from 'react';
import { CustomCard } from '@/components';

export default function ExamTaking() {
  useBeforeUnload(true, 'You have unsaved changes, are you sure?');

  const { height } = useWindowSize();

  const [openWanring, toggleOpen] = useToggle(false);

  usePageLeave(() => console.log('Page left...'));

  // useEffect(() => {
  //   toggleOpen(height !== window.screen.height);
  // }, [toggleOpen, height]);

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
              <Typography.Title>Thời gian</Typography.Title>
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
          <Flex vertical>
            <Typography.Title>Câu thứ 1</Typography.Title>
            <Typography.Text>Tại sao quả chanh lại chua xin xít?</Typography.Text>
          </Flex>
        </CustomCard>
      </Col>
      <Modal centered open={openWanring} title="Cảnh báo!" footer={false} closeIcon={false}>
        <Typography.Text>
          Vui lòng <Typography.Text strong>bật F11</Typography.Text> và làm bài ở chế độ{' '}
          <Typography.Text strong>toàn màn hình.</Typography.Text>
        </Typography.Text>
      </Modal>
    </Row>
  );
}
