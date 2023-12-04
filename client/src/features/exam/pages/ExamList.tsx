import { Drawer, Form } from 'antd';
import { Head, LoadingModal } from '@/components';
import { ExamModifier, ExamDetail } from '../components/Drawer';
import { useDrawer } from '@/hooks/useDrawer';
import { ExamTable } from '../components/Table';
import { useListExam } from '../hooks/useExam';

export default function ExamList() {
  const { isDrawerOpen, genTitle, genFooter, genContent, handleClose, detailId } = useDrawer();
  const [form] = Form.useForm();
  const handleSubmit = () => form.submit();
  const { data: examData, isLoading } = useListExam({});
  const exams = examData?.content;

  if (isLoading) return <LoadingModal />;

  return (
    <>
      <Head title="Danh sách bài kiểm tra" />
      <Drawer
        size="large"
        onClose={handleClose}
        closable
        closeIcon={false}
        destroyOnClose
        open={isDrawerOpen}
        title={genTitle()}
        footer={genFooter(handleSubmit)}
      >
        {genContent({
          ADD: <ExamModifier hasImportExam form={form} />,
          EDIT: <ExamModifier hasExcelBtn form={form} id={detailId as number} />,
          DETAIL: <ExamDetail />,
        })}
      </Drawer>
      <ExamTable dataSource={exams} />
    </>
  );
}
