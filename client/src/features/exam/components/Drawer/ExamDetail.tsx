import { Checkbox, Descriptions, Typography } from 'antd';
import { useDrawer } from '@/hooks/useDrawer';
import { formatISOToVi } from '@/utils';
import { useExam } from '../../hooks/useExam';
import { LoadingModal } from '@/components';

export function ExamDetail() {
  const { detailId } = useDrawer();
  const { data, isFetching } = useExam(detailId);

  if (isFetching) return <LoadingModal />;

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
      label: 'Tổng số câu hỏi',
      value: examDetails?.numberOfQuestions,
    },
    {
      label: 'Giới hạn làm bài',
      value: examDetails?.attemptLimit ? examDetails?.attemptLimit : 'Không giới hạn',
    },
    {
      label: 'Thời gian bắt đầu',
      value: formatISOToVi(examDetails?.startAt as Date),
    },
    {
      label: 'Thời gian kết thúc',
      value: examDetails?.endAt ? formatISOToVi(examDetails?.endAt) : 'Không hạn nộp',
    },

    {
      label: 'Hiển thị đáp án sau thi',
      value: <Checkbox disabled checked={!!examDetails?.isShowAnswer} />,
    },
    {
      label: 'Cho phép kết nối lại',
      value: <Checkbox disabled checked={!!examDetails?.isResumeAllowed} />,
    },
    {
      label: 'Bật chống gian lận',
      value: <Checkbox disabled checked={!!examDetails?.isProcting} />,
    },
    {
      label: 'Bật đảo đề',
      value: <Checkbox disabled checked={!!examDetails?.isShuffleQuestion} />,
    },
    {
      label: 'Lớp được giao',
      value: examDetails?.Class && (
        <Typography.Link href={`class/${examDetails?.classCode}`}>
          {examDetails?.Class.name}
        </Typography.Link>
      ),
    },
    {
      label: 'Ngày tạo',
      value: formatISOToVi(examDetails?.createdAt as Date),
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
