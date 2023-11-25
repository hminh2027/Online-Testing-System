import { useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { useState } from 'react';
import { Tabs, Typography } from 'antd';
import { InsertRowRightOutlined, PieChartOutlined } from '@ant-design/icons';
import { useResult } from '../hooks/useResult';
import { StatisticChart, StatisticTable } from '../components';
import type { Attempt } from '@/features/attempt/types';

export default function ExamStatistic() {
  const { id } = useParams();
  const { fetchResultByExamId } = useResult();

  const [data, setData] = useState<Attempt[]>();

  useAsync(async () => {
    if (!id) return;
    const { content } = await fetchResultByExamId(id);

    setData(content);
  }, [id]);

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: (
              <Typography.Text>
                <InsertRowRightOutlined />
                Bảng thống kê
              </Typography.Text>
            ),
            key: '1',
            children: <StatisticTable data={data} />,
          },
          {
            label: (
              <Typography.Text>
                <PieChartOutlined />
                Biểu đồ
              </Typography.Text>
            ),
            key: '2',
            children: <StatisticChart />,
          },
        ]}
      />
    </div>
  );
}
