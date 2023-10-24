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

  return (
    <CustomTable
      showActionHeader
      hasShadow
      rowKey="code"
      key="class-table"
      columns={[
        ...columns,
        {
          render: ({ code }: ClassRoom) => (
            <Dropdown
              menu={{
                items: [
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
              trigger={['click']}
            >
              <Button icon={<DownOutlined />}>Nhấp</Button>
            </Dropdown>
          ),
          key: 'action',
          title: 'Hành động',
          fixed: 'right',
          width: 150,
        },
      ]}
      dataSource={classes}
      scroll={{
        x: 1500,
      }}
    />
  );
}
