import type { FormInstance } from 'antd';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Switch,
  Typography,
} from 'antd';
import { DeleteOutlined, RobotOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { useUnmount } from 'react-use';
import { Uploader } from '@/components/Uploader';
import { LoadingModal } from '@/components';
import { createValidator } from '@/utils';
import { questionSchema } from './schema';
import { useQuestion } from '@/features/exam/hooks/useQuestion';
import { useQuestionMutation } from '@/features/exam/hooks/useQuestionMutation';
import type { AnswerCreateDTO, Question, QuestionCreateDTO } from '@/features/exam/types';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';
import { useExam } from '@/features/exam/hooks/useExam';
import { usePromt } from '@/features/exam/hooks/usePromt';

interface QuestionFormProps {
  examId: number;
  questionId?: number;
  form: FormInstance;
  toggleModal: (value?: boolean) => void;
}
export function QuestionForm({ questionId, form, examId, toggleModal }: QuestionFormProps) {
  const [image, setImage] = useState<string | null>(null);
  const [questionsInConversation, setQuestionsInConservation] = useState<Question['content'][]>([]);

  const { data: questionData, isFetching: isQuestionFetching } = useQuestion(questionId as number, {
    enabled: !!questionId,
  });
  const { data: examData, isFetching: isExamFetching } = useExam(examId);

  const { notify } = useAntDNoti();
  const question = questionData?.content;
  const exam = examData?.content;

  const { addFn, updateFn, deleteAnsFn } = useQuestionMutation(examId);
  const { promt, isPromting, promtConstructor, extract } = usePromt();

  useEffect(() => {
    if (!exam || isEmpty(exam?.Question)) return;

    setQuestionsInConservation(exam.Question.map((q) => q.content));
  }, [exam, exam?.Question]);

  useEffect(() => {
    setImage(question?.imageUrl as string);
  }, [question?.imageUrl]);

  useUnmount(() => {
    form.resetFields();
  });

  const yupSync = createValidator(questionSchema);

  const validateAnswer = (answers: AnswerCreateDTO[]): string => {
    const hasCorrectAnswer = answers.some((answer) => answer.isCorrect);
    const hasInvalidAnswer = answers.some((answer) => answer.isCorrect && !answer.content);
    const hasRedundantAnswer = answers.some((answer) => !answer.content && !answer.isCorrect);
    const hasAtLeastTwoAnswers = answers.length >= 2;

    if (!hasCorrectAnswer) return 'Vui lòng chọn đáp án đúng';
    if (hasInvalidAnswer) return 'Vui lòng không bỏ trống đáp án đúng';
    if (hasRedundantAnswer) return 'Vui lòng xoá đáp án dư thừa';
    if (!hasAtLeastTwoAnswers) return 'Tối thiểu 2 đáp án trong 1 câu';

    return '';
  };

  const handlePromt = async () => {
    if (!exam) return;

    const userMessage = {
      role: 'user',
      content: promtConstructor(questionsInConversation, exam),
    };

    const systemMessage = {
      role: 'system',
      content: 'Phản hồi bắt buộc phải theo định dạng JSON',
    };

    const response = await promt([userMessage, systemMessage]);

    const { answers, question: content } = await extract(response);

    form.setFieldValue('content', content);
    form.setFieldValue('answers', answers);

    setQuestionsInConservation((prev) => [...prev, content]);
  };

  const handleFinish = (values: QuestionCreateDTO) => {
    const { answers } = values;

    const error = validateAnswer(answers);

    if (error) {
      notify({
        type: 'error',
        description: error,
      });

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

    toggleModal(false);
  };

  const handleDelete = (id: number, localDeleteFn: (index: number | number[]) => void) => {
    const targetAns = question?.Answer[id];

    if (targetAns) deleteAnsFn({ id: targetAns.id as number });

    localDeleteFn(id);
  };

  if (isQuestionFetching || isExamFetching) return <LoadingModal />;

  return (
    <>
      {isPromting && <LoadingModal />}

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
        <Divider />
        <Button type="dashed" onClick={handlePromt} block icon={<RobotOutlined />}>
          Gợi ý câu hỏi tự động
        </Button>
      </Form>
    </>
  );
}
