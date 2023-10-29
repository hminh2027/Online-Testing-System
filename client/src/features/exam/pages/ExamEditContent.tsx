import { Col, Row } from 'antd';
import { ExamQuestion, ExamStepForm } from '../components';
import { useExam } from '../hooks/useExam';

interface ExamEditContentProps {}
export default function ExamEditContent({}: ExamEditContentProps) {
  const { data, isFetching } = useExam(1);

  const exam = data?.content;

  if (isFetching) return <>Loading</>;

  return (
    <Row
      style={{
        width: '90%',
        margin: 'auto',
      }}
      gutter={24}
    >
      <Col span={12}>
        <ExamQuestion />
      </Col>
      <Col span={12}>
        <ExamStepForm exam={exam} />
      </Col>
    </Row>
  );
}
