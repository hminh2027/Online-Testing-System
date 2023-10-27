import type { FormInstance } from 'antd';
import { Col, Flex, Form, Input, InputNumber, Row } from 'antd';
import { useDrawer } from '@/hooks/useDrawer';
import { CustomMessage } from '@/components';
import type { Exam, ExamCreateDTO, ResExamModify } from '../../types';
import { useAddExam, useExam, useUpdateExam } from '../../hooks/useExam';

interface ExamAddEditProps {
  id?: number;
  form: FormInstance;
}
export function ExamAddEdit({ id, form }: ExamAddEditProps) {
  const { data: examData, isFetching } = useExam(id as number, {
    enabled: !!id,
  });
  const exam = examData?.content;

  const { resetDrawerState } = useDrawer();

  const handleOnSuccess = (res: ResExamModify) => {
    resetDrawerState();

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    CustomMessage.success(res.message);
  };

  const { mutate: addFn } = useAddExam({
    onSuccess: handleOnSuccess,
    onError: () => {},
  });

  const { mutate: updateFn } = useUpdateExam({
    onSuccess: handleOnSuccess,
    onError: () => {},
  });

  const dataAdapter = (data: Exam): ExamCreateDTO => ({
    title: data.title,
    description: data.description,
    duration: data.duration,
    numberOfQuestionDisplayed: data.numberOfQuestionDisplayed,
  });

  if (isFetching) return <>Loading</>;

  const handleOnFinish = (values: ExamCreateDTO) => {
    const payload: ExamCreateDTO = {
      ...values,
    };

    if (id) {
      return updateFn({
        id,
        payload,
      });
    }

    return addFn(payload);
  };

  return (
    <Flex>
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
          <Input.TextArea rows={8} />
        </Form.Item>
        <Row gutter={24}>
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
          <Col span={12}>
            <Form.Item label="Số câu hỏi hiển thị	" name="numberOfQuestionDisplayed">
              <InputNumber<number>
                addonAfter="câu hỏi"
                min={1}
                style={{ width: '100%' }}
                controls={false}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Flex>
  );
}
