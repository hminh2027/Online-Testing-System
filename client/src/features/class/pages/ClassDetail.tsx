import { Image, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { useClass } from '../hooks/useClass';
import { LoadingModal } from '@/components';

export default function ClassDetail() {
  const { code } = useParams();
  const { data, isFetching } = useClass(code as string, { enabled: !!code });

  if (isFetching) return <LoadingModal />;

  const classRoom = data?.content;

  return (
    <Typography.Paragraph style={{ textAlign: 'center' }}>
      <Typography.Text>
        Chào mừng các bạn đến với lớp học{' '}
        <Typography.Text strong>{classRoom?.name}</Typography.Text> của giáo viên{' '}
        <Typography.Text strong>{classRoom?.User.fullname}</Typography.Text>!
      </Typography.Text>
      <br />
      {classRoom?.imageUrl && <Image width="80%" src={classRoom.imageUrl} />}
    </Typography.Paragraph>
  );
}
