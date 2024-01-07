import type { FormInstance } from 'antd';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import type { RangePickerProps } from 'antd/es/date-picker';
import isNil from 'lodash/isNil';
import { useExamMutation } from '@/features/exam/hooks/useExamMutation';
import type { Exam, ExamCreateDTO } from '@/features/exam/types';
import {
  createValidator,
  formatDatePicketToISO,
  formatISOToDatePicker,
  transformToAntdSelectOptions,
} from '@/utils';
import { useListClass } from '@/features/class/hooks/useClass';
import { LoadingModal } from '@/components';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useNotificationMutation } from '@/features/notification/hooks/useNotificationMutation';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';
import { examSchema } from '@/features/exam/schemas/exam.schema';

interface ModifierFormProps {
  exam?: Exam;
  form: FormInstance;
  updatable: boolean;
}

type RangeProps = [Dayjs | null, Dayjs | null] | null;

export function ModifierForm({ exam, form, updatable }: ModifierFormProps) {
  const { addFn, updateFn } = useExamMutation();
  const { data: classData, isFetching } = useListClass({}, { refetchOnWindowFocus: false });
  const { notify } = useAntDNoti();
  const { addFn: addNotiFn } = useNotificationMutation();

  const [selectedClassCode, setSelectedClassCode] = useState<string>('');

  const { data: userClassData } = useListUserClass(
    { classCode: selectedClassCode },
    { enabled: !!selectedClassCode },
  );

  const classes = classData?.content;
  const userClasses = userClassData?.content;

  const validStudentsInClass = userClasses?.filter((uc) => !uc.isPending);

  const yupSync = createValidator(examSchema);

  const isEndDateValid = (startAt: Dayjs, endAt: Dayjs, duration: number) =>
    endAt.diff(startAt, 'minute') >= duration;

  const handleOnFinish = (values: ExamCreateDTO) => {
    if (!updatable) {
      notify({
        type: 'error',
        description: 'Không thể cập nhật bài kiểm tra đã có người làm',
      });

      return null;
    }

    const range = form.getFieldValue('range') as RangeProps;

    const isValid =
      range && range[1] && isEndDateValid(range[0] as Dayjs, range[1], values.duration);

    if (!isValid) {
      return form.setFields([
        {
          name: 'range',
          errors: [
            'Thời gian kết thúc không hợp lệ, phải lớn hơn tổng thời gian bắt đầu và thời lượng bài kiểm tra',
          ],
        },
      ]);
    }

    const payload: ExamCreateDTO = {
      ...values,
      startAt: new Date(formatDatePicketToISO(range[0] as Dayjs)),
      endAt: range[1] && new Date(formatDatePicketToISO(range[1])),
    };

    console.log(validStudentsInClass);

    if (
      values.classCode !== exam?.classCode &&
      !isNil(validStudentsInClass) &&
      !isEmpty(validStudentsInClass)
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

  const dataAdapter = (data: Exam): Omit<ExamCreateDTO, 'startAt' | 'endAt'> => ({
    title: data.title,
    description: data.description,
    duration: data.duration,
    attemptLimit: data.attemptLimit,
    isProctoring: data.isProctoring,
    isShuffleQuestion: data.isShuffleQuestion,
    isShowAnswer: data.isShowAnswer,
    isResumeAllowed: data.isResumeAllowed,
    classCode: data.classCode,
  });

  const genRange = (start: number, end: number) => {
    const result = [];

    for (let i = start; i < end; i++) result.push(i);

    return result;
  };

  const handleDisabledTime: RangePickerProps['disabledTime'] = (_, type) => {
    if (type === 'start') {
      // I need hours and minutes disabled when they are < than current time
      const minutes = dayjs().minute();
      const hours = dayjs().hour();

      return {
        disabledHours: () => genRange(0, 24).splice(0, hours),
        disabledMinutes: () => genRange(0, 60).splice(0, minutes),
      };
    }

    return {};
  };

  if (isFetching || !classes) return <LoadingModal />;

  return (
    <Form
      form={form}
      style={{ width: '100%' }}
      layout="vertical"
      preserve={false}
      onFinish={handleOnFinish}
      initialValues={
        exam
          ? {
              ...dataAdapter(exam),
              range: [
                formatISOToDatePicker(exam.startAt),
                exam.endAt ? formatISOToDatePicker(exam.endAt) : null,
              ],
            }
          : {
              range: [dayjs(), null],
            }
      }
    >
      <Form.Item rules={[yupSync]} label="Tiêu đề bài thi" required name="title">
        <Input />
      </Form.Item>
      <Form.Item rules={[yupSync]} label="Mô tả" required name="description">
        <Input.TextArea rows={3} />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item rules={[yupSync]} label="Giới hạn làm bài" name="attemptLimit">
            <InputNumber<string>
              addonAfter="lần"
              type="number"
              style={{ width: '100%' }}
              controls={false}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item rules={[yupSync]} label="Thời lượng bài kiểm tra" name="duration" required>
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
          <Form.Item label="Thời gian bài thi" required name="range">
            <DatePicker.RangePicker
              placeholder={['Thời gian bắt đầu', 'Thời gian kết thúc']}
              showTime={{ format: 'HH:mm' }}
              format="DD/MM/YYYY HH:mm"
              allowEmpty={[false, true]}
              disabledDate={(current) => current && current < dayjs()}
              disabledTime={handleDisabledTime}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item rules={[yupSync]} name="classCode" label="Lớp được giao">
        <Select
          placeholder="Chọn lớp học cần giao bài..."
          allowClear
          options={transformToAntdSelectOptions(classes, 'name', 'code')}
          onChange={(value: string) => setSelectedClassCode(value)}
        />
      </Form.Item>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            rules={[yupSync]}
            label="Cho phép kết nối lại"
            name="isResumeAllowed"
            valuePropName="checked"
          >
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[yupSync]}
            label="Chống gian lận"
            name="isProctoring"
            valuePropName="checked"
          >
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[yupSync]}
            label="Đảo đề"
            name="isShuffleQuestion"
            valuePropName="checked"
          >
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            rules={[yupSync]}
            label="Hiển thị đáp án"
            name="isShowAnswer"
            valuePropName="checked"
          >
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
