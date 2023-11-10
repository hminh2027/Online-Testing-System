import { Drawer, Form } from 'antd';
import { Head } from '@/components';
import { ExamModifier, ExamDetail } from '../components/Drawer';
import { useDrawer } from '@/hooks/useDrawer';
import { ExamTable } from '../components/Table';
import FileIO from '@/components/FileIO/FileIO';

export default function ExamList() {
  const { isDrawerOpen, genTitle, genFooter, genContent, handleClose, detailId } = useDrawer();
  const [form] = Form.useForm();
  const handleSubmit = () => form.submit();

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
          EDIT: <ExamModifier hasImportExcel form={form} id={detailId as number} />,
          DETAIL: <ExamDetail />,
        })}
      </Drawer>
      <ExamTable />
      <FileIO.Excel.Exporter />
    </>
  );
}
