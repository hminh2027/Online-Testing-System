import { Drawer, Form } from 'antd';
import { useDrawer } from '@/hooks/useDrawer';
import { Head } from '@/components/Head';
import { ClassModifier, ClassDetail, ClassTable } from '../components';

export default function ClassList() {
  const { isDrawerOpen, genTitle, genFooter, genContent, handleClose, detailId } = useDrawer();
  const [form] = Form.useForm();
  const handleSubmit = () => form.submit();

  return (
    <div
    style={{
      width: '90%',
      margin: '2rem auto',
    }}
    >
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
          ADD: <ClassModifier form={form} />,
          EDIT: <ClassModifier form={form} code={detailId as string} />,
          DETAIL: <ClassDetail />,
        })}
      </Drawer>
      <ClassTable />
    </div>
  );
}
