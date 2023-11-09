import { Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { useListExam } from '../../hooks/useExam';
import { transformToAntdSelectOptions } from '@/utils';
import { useExamMutation } from '../../hooks/useExamMutation';

export function ExamImportButton() {
  const { data: examData, isFetching } = useListExam({});
  const exams = examData?.content;
  const { copyFn } = useExamMutation();

  const [selectedExamId, setSelectedExamId] = useState<number>();

  if (isFetching || !exams) return <>Loading</>;

  const handleOk = () => {
    if (selectedExamId) copyFn({ id: selectedExamId });
  };

  const handleClick = () => {
    if (!exams) return;
    Modal.confirm({
      title: 'Chọn bài kiểm tra từ ngân hàng đề thi',
      centered: true,
      icon: null,
      content: (
        <Select
          style={{ width: '100%' }}
          options={transformToAntdSelectOptions(exams, 'title', 'id')}
          onChange={(value: number) => setSelectedExamId(value)}
        />
      ),
      onOk: handleOk,
    });
  };

  return (
    <Button type="dashed" onClick={handleClick}>
      Tạo từ ngân hàng đề thi
    </Button>
  );
}
