import { Descriptions } from 'antd';
import { useDrawer } from '@/hooks/useDrawer';
import { formatTime } from '@/utils';
import { useExam } from '../../hooks/useExam';

export function ExamDetail() {
  const { detailId } = useDrawer();
  const { data, isFetching } = useExam(detailId);

  if (isFetching) return <>Loading</>;

  const examDetails = data?.content;

  const mapDetailsToArray = () => [
    {
      label: 'Tiêu đề bài kiểm tra',
      value: examDetails?.title,
    },

    {
      label: 'Mô tả',
      value: examDetails?.description,
    },
    {
      label: 'Thời lượng (phút)',
      value: examDetails?.duration,
    },
    {
      label: 'Số câu hỏi hiển thị	',
      value: examDetails?.numberOfQuestionDisplayed,
    },
    {
      label: 'Ngày tạo',
      value: formatTime(examDetails?.createdAt as Date),
    },
  ];

  return (
    <Descriptions bordered colon={false} column={1}>
      {mapDetailsToArray().map((detail) => (
        <Descriptions.Item
          labelStyle={{ fontWeight: 'bold' }}
          key={detail.label}
          label={detail.label}
        >
          {detail.value}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
}
