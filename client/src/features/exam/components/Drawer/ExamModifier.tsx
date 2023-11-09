import type { FormInstance } from 'antd';
import { Flex, Modal, Table } from 'antd';
import { useState } from 'react';
import type { QuestionCreateDTO } from '../../types';
import { useExam } from '../../hooks/useExam';
import FileIO from '@/components/FileIO/FileIO';
import { useQuestionMutation } from '../../hooks/useQuestionMutation';
import ModifierForm from '../Form/ExamForm/ModifierForm';
import { ExamImportButton } from '../Button/ExamImportButton';

interface ExamModifierProps {
  id?: number;
  form: FormInstance;
  hasImportExcel?: boolean;
  hasImportExam?: boolean;
}
export function ExamModifier({
  id,
  form,
  hasImportExcel = false,
  hasImportExam = false,
}: ExamModifierProps) {
  const { data: examData, isFetching } = useExam(id as number, {
    enabled: !!id,
  });
  const exam = examData?.content;

  const { addManyFn: addQuestionsFn } = useQuestionMutation(id as number);
  const [questions, setQuestions] = useState<QuestionCreateDTO[]>([]);

  if (isFetching) return <>Loading</>;

  const handleModalOk = () => {
    if (!exam) return;
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
    <Flex vertical>
      <ModifierForm exam={exam} form={form} />
      {id && hasImportExcel && (
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
      {hasImportExam && <ExamImportButton />}
    </Flex>
  );
}
