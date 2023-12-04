import { Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { useToggle } from 'react-use';
import { useListExam } from '../../hooks/useExam';
import { transformToAntdSelectOptions } from '@/utils';
import { useExamMutation } from '../../hooks/useExamMutation';
import { LoadingModal } from '@/components';

export function ExamImportButton() {
  const { data: examData, isFetching } = useListExam({});
  const exams = examData?.content;
  const [open, toggleOpen] = useToggle(false);
  const { copyFn } = useExamMutation();

  const [selectedExamId, setSelectedExamId] = useState<number>();

  const handleOk = () => {
    if (selectedExamId) copyFn({ id: selectedExamId });
  };

  if (isFetching || !exams) return <LoadingModal />;

  return (
    <>
      <Button type="dashed" onClick={toggleOpen}>
        Tạo từ ngân hàng đề thi
      </Button>
      <Modal
        open={open}
        onCancel={toggleOpen}
        title="Chọn bài kiểm tra từ ngân hàng đề thi"
        centered
        onOk={handleOk}
      >
        <Select
          style={{ width: '100%' }}
          options={transformToAntdSelectOptions(exams, 'title', 'id')}
          onChange={(value: number) => setSelectedExamId(value)}
        />
      </Modal>
    </>
  );
}
