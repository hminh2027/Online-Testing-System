import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Col, Divider, Flex, List, Row } from 'antd';
import type { User } from '..';
import { useAuth } from '@/features/auth';
import { CustomCard, Uploader } from '@/components';
import { useUserMutation } from '../hooks/useUserMutation';

export default function UserProfile() {
  const { id } = useParams();
  const { user } = useAuth();
  const { updateFn } = useUserMutation();
  const [userDetals, setUserDetails] = useState<User>();

  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id && user) {
      setUserDetails(user);
      setImage(user.imageUrl ?? '');
    }
  }, [id, user]);

  const handleUpdateImage = () =>
    updateFn({
      id: user?.id as number,
      payload: { imageUrl: image ?? '' },
    });

  return (
    <CustomCard
      title="Hồ sơ người dùng"
      hasShadow
      style={{
        width: '60%',
        margin: 'auto',
      }}
    >
      <Flex vertical gap={8}>
        <Uploader image={image} setImage={setImage} />
        <Button block type="primary" onClick={handleUpdateImage}>
          Cập nhật ảnh
        </Button>
        <Divider>Thông tin tài khoản</Divider>
        <List />
        <Row>
          <Col span={8}>Email</Col>
          <Col span={8}>a</Col>
          <Col span={8}>a</Col>
        </Row>
      </Flex>
    </CustomCard>
  );
}
