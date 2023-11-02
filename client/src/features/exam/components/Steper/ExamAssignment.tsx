import { Col, Divider, List, Row } from 'antd';
import { useListClass } from '@/features/class/hooks/useClass';
import { ClassCard } from '../Card';

interface ExamAssignmentProps {}
export function ExamAssignment({}: ExamAssignmentProps) {
  const { data, isFetching } = useListClass({});
  const items = data?.content;

  if (isFetching) return <>Loading</>;

  return (
    <Row
      style={{
        height: '100%',
        overflow: 'hidden',
      }}
      gutter={24}
    >
      <Col
        span={12}
        style={{
          height: '100%',
        }}
      >
        <Divider>Lớp chưa giao</Divider>
        <List
          style={{
            overflow: 'auto',
            height: '90%',
          }}
          grid={{
            gutter: 24,
            column: 2,
          }}
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <ClassCard classRoom={item} />
            </List.Item>
          )}
        />
      </Col>
      <Col
        span={12}
        style={{
          height: '100%',
        }}
      >
        <Divider>Lớp đã giao</Divider>
        <List
          style={{
            overflow: 'auto',
            height: '90%',
          }}
          grid={{
            gutter: 24,
            column: 2,
          }}
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <ClassCard classRoom={item} />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
}
