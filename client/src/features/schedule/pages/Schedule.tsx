import type { CalendarProps } from 'antd';
import { Badge, Calendar, List, Modal } from 'antd';
import type { Dayjs } from 'dayjs';
import { FileTextOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useListExam } from '@/features/exam/hooks/useExam';
import { formatISOToVi } from '@/utils';
import { LoadingModal } from '@/components';

export default function Schedule() {
  const { data: examData, isLoading } = useListExam({});
  const exams = examData?.content;

  // Forget those typing things :( Need to meet the deadline
  const examList = [];

  exams?.forEach((exam) => examList.push(...exam.Class.Exam));

  const examDates = examList?.map((exam) => exam.startAt);

  const handleCellRender: CalendarProps<Dayjs>['cellRender'] = (current) => {
    let count = 0;

    examDates?.forEach((date) => {
      if (current.isSame(dayjs(date), 'day')) count += 1;
    });

    return count > 0 && <Badge text={`Có ${count} bài kiểm tra`} color="red" />;
  };

  const handleOnSelect: CalendarProps<Dayjs>['onSelect'] = (current) => {
    if (!exams) return;
    const curDateExams = exams.filter((exam) => current.isSame(dayjs(exam.startAt), 'day'));

    if (curDateExams.length > 0) {
      Modal.info({
        width: '60%',
        centered: true,
        title: 'Chi tiết lịch thi',
        content: (
          <List
            dataSource={curDateExams}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<FileTextOutlined />}
                  title={item.title}
                  description={`Từ ${formatISOToVi(item.startAt)} -> ${
                    item.endAt ? formatISOToVi(item.endAt) : 'không hạn nộp'
                  }`}
                />
              </List.Item>
            )}
          />
        ),
      });
    }
  };

  if (isLoading) return <LoadingModal />;

  return <Calendar onSelect={handleOnSelect} cellRender={handleCellRender} />;
}
