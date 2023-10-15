import { Button, Divider, Form, Input, Select, Switch, Typography, Upload } from 'antd';
import { CustomSpace } from '@/components/CustomSpace';
import { CustomCard } from '@/components/CustomCard';
import { useClass, useListClass } from '../hooks/useClass';

export default function ClassAddEdit() {
  const { data: classData } = useListClass({
    page: 1,
    size: 10,
    sort: '',
  });

  console.log(classData);

  return (
    <CustomSpace
      isFullWidth
      align="center"
      justify="center"
      direction="vertical"
      styles={{
        item: {
          width: '50%',
          textAlign: 'center',
        },
      }}
    >
      <Typography.Title>Tạo lớp học</Typography.Title>
      <CustomCard hasShadow>
        <Form layout="vertical">
          <Divider orientation="left">Thông tin lớp học</Divider>
          <Form.Item label="Tên lớp học" required>
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả lớp học" required>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Ảnh bìa lớp">
            <Upload
              name="imageUrl"
              listType="picture-card"
              showUploadList={false}
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              // beforeUpload={beforeUpload}
              // onChange={handleChange}
            >
              <div>Bấm vào đây</div>
            </Upload>
          </Form.Item>
          <Form.Item label="Khối" required>
            <Select />
          </Form.Item>
          <Divider orientation="left">Cấu hình lớp học</Divider>
          <Form.Item label="Mật khẩu lớp học">
            <Input />
          </Form.Item>
          <Form.Item label="Chặn học sinh tự rời lớp học">
            <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
          </Form.Item>
          <Button block type="primary">
            Tạo lớp
          </Button>
        </Form>
      </CustomCard>
    </CustomSpace>
  );
}
