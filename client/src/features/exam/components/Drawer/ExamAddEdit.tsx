import type { FormInstance } from 'antd';
import { Button, Flex, Form, Input, InputNumber, Table } from 'antd';
import { useToggle } from 'react-use';
import { useState } from 'react';
import type { Exam, ExamCreateDTO } from '../../types';
import { useExam } from '../../hooks/useExam';
import { useExamMutation } from '../../hooks/useExamMutation';
import Excel, { ExcelUploader } from '@/components/Excel';

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
  const [questions, setQuestions] = useState();

  const dataAdapter = (data: Exam): ExamCreateDTO => ({
    title: data.title,
    description: data.description,
    duration: data.duration,
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

  const handleModalOk = () => {
    console.log('first');
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
        <Flex gap={24}>
          <Excel.Exporter fileName="online-testing-sample-excel.xlsx" />
          <Excel.Uploader
            table={
              <Table
                scroll={{
                  y: 300,
                }}
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
          />
        </Flex>
      </Form>
    </Flex>
  );
}
