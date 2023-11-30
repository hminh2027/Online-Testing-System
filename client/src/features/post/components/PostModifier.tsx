import { FileImageOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Form, Image, Space, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { upload } from '@/libs';
import { usePostMutation } from '../hooks/usePostMutation';
import type { PostCreateDTO } from '../types';

interface PostModifierProps {
  imageUrl: string;
  content: string;
  id: number;
}
export function PostModifier({ id, content, imageUrl }: PostModifierProps) {
  const [form] = Form.useForm();
  const interalContent = Form.useWatch('content', form) as string;
  const [image, setImage] = useState<string | null>(imageUrl);

  const { updateFn } = usePostMutation();

  const handleOnFinish = (values: PostCreateDTO) =>
    updateFn({
      id,
      payload: {
        content: values.content,
        imageUrl: image,
      },
    });

  const handleCustomRequest: UploadProps['customRequest'] = (options) => {
    const { file } = options;

    upload(file)
      .then((res) => setImage(res))
      .catch(() => {});
  };

  return (
    <Form
      form={form}
      initialValues={{
        content,
        imageUrl,
      }}
      onFinish={handleOnFinish}
      style={{
        textAlign: 'end',
      }}
    >
      <Form.Item name="content">
        <TextArea />
      </Form.Item>

      {image && (
        <Form.Item>
          <Image style={{ borderRadius: 8 }} width="100%" src={image} />
        </Form.Item>
      )}
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
        <Button type="primary" disabled={!interalContent} onClick={() => form.submit()}>
          Đăng bài
        </Button>
      </Space>
    </Form>
  );
}
