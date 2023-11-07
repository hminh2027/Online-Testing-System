import type { FormInstance } from 'antd';
import { Flex, Form, Input, InputNumber, Modal, Table } from 'antd';
import { useState } from 'react';
import type { Exam, ExamCreateDTO, QuestionCreateDTO } from '../../types';
import { useExam } from '../../hooks/useExam';
import { useExamMutation } from '../../hooks/useExamMutation';
import FileIO from '@/components/FileIO/FileIO';
import { useQuestionMutation } from '../../hooks/useQuestionMutation';

interface ExamAddEditProps {
  id?: number;
  form: FormInstance;
}
export function ExamAddEdit({ id, form }: ExamAddEditProps) {
  const { data: examData, isFetching } = useExam(id as number, {
    enabled: !!id,
  });
  const exam = examData?.content;

  const { addFn, updateFn } = useExamMutation();
  const { addManyFn: addQuestionsFn } = useQuestionMutation(id as number);
  const [questions, setQuestions] = useState<QuestionCreateDTO[]>([]);

  const dataAdapter = (data: Exam): ExamCreateDTO => ({
    title: data.title,
    description: data.description,
    duration: data.duration,
  });

  if (isFetching || !exam) return <>Loading</>;

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

  const handleModalOk = () => {
    if (exam.numberOfQuestions > 0) {
      Modal.confirm({
        centered: true,
        onOk: () => {
          addQuestionsFn(
            questions.map((q) => ({
              content: q.content,
              answers: q.answers,
              examId: id as number,
              point: 1,
            })),
          );
        },
        title:
          'Import sẽ ghi đè toàn bộ nội dung câu hỏi đang có trong đề thi, bạn có muốn tiếp tục?',
      });
    } else {
      addQuestionsFn(
        questions.map((q) => ({
          content: q.content,
          answers: q.answers,
          examId: id as number,
          point: 1,
        })),
      );
    }
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

        <Form.Item label="Thời lượng bài kiểm tra" name="duration">
          <InputNumber<number>
            addonAfter="phút"
            min={1}
            style={{ width: '100%' }}
            controls={false}
          />
        </Form.Item>
        {id && (
          <Flex gap={24}>
            <FileIO.Excel.Uploader
              table={
                <Table
                  scroll={{ y: 300 }}
                  pagination={false}
                  rowKey="content"
                  dataSource={questions}
                  columns={[
                    {
                      key: 'content',
                      dataIndex: 'content',
                      title: 'Câu hỏi',
                    },
                  ]}
                />
              }
              data={questions}
              setData={setQuestions}
              handleOk={handleModalOk}
            />
          </Flex>
        )}
      </Form>
    </Flex>
  );
}
