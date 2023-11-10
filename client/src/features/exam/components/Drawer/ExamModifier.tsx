import type { FormInstance } from 'antd';
import { Flex, Modal } from 'antd';
import { useState } from 'react';
import type { QuestionCreateDTO } from '../../types';
import { useExam } from '../../hooks/useExam';
import FileIO from '@/components/FileIO/FileIO';
import { useQuestionMutation } from '../../hooks/useQuestionMutation';
import ModifierForm from '../Form/ExamForm/ModifierForm';
import { ExamImportButton } from '../Button/ExamImportButton';
import { ExcelTable } from '..';
import { useExcelTranformation } from '../../hooks/useExcelTranformation';

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
  const [rawData, setRawData] = useState([]);
  const [questions, setQuestions] = useState<QuestionCreateDTO[]>([]);
  const [tableData, setTableData] = useState([]);

  const { transformToApiFormat, transformToTableFormat } = useExcelTranformation();

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

  const apiFormatData = transformToApiFormat(rawData);
  const tableFormatData = transformToTableFormat(apiFormatData);
  const dataSource = tableFormatData;

  if (isFetching) return <>Loading</>;

  return (
    <Flex vertical>
      <ModifierForm exam={exam} form={form} />
      {id && hasImportExcel && (
        <Flex gap={24}>
          <FileIO.Excel.Uploader
            table={<ExcelTable dataSource={dataSource} />}
            data={rawData}
            setData={setRawData}
            handleOk={handleModalOk}
          />
        </Flex>
      )}
      {hasImportExam && <ExamImportButton />}
    </Flex>
  );
}
