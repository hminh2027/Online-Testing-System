import { Segmented, Space, Table } from 'antd';
import { classSegments, displaySegments } from './config';

interface ClassesPageProps {}
export default function ClassesPage({}: ClassesPageProps) {
  return (
    <div>
      <Space>
        <Segmented options={classSegments} />
        <Segmented options={displaySegments} />
      </Space>
      <Table />
    </div>
  );
}
