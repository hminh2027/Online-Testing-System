import { Button, Divider, Form, Input, Select, Switch, Typography, Upload } from 'antd';
import { useParams } from 'react-router-dom';
import { CustomSpace } from '@/components/CustomSpace';
import { CustomCard } from '@/components/CustomCard';
import { useClass } from '../hooks/useClass';
import type { ClassCreateDTO, ClassRoom } from '../types';

export default function ClassAddEdit() {
  const { code } = useParams();

  const { data: classData, isFetching } = useClass(code as string, {
    enabled: !!code,
  });

  const classRoom = classData?.content;

  const dataAdapter = (data: ClassRoom): ClassCreateDTO => ({
    name: data.name,
    description: data.description,
    imageUrl: data.imageUrl,
    isStudentApprovalLeave: data.isStudentApprovalLeave,
    password: data.password,
  });

  if (isFetching) return <></>;

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
        <Form layout="vertical" initialValues={classRoom ? { ...dataAdapter(classRoom) } : {}}>
          <Divider orientation="left">Thông tin lớp học</Divider>
          <Form.Item label="Tên lớp học" required name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Mô tả lớp học" required name="description">
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
