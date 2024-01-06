import type { FormInstance } from 'antd';
import { Flex, Modal, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useBoolean } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';
import type { Question, TableFormatData } from '../../types';
import { type ApiFormatData } from '../../types';
import { useExam } from '../../hooks/useExam';
import { useQuestionMutation } from '../../hooks/useQuestionMutation';
import { ModifierForm } from '../Form';
import { ExamImportButton } from '../Button/ExamImportButton';
import { useExcelTranformation } from '../../hooks/useExcelTranformation';
import { ExcelTable } from '../Table/ExcelTable';
import { FileIO, LoadingModal } from '@/components';
import { excelUrls } from '@/constants/excel';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

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
  const { id: paramId } = useParams();
  const navigation = useNavigate();
  const { data: examData, isFetching } = useExam(id as number, {
    enabled: !!id,
  });
  const exam = examData?.content;

  const { addManyFn: addQuestionsFn } = useQuestionMutation(id as number);
  const [rawData, setRawData] = useState([]);
  const [questions, setQuestions] = useState<ApiFormatData[]>([]);
  const [dataSource, setDataSource] = useState<TableFormatData[]>([]);
  const [updatable, setUpdatable] = useBoolean(true);
  const { notify } = useAntDNoti();

  const { transformToApiFormat, transformToTableFormat, validateData } = useExcelTranformation();

  useEffect(() => {
    if (!exam) return;
    setUpdatable(exam.Attempt.length === 0);
  }, [exam, setUpdatable]);

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
      notify({
        type: 'error',
        description: error,
      });
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

  useEffect(() => {
    if (paramId && !updatable) {
      notify({
        type: 'error',
        description: 'Không thể cập nhật bài kiểm tra đã có người làm',
      });
      navigation('/exam');
    }
  }, [navigation, notify, paramId, updatable]);

  if (isFetching) return <LoadingModal />;

  return (
    <Flex vertical>
      {!updatable && (
        <Typography.Text type="danger" style={{ textAlign: 'center' }} strong>
          Chú ý: không thể cập nhật bài kiểm tra đã có người làm
        </Typography.Text>
      )}
      <ModifierForm updatable={updatable} exam={exam} form={form} />
      {id && hasExcelBtn && (
        <Flex gap={24}>
          {updatable && (
            <FileIO.Excel.Uploader
              templateUrl={excelUrls.questions}
              table={<ExcelTable dataSource={dataSource as []} />}
              data={rawData}
              setData={setRawData}
              handleOk={handleModalOk}
            />
          )}
          <FileIO.Excel.Exporter
            fileName={`${exam?.title}`}
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
