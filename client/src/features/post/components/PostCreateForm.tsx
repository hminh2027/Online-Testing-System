import type { UploadProps } from 'antd';
import { Button, Divider, Flex, Form, Image, Input, Space, Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { CustomCard } from '@/components';
import { useAddPost } from '../hooks/usePost';
import type { PostCreateDTO } from '../types';
import { upload } from '@/libs/cloudinary';
import { CustomAvatar } from '@/components/CustomAvatar';
import { useAuth } from '@/features/auth';
import { useListUserClass } from '@/features/userClass/hooks/useUserClass';
import { useNotificationMutation } from '@/features/notification/hooks/useNotificationMutation';

export function PostCreateForm() {
  const [form] = Form.useForm();
  const contentValue = Form.useWatch('content', form) as string;
  const { data } = useListUserClass({});
  const { addFn: addNotiFn } = useNotificationMutation();

  const users = data?.content;
  const [image, setImage] = useState<string | null>();
  const { code } = useParams();
  const { user } = useAuth();

  const { mutate: addPostFn } = useAddPost({
    onSuccess: () => {
      if (isEmpty(users) || !users) return;
      if (user?.isTeacher) {
        addNotiFn({
          notiType: 'post',
          content: `'Giáo viên ${user?.fullname} vừa đăng một bài viết mới trong lớp ${users[0].Class.name}`,
          recipents: users.map((u) => u.studentId),
          url: `/class/${users[0].classCode}/newsfeed`,
        });
      } else {
        const recipents = users?.filter((u) => u.studentId !== user?.id);

        const { teacherId } = users[0].Class;

        addNotiFn({
          notiType: 'post',
          content: `Học sinh ${user?.fullname} vừa đăng một bài viết mới trong lớp ${users[0].Class.name}`,
          recipents: [...recipents.map((u) => u.studentId), teacherId],
          url: `/class/${users[0].classCode}/newsfeed`,
        });
      }
    },
    onError: () => {},
  });

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
        {image && <Image style={{ borderRadius: 2 }} width="100%" src={image} />}
      </Form>
      <Divider />
      <Form.Item>
        <Space>
          {image && (
            <Button type="dashed" onClick={() => setImage(null)}>
              Xóa ảnh
            </Button>
          )}
          <Upload
            accept=".jpg,.png"
            customRequest={handleCustomRequest}
            maxCount={1}
            showUploadList={false}
          >
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
