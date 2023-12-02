import { Button, Form } from 'antd';
import { useParams } from 'react-router-dom';
import { ClassModifier } from '../components';

export default function ClassEdit() {
  const [form] = Form.useForm();

  const { code } = useParams();

  return (
    <div
      style={{
        margin: '1rem auto',
      }}
    >
      <ClassModifier code={code} form={form} />
      <Button block type="primary" onClick={() => form.submit()}>
        Cập nhật
      </Button>
    </div>
  );
}
