import type { FormInstance } from 'antd';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { useEffect, useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { useExamMutation } from '@/features/exam/hooks/useExamMutation';
import type { Exam, ExamCreateDTO } from '@/features/exam/types';
import {
  formatDatePicketToISO,
  formatISOToDatePicker,
  transformToAntdSelectOptions,
} from '@/utils';
import { useListClass } from '@/features/class/hooks/useClass';
import { LoadingModal } from '@/components';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useNotificationMutation } from '@/features/notification/hooks/useNotificationMutation';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';

interface ModifierFormProps {
  exam?: Exam;
  form: FormInstance;
  updatable: boolean;
}

type RangeProps = [Dayjs | null, Dayjs | null] | null;

export function ModifierForm({ exam, form, updatable }: ModifierFormProps) {
  const { addFn, updateFn } = useExamMutation();
  const [range, setRange] = useState<RangeProps>([dayjs(), null]);
  const { data: classData, isFetching } = useListClass({});
  const { notify } = useAntDNoti();
  const { addFn: addNotiFn } = useNotificationMutation();

  const [selectedClassCode, setSelectedClassCode] = useState<string>('');

  const { data: userClassData } = useListUserClass(
    { classCode: selectedClassCode },
    { enabled: false },
  );

  const classes = classData?.content;
  const userClasses = userClassData?.content;
  const validStudentsInClass = userClasses?.filter((uc) => !uc.isPending);

  useEffect(() => {
    if (!exam) return;

    const startAt = formatISOToDatePicker(exam.startAt);
    const deadlineAt = exam.deadlineAt && formatISOToDatePicker(exam.deadlineAt);

    setRange([startAt, deadlineAt]);
  }, [exam]);

  const handleOnFinish = (values: ExamCreateDTO) => {
    if (!range) return null;

    if (!updatable) {
      notify({
        type: 'error',
        description: 'Không thể cập nhật bài kiểm tra đã có người làm',
      });

      return null;
    }

    const payload: ExamCreateDTO = {
      ...values,
      startAt: new Date(formatDatePicketToISO(range[0] as Dayjs)),
      deadlineAt: range[1] && new Date(formatDatePicketToISO(range[1])),
    };

    if (
      values.classCode !== exam?.classCode &&
      !isEmpty(validStudentsInClass) &&
      validStudentsInClass
    ) {
      addNotiFn({
        content: `Giáo viên đã giao bài kiểm tra ${exam?.title} cho lớp ${validStudentsInClass[0].Class.name}`,
        notiType: 'exam',
        recipents: validStudentsInClass.map((u) => u.studentId),
        url: `/class/${values.classCode}`,
      });
    }

    if (exam?.id) {
      return updateFn({
        id: exam.id,
        payload,
      });
    }

    return addFn(payload);
  };

  const handleOnDatePickerOk = (dates: RangeProps) => setRange(dates);

  const dataAdapter = (data: Exam): Omit<ExamCreateDTO, 'startAt' | 'deadlineAt'> => ({
    title: data.title,
    description: data.description,
    duration: data.duration,
    attemptLimit: data.attemptLimit,
    isProcting: data.isProcting,
    isShuffleQuestion: data.isShuffleQuestion,
    isShowAnswer: data.isShowAnswer,
    isResumeAllowed: data.isResumeAllowed,
    classCode: data.classCode,
  });

  if (isFetching || !classes) return <LoadingModal />;

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
          <Form.Item label="Giới hạn làm bài" name="attemptLimit">
            <InputNumber<string>
              addonAfter="lần"
              type="number"
              style={{ width: '100%' }}
              controls={false}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Thời lượng bài kiểm tra" name="duration" required>
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
        <Col span={24}>
          <Form.Item label="Thời gian bài thi" required>
            <DatePicker.RangePicker
              showTime
              allowEmpty={[false, true]}
              value={range}
              style={{ width: '100%' }}
              onOk={handleOnDatePickerOk}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name="classCode" label="Lớp được giao">
        <Select
          allowClear
          options={transformToAntdSelectOptions(classes, 'name', 'code')}
          onChange={(value: string) => setSelectedClassCode(value)}
        />
      </Form.Item>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Cho phép kết nối lại" name="isResumeAllowed" valuePropName="checked">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Chống gian lận" name="isProcting" valuePropName="checked">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Đảo đề" name="isShuffleQuestion" valuePropName="checked">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Hiển thị đáp án" name="isShowAnswer" valuePropName="checked">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
