import type { FormInstance } from 'antd';
import { Flex, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';
import type { Question, TableFormatData } from '../../types';
import { type ApiFormatData } from '../../types';
import { useExam } from '../../hooks/useExam';
import { useQuestionMutation } from '../../hooks/useQuestionMutation';
import ModifierForm from '../Form/ExamForm/ModifierForm';
import { ExamImportButton } from '../Button/ExamImportButton';
import { useExcelTranformation } from '../../hooks/useExcelTranformation';
import { ExcelTable } from '../Table/ExcelTable';
import { CustomMessage, FileIO } from '@/components';

interface ExamModifierProps {
  id?: number;
  form: FormInstance;
  hasExcelBtn?: boolean;
  hasImportExam?: boolean;
}
export function ExamModifier({
  id,
  form,
  hasExcelBtn = false,
  hasImportExam = false,
}: ExamModifierProps) {
  const { data: examData, isFetching } = useExam(id as number, {
    enabled: !!id,
  });
  const exam = examData?.content;

  const { addManyFn: addQuestionsFn } = useQuestionMutation(id as number);
  const [rawData, setRawData] = useState([]);
  const [questions, setQuestions] = useState<ApiFormatData[]>([]);
  const [dataSource, setDataSource] = useState<TableFormatData[]>([]);

  const { transformToApiFormat, transformToTableFormat, validateData } = useExcelTranformation();

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
              point: q.point,
              explanation: q.explanation,
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
          point: q.point,
          explanation: q.explanation,
        })),
      );
    }
  };

  useEffect(() => {
    const apiFormatData = transformToApiFormat(rawData);
    const error = validateData(apiFormatData);

    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.error(<Typography.Text strong>{error}</Typography.Text>);
      setRawData([]);

      return;
    }

    setQuestions(apiFormatData);

    const tableFormatData = transformToTableFormat(apiFormatData);

    setDataSource(tableFormatData);
  }, [rawData]);

  const mappingDataProps = (data: Question[]): ApiFormatData[] =>
    data.map((item) => ({
      content: item.content,
      answers: item.Answer,
      point: item.point,
      explanation: item.explanation,
    }));

  if (isFetching) return <>Loading</>;

  return (
    <Flex vertical>
      <ModifierForm exam={exam} form={form} />
      {id && hasExcelBtn && (
        <Flex gap={24}>
          <FileIO.Excel.Uploader
            table={<ExcelTable dataSource={dataSource as []} />}
            data={rawData}
            setData={setRawData}
            handleOk={handleModalOk}
          />
          <FileIO.Excel.Exporter
            fileName={`${exam?.title}-excel`}
            table={
              <ExcelTable
                dataSource={transformToTableFormat(mappingDataProps(exam?.Question as [])) as []}
              />
            }
          />
        </Flex>
      )}
      {hasImportExam && <ExamImportButton />}
    </Flex>
  );
}
