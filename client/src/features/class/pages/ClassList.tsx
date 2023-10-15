import { Drawer } from 'antd';
import { useDrawer } from '@/hooks/useDrawer';
import ClassTable from '../components/ClassTable/ClassTable';

export default function ClassList() {
  const { isDrawerOpen } = useDrawer();

  return (
    <>
      <Drawer destroyOnClose open={isDrawerOpen}>
        content
      </Drawer>
      <ClassTable />
    </>
  );
}
