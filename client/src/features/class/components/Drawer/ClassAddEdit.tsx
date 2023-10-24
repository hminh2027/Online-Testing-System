import { Form, Input, Switch, Upload } from 'antd';
import { CustomSpace } from '@/components/CustomSpace';
import { useClass } from '@/features/class/hooks/useClass';
import type { ClassCreateDTO, ClassRoom } from '../../types';

interface ClassAddEditProps {
  code?: string;
}
export default function ClassAddEdit({ code }: ClassAddEditProps) {
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
          textAlign: 'center',
          width: '100%',
        },
      }}
    >
      <Form layout="vertical" initialValues={classRoom ? { ...dataAdapter(classRoom) } : {}}>
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
            style={{ width: '100%' }}
          >
            <div>Nhấn để đăng ảnh</div>
          </Upload>
        </Form.Item>
        <Form.Item label="Mật khẩu lớp học">
          <Input />
        </Form.Item>
        <Form.Item label="Chặn học sinh tự rời lớp học">
          <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
        </Form.Item>
      </Form>
    </CustomSpace>
  );
}
