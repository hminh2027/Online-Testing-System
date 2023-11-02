import type { FormInstance } from 'antd';
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
  Typography,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Uploader } from '@/components/Uploader';
import { CustomMessage } from '@/components';
import { createValidator } from '@/utils';
import { questionSchema } from './schema';
import { useQuestion } from '@/features/exam/hooks/useQuestion';
import { useQuestionMutation } from '@/features/exam/hooks/useQuestionMutation';
import type { AnswerCreateDTO, QuestionCreateDTO } from '@/features/exam/types';

interface QuestionFormProps {
  examId: number;
  questionId?: number;
  form: FormInstance;
}
export function QuestionForm({ questionId, form, examId }: QuestionFormProps) {
  const [image, setImage] = useState<string | null>(null);

  const { data, isFetching } = useQuestion(questionId as number, { enabled: !!questionId });

  const question = data?.content;

  const { addFn, updateFn, deleteAnsFn } = useQuestionMutation(examId);

  useEffect(() => {
    setImage(question?.imageUrl as string);
  }, [question?.imageUrl]);

  const yupSync = createValidator(questionSchema);

  const validateAnswer = (answers: AnswerCreateDTO[]): string => {
    const hasCorrectAnswer = answers.some((answer) => answer.isCorrect);
    const hasInvalidAnswer = answers.some((answer) => answer.isCorrect && !answer.content);
    const hasRedundantAnswer = answers.some((answer) => !answer.content && !answer.isCorrect);

    if (!hasCorrectAnswer) return 'Vui lòng chọn đáp án đúng';
    if (hasInvalidAnswer) return 'Vui lòng không bỏ trống đáp án đúng';
    if (hasRedundantAnswer) return 'Vui lòng xoá đáp án dư thừa';

    return '';
  };

  const handleFinish = (values: QuestionCreateDTO) => {
    const { answers } = values;

    const error = validateAnswer(answers);

    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.error(error);

      return;
    }

    const payload: QuestionCreateDTO = {
      ...values,
      imageUrl: image as string,
      answers: answers.map((a) => ({
        content: a.content,
        isCorrect: a.isCorrect,
        id: a.id,
      })),
    };

    if (questionId) {
      updateFn({
        payload,
        id: question?.id as number,
      });
    } else {
      addFn({
        ...payload,
        examId,
      });
    }
  };

  const handleDelete = (id: number, localDeleteFn: (index: number | number[]) => void) => {
    const targetAns = question?.Answer[id];

    if (targetAns) deleteAnsFn({ id: targetAns.id as number });

    localDeleteFn(id);
  };

  if (isFetching) return <>Loading</>;

  return (
    <Form
      onFinish={handleFinish}
      form={form}
      layout="vertical"
      initialValues={
        question && {
          content: question.content,
          answers: question.Answer,
          point: question.point,
          explanation: question.explanation,
        }
      }
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Số điểm" name="point" rules={[yupSync]} required>
            <InputNumber controls={false} min={1} addonAfter="điểm" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Tính điểm theo số đáp án đúng" rules={[yupSync]}>
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
          </Form.Item>
        </Col>
      </Row>
      <Uploader image={image} setImage={setImage} />
      <Form.Item label="Câu hỏi" name="content" required rules={[yupSync]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Chú thích lời giải" name="explanation" rules={[yupSync]}>
        <Input.TextArea />
      </Form.Item>
      <Typography.Text>Đáp án</Typography.Text>
      <Form.List name="answers">
        {(fields, { add, remove }) => (
          <Flex
            vertical
            style={{
              maxHeight: '25vh',
              overflow: 'auto',
            }}
          >
            {fields.map((field) => (
              <Flex key={field.key} gap={14} align="center" justify="center">
                <Form.Item name={[field.name, 'isCorrect']} valuePropName="checked">
                  <Checkbox />
                </Form.Item>
                <Form.Item style={{ width: '100%' }} {...field} name={[field.name, 'content']}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(field.name, remove)}
                  />
                </Form.Item>
              </Flex>
            ))}
            <Button block onClick={() => add()}>
              Thêm đáp án
            </Button>
          </Flex>
        )}
      </Form.List>
    </Form>
  );
}
