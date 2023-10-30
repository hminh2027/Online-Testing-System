import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Flex, Image } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { upload } from '@/libs/cloudinary';

interface UploaderProps {
  image: string | null;
  setImage: (value: string | null) => void;
}
export function Uploader({ image, setImage }: UploaderProps) {
  const handleCustomRequest: UploadProps['customRequest'] = (options) => {
    const { file } = options;

    upload(file)
      .then((res) => setImage(res))
      .catch(() => {});
  };

  return (
    <div>
      {image ? (
        <Flex vertical gap={10}>
          <Image src={image} width="100%" />
          <Button danger block onClick={() => setImage(null)}>
            Xóa ảnh
          </Button>
        </Flex>
      ) : (
        <Dragger
          maxCount={1}
          showUploadList={false}
          customRequest={handleCustomRequest}
          style={{ width: '100%' }}
          fileList={[]}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p>Nhấn để đăng ảnh</p>
        </Dragger>
      )}
    </div>
  );
}
