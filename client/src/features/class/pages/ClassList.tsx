import { Button, Drawer, Space } from 'antd';
import { useDrawer } from '@/hooks/useDrawer';
import ClassTable from '../components/ClassTable/ClassTable';
import { MainLayout } from '@/layouts/';
import { Head } from '@/components/Head';
import { CustomSpace } from '@/components/CustomSpace';

export default function ClassList() {
  const { isDrawerOpen } = useDrawer();

  return (
    <MainLayout>
      <Head title="Danh sách lớp học" />

      <Drawer
        closable
        destroyOnClose
        open={isDrawerOpen}
        footer={
          <CustomSpace isFullWidth justify="end">
            <Button>Đóng</Button>
            <Button type="primary">Tạo lớp</Button>
          </CustomSpace>
        }
      >
        content
      </Drawer>
      <ClassTable />
    </MainLayout>
  );
}
