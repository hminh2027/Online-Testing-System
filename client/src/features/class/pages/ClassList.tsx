import { Drawer, Form } from 'antd';
import { useDrawer } from '@/hooks/useDrawer';
import ClassTable from '../components/ClassTable/ClassTable';
import { Head } from '@/components/Head';
import ClassAddEdit from '../components/Drawer/ClassAddEdit';
import ClassDetail from '../components/Drawer/ClassDetail';

export default function ClassList() {
  const { isDrawerOpen, genTitle, genFooter, genContent, handleClose, detailId } = useDrawer();
  const [form] = Form.useForm();
  const handleSubmit = () => form.submit();

  return (
    <>
      <Head title="Danh sách lớp học" />
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
          ADD: <ClassAddEdit form={form} />,
          EDIT: <ClassAddEdit form={form} code={detailId as string} />,
          DETAIL: <ClassDetail />,
        })}
      </Drawer>
      <ClassTable />
    </>
  );
}
