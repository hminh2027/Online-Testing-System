import { Button, Col, Flex, Modal, Row, Space, Typography } from 'antd';
import {
  useAsync,
  useBeforeUnload,
  useLocation,
  usePageLeave,
  useToggle,
  useWindowSize,
} from 'react-use';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { CustomCard, LoadingModal } from '@/components';
import { ExamAnswerSheet, ExamTimer, ExamQuestionCard } from '../components';
import useOngoingAttempt from '@/features/attempt/hooks/useOnGoingAttempt';
import { useAttemptStore } from '@/features/attempt/stores';
import { isAfterTime, isBeforeNow, storage } from '@/utils';
import { useAttemptMutation } from '@/features/attempt/hooks/useAttemptMutation';
import { useAuth } from '@/features/auth';
import { socket } from '@/libs/socket';
import type { Attempt } from '@/features/attempt/types';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useNotificationMutation } from '@/features/notification/hooks/useNotificationMutation';
import { useAnswerSheetStore } from '../stores/answerSheetStore';

export default function ExamTaking() {
  useBeforeUnload(true, 'You have unsaved changes, are you sure?');

  const { height } = useWindowSize();
  const [openWanring, toggleOpen] = useToggle(false);
  const { fetchOnGoingAttempt } = useOngoingAttempt();
  const { setAttempt } = useAttemptStore();
  const [localAttempt, setLocalAttempt] = useState<Attempt>();
  const { increaseTaboutFn, updateFn } = useAttemptMutation();
  const navigation = useNavigate();
  const { user } = useAuth();
  const { notify } = useAntDNoti();
  const { addFn: addNotiFn } = useNotificationMutation();
  const { setQuestionStatus } = useAnswerSheetStore();
  const { hash } = useLocation();

  usePageLeave(() => {
    if (!localAttempt || !localAttempt.Exam.isProctoring) return;
    increaseTaboutFn({
      id: localAttempt?.id as number,
      payload: {},
    });

    notify({
      type: 'warning',
      description: 'Chú ý không rời khỏi khu vực làm bài!',
    });
  }, [localAttempt as never]);

  useAsync(async () => {
    const { content } = await fetchOnGoingAttempt();

    setAttempt(content);
    setLocalAttempt(content);
  }, []);

  useEffect(() => {
    if (localAttempt?.Exam.isProctoring)
      toggleOpen(height + 50 < window.screen.height && height < window.screen.height);
  }, [toggleOpen, height, localAttempt]);

  useEffect(() => {
    if (!user || !localAttempt) return () => {};

    let timer: NodeJS.Timeout | null = null;

    socket.emit('reconnect', user.id, localAttempt.id);
    timer = setInterval(() => {
      socket.emit('heartbeat', user.id);
    }, 5000);

    return () => clearInterval(timer as never);
  }, [user, localAttempt]);

  useEffect(() => {
    if (!localAttempt) return;

    const timeSpent = dayjs(localAttempt?.startedAt)
      .add(
        dayjs.duration({
          minutes: localAttempt?.Exam.duration,
          hours: 7,
        }),
      )
      .toISOString();

    const isTimeInvalid =
      isBeforeNow(new Date(timeSpent)) ||
      (localAttempt.Exam.endAt ? isAfterTime(new Date(timeSpent), localAttempt.Exam.endAt) : false);

    if (isTimeInvalid) {
      updateFn({
        id: localAttempt?.id as number,
        payload: {},
      });
      addNotiFn({
        content: `Học sinh ${user?.fullname} đã hoàn thành bài kiểm tra ${localAttempt.Exam.title} của bạn`,
        notiType: 'exam',
        recipents: [localAttempt.Exam.teacherId],
      });
      storage.clear('ExamQuestionOrder');
      Modal.error({
        centered: true,
        title: 'Hết giờ làm bài',
        content: 'Đã hết giờ làm bài. Nhấn ok đề thoát',
        onOk: () =>
          navigation(`/class/${localAttempt.Exam.Class.code}/exams/${localAttempt.Exam.id}/result`),
      });
    }
  }, [addNotiFn, localAttempt, navigation, updateFn, user?.fullname]);

  function handleShuffle<T>(array: T[]) {
    const examQuestionOrder = storage.get('ExamQuestionOrder') as string;

    if (examQuestionOrder) return JSON.parse(examQuestionOrder) as T[];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    storage.set('ExamQuestionOrder', JSON.stringify(array));

    return array;
  }

  if (!localAttempt) return <LoadingModal />;

  const { Exam } = localAttempt;

  const submit = () => {
    updateFn({
      id: localAttempt.id as number,
      payload: {},
    });

    addNotiFn({
      content: `Học sinh ${user?.fullname} đã hoàn thành bài kiểm tra ${localAttempt.Exam.title} của bạn`,
      notiType: 'exam',
      recipents: [localAttempt.Exam.teacherId],
    });
    storage.clear('ExamQuestionOrder');
    navigation(`/class/${localAttempt.Exam.Class.code}/exams/${localAttempt.Exam.id}/result`);
  };

  const handleSubmit = () =>
    Modal.confirm({
      centered: true,
      title: 'Chú ý nộp bài sớm',
      content: 'Vẫn còn thời gian để soát lại bài, bạn đã chắc muốn nộp bài sớm?',
      onOk: submit,
    });

  const setFlag = () => {
    const id = hash?.split('-')[1];

    if (!id) return;

    setQuestionStatus(+id - 1, 'flagged');
  };

  const examTimer = dayjs(localAttempt.startedAt)
    .add(Exam.duration, 'minutes')
    .diff(dayjs(), 'seconds');

  return (
    <>
      <Typography.Title
        style={{
          textAlign: 'center',
          margin: 16,
        }}
        level={2}
      >
        Đề thi {Exam?.title}
      </Typography.Title>
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
                <ExamTimer onComplete={submit} total={Exam.duration} remain={examTimer} />
                {Exam.Question && (
                  <ExamAnswerSheet
                    questions={
                      Exam.isShuffleQuestion ? handleShuffle(Exam.Question) : Exam.Question
                    }
                  />
                )}
              </Flex>
              <Space direction="vertical">
                <Button block danger type="dashed" onClick={setFlag}>
                  Đánh dấu
                </Button>
                <Button block danger type="primary" onClick={handleSubmit}>
                  Nộp bài
                </Button>
              </Space>
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
        <Modal centered open={openWanring} title="Cảnh báo!" footer={false} closeIcon={false}>
          <Typography.Text>
            Vui lòng <Typography.Text strong>bật F11</Typography.Text> và làm bài ở chế độ{' '}
            <Typography.Text strong>toàn màn hình.</Typography.Text>
          </Typography.Text>
        </Modal>
      </Row>
    </>
  );
}
