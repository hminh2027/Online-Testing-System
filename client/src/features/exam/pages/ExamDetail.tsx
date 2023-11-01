import { Flex, Form } from 'antd';
import { useParams } from 'react-router-dom';
import { ExamAddEdit, ExamQuestionDnd } from '../components';

export default function ExamDetail() {
  const [form] = Form.useForm();

  const { id } = useParams();

  return (
    <div
      style={{
        width: '70%',
        margin: '2rem auto',
      }}
    >
      {/* <ExamAddEdit id={1} form={form} /> */}
      {id && <ExamQuestionDnd id={+id} />}
    </div>
  );
}
