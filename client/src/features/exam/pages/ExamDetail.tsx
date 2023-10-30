import { Flex, Form } from 'antd';
import { ExamAddEdit, ExamQuestionDnd } from '../components';

export default function ExamDetail() {
  const [form] = Form.useForm();

  return (
    <div
      style={{
        width: '70%',
        margin: '2rem auto',
      }}
    >
      {/* <ExamAddEdit id={1} form={form} /> */}
      <ExamQuestionDnd id={1} />
    </div>
  );
}
