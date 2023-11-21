import type { UploadProps } from 'antd';
import { Button, Divider, Flex, Form, Image, Input, Space, Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { CustomCard } from '@/components';
import { useAddPost } from '../hooks/usePost';
import type { PostCreateDTO } from '../types';
import { upload } from '@/libs/cloudinary';
import { CustomAvatar } from '@/components/CustomAvatar';
import { useAuth } from '@/features/auth';
import { useAddNotification } from '@/features/notification';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';
import { socket } from '@/libs/socket';
import { Events } from '@/SocketCLient';

export function PostCreateForm() {
  const [form] = Form.useForm();
  const contentValue = Form.useWatch('content', form) as string;
  const { data } = useListUserClass({});

  const users = data?.content;

  const { mutate: addNotiFn } = useAddNotification({
    onSuccess: (res) => {
      const message = res.content.content;

      if (users) {
        socket.emit(Events.CreateNoti, {
          message,
          recipentIds: users.map((user) => user.id as number),
        });
      }
    },
    onError: () => {},
  });
  const { mutate: addPostFn } = useAddPost({
    onSuccess: () => {
      if (users) {
        addNotiFn({
          content: 'Có một bài viết mới',
          url: '',
          recipents: users.map((user) => user.id as number),
        });
      }
    },
    onError: () => {},
  });

  const [image, setImage] = useState<string | null>();
  const { code } = useParams();
  const { user } = useAuth();

  const handleOnFinish = (value: PostCreateDTO) => {
    const createDto: PostCreateDTO = {
      classCode: code as string,
      content: value.content,
      imageUrl: image,
    };

    addPostFn(createDto);
  };

  const handleCustomRequest: UploadProps['customRequest'] = (options) => {
    const { file } = options;

    upload(file)
      .then((res) => setImage(res))
      .catch(() => {});
  };

  return (
    <CustomCard
      style={{
        width: '100%',
        textAlign: 'end',
      }}
      hasShadow
    >
      <Form name="create-post" form={form} onFinish={handleOnFinish}>
        <Form.Item name="content">
          <Flex justify="space-between" align="center">
            <CustomAvatar name={user?.fullname} size="large" />
            <Input
              style={{ width: '90%' }}
              placeholder="Nhập nội dung thảo luận với lớp học..."
              bordered={false}
            />
          </Flex>
        </Form.Item>
        {image && <Image style={{ borderRadius: 8 }} width="100%" src={image} />}
      </Form>
      <Divider />
      <Form.Item>
        <Space>
          <Upload customRequest={handleCustomRequest} maxCount={1} showUploadList={false}>
            <Button icon={<FileImageOutlined />} type="link">
              Thêm hình ảnh
            </Button>
          </Upload>
          <Button type="primary" disabled={!contentValue} onClick={() => form.submit()}>
            Đăng bài
          </Button>
        </Space>
      </Form.Item>
    </CustomCard>
  );
}
