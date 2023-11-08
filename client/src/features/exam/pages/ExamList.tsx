import { Drawer, Form } from 'antd';
import { Head } from '@/components';
import { ExamAddEdit, ExamDetail } from '../components/Drawer';
import { useDrawer } from '@/hooks/useDrawer';
import { ExamTable } from '../components/Table';

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
          ADD: <ExamAddEdit form={form} />,
          EDIT: <ExamAddEdit hasImportBtn form={form} id={detailId as number} />,
          DETAIL: <ExamDetail />,
        })}
      </Drawer>
      <ExamTable />
    </>
  );
}
