import type { FormInstance } from 'antd';
import { Col, DatePicker, Form, Input, InputNumber, Row, Switch } from 'antd';
import dayjs from 'dayjs';
import { useExamMutation } from '@/features/exam/hooks/useExamMutation';
import type { Exam, ExamCreateDTO } from '@/features/exam/types';
import { formatTime, formatTimeToDateTime } from '@/utils';

interface ModifierFormProps {
  exam?: Exam;
  form: FormInstance;
}
export default function ModifierForm({ exam, form }: ModifierFormProps) {
  console.log(exam);

  const { addFn, updateFn } = useExamMutation();

  const handleOnFinish = (values: ExamCreateDTO) => {
    const payload: ExamCreateDTO = {
      ...values,
    };

    console.log(payload);

    // if (id) {
    //   return updateFn({
    //     id,
    //     payload,
    //   });
    // }

    // return addFn(payload);
  };

  const dataAdapter = (data: Exam): ExamCreateDTO => ({
    title: data.title,
    description: data.description,
    duration: data.duration,
    startAt: exam?.startAt && formatTimeToDateTime(exam.startAt),
    deadlineAt: exam?.deadlineAt && formatTimeToDateTime(exam.deadlineAt),
    attemptLimit: data.attemptLimit,
    isProcting: data.isProcting,
    isSubmitLateAllowed: data.isSubmitLateAllowed,
    isShuffleQuestion: data.isShuffleQuestion,
    isShowAnswer: data.isShowAnswer,
    isShowExplaination: data.isShowExplaination,
    isResumeAllowed: data.isResumeAllowed,
  });

  return (
    <Form
      form={form}
      style={{ width: '100%' }}
      layout="vertical"
      preserve={false}
      onFinish={handleOnFinish}
      initialValues={exam ? { ...dataAdapter(exam) } : {}}
    >
      <Form.Item label="Tiêu đề bài thi" required name="title">
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả" required name="description">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Giới hạn làm bài" required name="attemptLimit">
            <InputNumber<number>
              addonAfter="lần"
              min={1}
              style={{ width: '100%' }}
              controls={false}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Thời lượng bài kiểm tra" name="duration">
            <InputNumber<number>
              addonAfter="phút"
              min={1}
              style={{ width: '100%' }}
              controls={false}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Thời gian bắt đầu" name="startAt" required>
            <DatePicker showTime placeholder="Nhấp chọn ngày giờ" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Thời gian kết thúc" name="deadlineAt">
            <DatePicker showTime />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Cho phép nộp muộn" name="isSubmitLateAllowed">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Cho phép làm tiếp" name="isResumeAllowed">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Chống gian lận" name="isProcting">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Đảo đề" name="isShuffleQuestion">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Hiển thị đáp án" name="isShowAnswer">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Hiển thị giải thích" name="isShowExplaination">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
