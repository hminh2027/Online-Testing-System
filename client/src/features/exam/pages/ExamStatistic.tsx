import { useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { useState } from 'react';
import { Tabs, Typography } from 'antd';
import { InsertRowRightOutlined, PieChartOutlined } from '@ant-design/icons';
import { useResult } from '../hooks/useResult';
import { StatisticChart, StatisticTable } from '../components';
import type { Attempt } from '@/features/attempt/types';
import type { Statistic } from '../hooks/useExamStatistic';
import { useExamStatistic } from '../hooks/useExamStatistic';

export default function ExamStatistic() {
  const { id } = useParams();
  const { fetchResultByExamId } = useResult();
  const { fetchStatisticByExamId } = useExamStatistic();

  const [resultData, setResultData] = useState<Attempt[]>();
  const [statisticData, setStatisticData] = useState<Statistic>();

  useAsync(async () => {
    if (!id) return;
    const { content: rs } = await fetchResultByExamId(id);
    const { content: stt } = await fetchStatisticByExamId(id);

    setResultData(rs);
    setStatisticData(stt);
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
            children: <StatisticTable data={resultData} />,
          },
          {
            label: (
              <Typography.Text>
                <PieChartOutlined />
                Biểu đồ
              </Typography.Text>
            ),
            key: '2',
            children: <StatisticChart data={statisticData} />,
          },
        ]}
      />
    </div>
  );
}
