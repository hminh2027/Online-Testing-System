import { Table } from 'antd';
import { columns } from './column';
import { useListClass } from '../../hooks/useClass';
import { useDrawer } from '@/hooks/useDrawer';

interface ClassTableProps {}
export default function ClassTable({}: ClassTableProps) {
  const { data: classData } = useListClass();
  const { toggleDrawer } = useDrawer();

  const classes = classData?.content;

  const handleRowClick = () => {
    toggleDrawer(true);
  };

  if (!classes) return <></>;

  return <Table columns={columns(handleRowClick)} dataSource={classes} />;
}
