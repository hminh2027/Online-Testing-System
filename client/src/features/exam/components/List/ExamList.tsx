import { DownOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Dropdown, List, Modal } from 'antd';
import { useToggle } from 'react-use';
import { useNavigate, useParams } from 'react-router-dom';
import type { Exam } from '../../types';
import { formatISOToTime, genDropdownItems, isAfterNow, isBeforeNow } from '@/utils';
import { useAuth } from '@/features/auth';
import { EXAM_STATUS } from '@/constants';
import { Status } from '@/components';
import { useAttemptMutation } from '@/features/attempt/hooks/useAttemptMutation';
import { useExamMutation } from '../../hooks/useExamMutation';

interface ExamListProps {
  dataSource?: Exam[];
}
export function ExamList({ dataSource }: ExamListProps) {
  const { code } = useParams();
  const [open, toggleOpen] = useToggle(false);
  const { addFn } = useAttemptMutation();
  const { user } = useAuth();
  const navigation = useNavigate();
  const { deleteFn } = useExamMutation();

  const checkExamStatus = (exam: Exam) => {
    if ((exam.deadlineAt && isBeforeNow(exam.deadlineAt)) || isAfterNow(exam.startAt))
      return EXAM_STATUS.NOT_AVAILABLE;

    if (!user?.isTeacher && exam.Attempt?.length === exam.attemptLimit)
      return EXAM_STATUS.OUT_OF_ATTEMPT;
    if (!user?.isTeacher && (exam.Attempt?.length as number) > 0) return EXAM_STATUS.ATTEMPTED;

    if (!user?.isTeacher && (exam.Attempt?.length as number) === 0)
      return EXAM_STATUS.NOT_ATTEMPTED;

    return EXAM_STATUS.AVAILABLE;
  };

  const genItemsWithParams = (item: Exam) => {
    const { id } = item as { id: number };

    return user?.isTeacher
      ? genDropdownItems({
          modify: () => navigation(`/exam/${id}`),
          view: () => navigation(`/class/${code}/exams/${id}`),
          download: () => {},
          delete: () => deleteFn({ id }),
        })
      : genDropdownItems({
          launch: () => {
            if (
              checkExamStatus(item) === EXAM_STATUS.OUT_OF_ATTEMPT ||
              checkExamStatus(item) === EXAM_STATUS.NOT_AVAILABLE
            )
              return;
            addFn({ examId: id });
            navigation(`${id}/taking`);
          },
          view: () => navigation(`${id}/result`),
        });
  };

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        bordered
        renderItem={(item) => (
          <List.Item
            actions={[
              !user?.isTeacher &&
                `${item.Attempt?.length}/${item.attemptLimit ? item.attemptLimit : '∞'} đã làm`,
              <Status key="status" status={checkExamStatus(item)} />,
              <Dropdown
                key="menu"
                menu={{
                  items: genItemsWithParams(item),
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
