import { Avatar, Button, Divider, Flex, Form, Input, Space, Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { CustomCard } from '@/components';
import { useAddPost } from '../hooks/usePost';
import type { PostCreateDTO } from '../types';

export function PostCreateForm() {
  const [form] = Form.useForm();
  const contentValue = Form.useWatch('content', form) as string;
  const { mutate } = useAddPost({
    onSuccess: () => {},
    onError: () => {},
  });

  const { code } = useParams();

  const handleOnFinish = (value: PostCreateDTO) => {
    const createDto: PostCreateDTO = {
      classCode: code as string,
      content: value.content,
      imageUrl: '',
    };

    mutate(createDto);
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
            <Avatar size="large">M</Avatar>
            <Input
              style={{ maxWidth: '90%' }}
              placeholder="Nhập nội dung thảo luận với lớp học..."
              bordered={false}
            />
          </Flex>
        </Form.Item>
      </Form>
      <Divider />
      <Form.Item>
        <Space>
          <Upload>
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
