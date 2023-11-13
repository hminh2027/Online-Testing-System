import { DeleteOutlined, DownOutlined, FileTextOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, DropDownProps, Dropdown, List, Modal } from 'antd';
import { useToggle } from 'react-use';
import type { ListItemProps } from 'antd/es/list';
import type { Exam } from '../../types';
import { formatISOToTime, genDropdownItems } from '@/utils';
import { useAuth } from '@/features/auth';

interface ExamListProps {
  dataSource?: Exam[];
}
export function ExamList({ dataSource }: ExamListProps) {
  const [open, toggleOpen] = useToggle(false);
  const { user } = useAuth();

  const teacherMenuItems = genDropdownItems({
    modify: () => {
      console.log('first');
    },
    view: () => {},
    download: () => {},
    unassign: () => {},
  });

  const studentMenuItems = genDropdownItems({
    launch: () => {},
    view: () => {},
  });

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        bordered
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Dropdown
                key={1}
                menu={{
                  items: user?.isTeacher ? teacherMenuItems : studentMenuItems,
                }}
                trigger={['click']}
              >
                <Button icon={<DownOutlined />}>Nhấp</Button>
              </Dropdown>,
            ]}
          >
            <List.Item.Meta
              avatar={<FileTextOutlined />}
              title={item.title}
              description={`Hạn nộp: ${
                item.deadlineAt ? formatISOToTime(item.deadlineAt) : 'Không có hạn nộp'
              }`}
            />
          </List.Item>
        )}
      />
      <Modal open={open} onCancel={toggleOpen}>
        hello
      </Modal>
    </>
  );
}
