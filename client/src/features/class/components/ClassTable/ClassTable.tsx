import { Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { columns } from './column';
import { useListClass } from '../../hooks/useClass';
import { CustomTable } from '@/components';
import { MODE } from '@/constants';
import { useDrawer } from '@/hooks/useDrawer';
import type { ClassRoom } from '../../types';

interface ClassTableProps {}
export default function ClassTable({}: ClassTableProps) {
  const { data: classData } = useListClass();
  const { toggleMode, setDetailId } = useDrawer();

  const classes = classData?.content;

  if (!classes) return <></>;

  const handleEdit = (code: string) => {
    toggleMode(MODE.EDIT);
    setDetailId(code);
  };

  const handleDetail = (code: string) => {
    toggleMode(MODE.DETAIL);
    setDetailId(code);
  };

  const handleDelete = (code: string) => {};

  // TODO: them xem, sua, xoa vao trong table luon
  return (
    <CustomTable
      showActionHeader
      hasShadow
      rowKey="code"
      key="class-table"
      columns={columns}
      actionColumnItems={{
        items: () => [
          {
            label: 'Sửa',
            key: '0',
            onClick: () => handleEdit(code),
          },
          {
            label: 'Xem',
            key: '1',
            onClick: () => handleDetail(code),
          },
          {
            label: 'Xoá',
            key: '3',
            onClick: () => handleDelete(code),
          },
        ],
      }}
      dataSource={classes}
      scroll={{
        x: 1500,
      }}
      pagination={{ total: classes.length }}
    />
  );
}
