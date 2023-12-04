import type { FormInstance } from 'antd';
import { Flex, Form, Input, Switch } from 'antd';
import { useState, useEffect } from 'react';
import { useClass } from '@/features/class/hooks/useClass';
import type { ClassCreateDTO, ClassRoom } from '../../types';
import { Uploader } from '@/components/Uploader';
import { useClassMutation } from '../../hooks/useClassMutation';
import { LoadingModal } from '@/components';

interface ClassModifierProps {
  code?: string;
  form: FormInstance;
}
export function ClassModifier({ code, form }: ClassModifierProps) {
  const { data: classData, isFetching } = useClass(code as string, {
    enabled: !!code,
  });
  const classRoom = classData?.content;

  const [image, setImage] = useState<string | null>(null);

  const { addFn, updateFn } = useClassMutation();

  const dataAdapter = (data: ClassRoom): ClassCreateDTO => ({
    name: data.name,
    description: data.description,
    imageUrl: '',
    isStudentApprovalEnter: data.isStudentApprovalEnter,
    isStudentApprovalLeave: data.isStudentApprovalLeave,
    isStudentPostAllowed: data.isStudentPostAllowed,
    password: data.password,
  });

  useEffect(() => {
    if (isFetching || !classRoom) return;
    setImage(classRoom.imageUrl);
  }, [classRoom, isFetching]);

  if (isFetching) return <LoadingModal />;

  const handleOnFinish = (values: ClassCreateDTO) => {
    const payload: ClassCreateDTO = {
      ...values,
      imageUrl: image,
    };

    if (code) {
      return updateFn({
        id: code,
        payload,
      });
    }

    return addFn(payload);
  };

  return (
    <Flex>
      <Form
        form={form}
        style={{ width: '100%' }}
        layout="vertical"
        onFinish={handleOnFinish}
        preserve={false}
        initialValues={classRoom ? { ...dataAdapter(classRoom) } : {}}
      >
        <Form.Item label="Tên lớp học" required name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả lớp học" required name="description">
          <Input.TextArea rows={8} />
        </Form.Item>
        <Form.Item label="Ảnh bìa lớp" name="imageUrl">
          <Uploader image={image} setImage={setImage} />
        </Form.Item>
        <Form.Item label="Mật khẩu lớp học" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Kiểm duyệt học sinh vào lớp"
          name="isStudentApprovalEnter"
          valuePropName="checked"
        >
          <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
        </Form.Item>
        <Form.Item
          label="Chặn học sinh tự rời lớp học"
          name="isStudentApprovalLeave"
          valuePropName="checked"
        >
          <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
        </Form.Item>
        <Form.Item
          label="Cho phép học sinh đăng bài"
          name="isStudentPostAllowed"
          valuePropName="checked"
        >
          <Switch checkedChildren="Bật" unCheckedChildren="Tắt" defaultChecked />
        </Form.Item>
      </Form>
    </Flex>
  );
}
