import { Avatar, Button, Divider, Flex, Form, Input, Space, Upload } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import { CustomCard } from '@/components';

export function PostCreateForm() {
  const [form] = Form.useForm();
  const contentValue = Form.useWatch('content', form) as string;

  return (
    <CustomCard
      style={{
        width: '100%',
        textAlign: 'end',
      }}
    >
      <Form name="create-post" form={form}>
        <Form.Item name="content">
          <Flex>
            <Avatar size="large">M</Avatar>
            <Input
              placeholder="Nhập nội dung thảo luận với lớp học..."
              bordered={false}
              width="100%"
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
          <Button type="primary" disabled={!contentValue}>
            Đăng bài
          </Button>
        </Space>
      </Form.Item>
    </CustomCard>
  );
}
