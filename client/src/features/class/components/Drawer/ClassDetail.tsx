import { Checkbox, Descriptions, Input } from 'antd';
import { useClass } from '../../hooks/useClass';
import { useDrawer } from '@/hooks/useDrawer';
import { Status } from '@/components';
import { STATUS } from '@/constants';

export default function ClassDetail() {
  const { detailId } = useDrawer();
  const { data, isFetching } = useClass(detailId);

  if (isFetching) return <></>;

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
      label: 'Chặn học sinh tự rời lớp học',
      value: <Checkbox checked={classDetails?.isStudentApprovalLeave} disabled />,
    },
    {
      label: 'Ngày tạo',
      value: <>{classDetails?.createdAt}</>,
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
