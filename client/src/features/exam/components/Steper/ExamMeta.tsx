import Form from 'antd/es/form';
import { Button, Divider, Flex } from 'antd';
import { ExamModifier } from '../Drawer';
import type { Exam } from '../../types';

interface ExamMetaProps {
  exam: Exam;
}

export function ExamMeta({ exam }: ExamMetaProps) {
  const [form] = Form.useForm();

  const handleSave = () => form.submit();

  return (
    <Flex vertical justify="space-between">
      <ExamModifier id={exam.id as number} form={form} />
      <Divider />
      <Button type="default" onClick={handleSave}>
        Lưu
      </Button>
    </Flex>
  );
}
