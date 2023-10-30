import { Col, Row } from 'antd';
import { ExamQuestionDnd } from '../components';

export default function ExamDetail() {
  return (
    <Row gutter={24}>
      <Col span={24}>
        <ExamQuestionDnd id={1} />
      </Col>
      {/* <Col span={12}>
    <ExamAddEdit id={1} form={form} />
  </Col> */}
    </Row>
  );
}
