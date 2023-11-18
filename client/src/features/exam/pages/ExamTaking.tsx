import { Button, Col, Flex, Modal, Row, Typography } from 'antd';
import { useAsync, useBeforeUnload, usePageLeave, useToggle, useWindowSize } from 'react-use';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { CustomCard, CustomMessage } from '@/components';
import { ExamAnswerSheet, ExamTimer, ExamQuestionCard } from '../components';
import type { Question } from '../types';
import useOngoingAttempt from '@/features/attempt/hooks/useOnGoingAttempt';
import { useAttemptStore } from '@/features/attempt/stores';
import { isBeforeNow } from '@/utils';
import { useAttemptMutation } from '@/features/attempt/hooks/useAttemptMutation';

export default function ExamTaking() {
  useBeforeUnload(true, 'You have unsaved changes, are you sure?');

  const { height } = useWindowSize();
  const [openWanring, toggleOpen] = useToggle(false);
  const { fetchOnGoingAttempt } = useOngoingAttempt();
  const { attempt, setAttempt } = useAttemptStore();
  const { increaseTaboutFn, updateFn } = useAttemptMutation();
  const navigation = useNavigate();

  // TODO: check các điều kiện của exam: cho làm tiếp, đảo đề, chống cheat, ...

  usePageLeave(() => {
    if (!attempt) return;
    increaseTaboutFn({
      id: attempt?.id as number,
      payload: {},
    });

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    CustomMessage.warning('Chú ý không rời khỏi khu vực làm bài!');
  });

  useAsync(async () => {
    const { content } = await fetchOnGoingAttempt();

    setAttempt(content);
  }, []);

  useEffect(() => {
    toggleOpen(height + 50 < window.screen.height && height < window.screen.height);
  }, [toggleOpen, height]);

  useEffect(() => {
    if (!attempt) return;

    const timeSpent = dayjs(attempt?.startedAt)
      .add(
        dayjs.duration({
          minutes: attempt?.Exam.duration,
          hours: 7,
        }),
      )
      .toISOString();

    const isTimeInvalid = isBeforeNow(new Date(timeSpent));

    if (isTimeInvalid) {
      updateFn({
        id: attempt?.id as number,
        payload: {},
      });
      Modal.error({
        content: 'Đã hết giờ làm bài. Nhấn ok đề thoát',
        onOk: () => navigation(`/class/${attempt.Exam.Class.code}/exams/${attempt.Exam.id}/result`),
      });
    }
  }, [attempt, navigation, updateFn]);

  if (!attempt) return <>Loading</>;

  const { Exam } = attempt;

  // TODO: check start rồi thì check cả end deadline
  // (Exam.deadlineAt && isAfterTime(new Date(timeSpent), Exam.deadlineAt));

  const handleSubmit = () =>
    Modal.confirm({
      centered: true,
      title: 'Chú ý nộp bài sớm',
      content: 'Vẫn còn thời gian để soát lại bài, bạn đã chắc muốn nộp bài sớm?',
      onOk: () => {
        updateFn({
          id: attempt.id as number,
          payload: {},
        });

        navigation(`/class/${attempt.Exam.Class.code}/exams/${attempt.Exam.id}/result`);
      },
    });

  return (
    <>
      <Typography.Title level={2}>Đề thi {Exam?.title}</Typography.Title>
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
                <ExamTimer duration={Exam.duration * 60} />
                <ExamAnswerSheet questions={Exam.Question as Question[]} />
              </Flex>
              <Button block danger type="primary" onClick={handleSubmit}>
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
              {Exam.Question?.map((ques, index) => (
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
