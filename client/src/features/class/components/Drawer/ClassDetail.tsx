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

  return (
    <Descriptions bordered colon={false} column={1} title="title">
      <Descriptions.Item label="Tên lớp">{classDetails?.name}</Descriptions.Item>
      <Descriptions.Item label="Mã lớp">{classDetails?.code}</Descriptions.Item>
      <Descriptions.Item label="Mô tả">{classDetails?.description}</Descriptions.Item>

      <Descriptions.Item label="Mật khẩu">
        <Input.Password value="classDetails?.password" bordered={false} readOnly />
      </Descriptions.Item>

      <Descriptions.Item label="Chặn học sinh tự rời lớp học">
        <Checkbox checked={classDetails?.isStudentApprovalLeave} disabled />
      </Descriptions.Item>
      <Descriptions.Item label="Ngày tạo">
        <>{classDetails?.createdAt}</>
      </Descriptions.Item>
      <Descriptions.Item label="Trạng thái">
        <Status status={classDetails?.isActive ? STATUS.ACTIVE : STATUS.INACTIVE} />
      </Descriptions.Item>
    </Descriptions>
  );
}
