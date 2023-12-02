import { Checkbox, Descriptions, Input, Tag } from 'antd';
import { useClass } from '../../hooks/useClass';
import { useDrawer } from '@/hooks/useDrawer';
import { formatISOToVi } from '@/utils';
import { useListExam } from '@/features/exam/hooks/useExam';

export function ClassDetail() {
  const { detailId } = useDrawer();
  const { data: classData, isFetching: isClassFetching } = useClass(detailId);
  const { data: examData, isFetching: isExamFetching } = useListExam({ classCode: detailId });

  if (isClassFetching || isExamFetching) return <>Loading</>;

  const classDetails = classData?.content;
  const examDetails = examData?.content;

  const mapDetailsToArray = () => [
    {
      label: 'Tên lớp',
      value: classDetails?.name,
    },
    {
      label: 'Mã lớp',
      value: classDetails?.code,
    },
    {
      label: 'Mô tả',
      value: classDetails?.description,
    },
    {
      label: 'Mật khẩu',
      value: <Input.Password value={classDetails?.password} bordered={false} readOnly />,
    },
    {
      label: 'Kiểm duyệt học sinh vào lớp',
      value: <Checkbox checked={classDetails?.isStudentApprovalEnter} disabled />,
    },
    {
      label: 'Chặn học sinh tự rời lớp học',
      value: <Checkbox checked={classDetails?.isStudentApprovalLeave} disabled />,
    },
    {
      label: 'Cho phép học sinh đăng bài',
      value: <Checkbox checked={classDetails?.isStudentPostAllowed} disabled />,
    },
    {
      label: 'Bài kiểm tra đang giao',
      value: examDetails?.map((exam) => (
        <Tag style={{ margin: 5 }} key={exam.id} color="blue">
          {exam.title}
        </Tag>
      )),
    },
    {
      label: 'Ngày tạo',
      value: formatISOToVi(classDetails?.createdAt as Date),
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
