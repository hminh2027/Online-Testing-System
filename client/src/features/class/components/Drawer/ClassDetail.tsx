import { Checkbox, Descriptions, Input } from 'antd';
import { useClass } from '../../hooks/useClass';
import { useDrawer } from '@/hooks/useDrawer';
import { Status } from '@/components';
import { STATUS } from '@/constants';
import { formatTime } from '@/utils';

export function ClassDetail() {
  const { detailId } = useDrawer();
  const { data, isFetching } = useClass(detailId);

  if (isFetching) return <>Loading</>;

  const classDetails = data?.content;

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
      label: 'Ngày tạo',
      value: formatTime(classDetails?.createdAt as Date),
    },
    {
      label: 'Trạng thái',
      value: <Status status={classDetails?.isActive ? STATUS.ACTIVE : STATUS.INACTIVE} />,
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
