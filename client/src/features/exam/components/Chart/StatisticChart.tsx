import { Col, Row } from 'antd';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import type { Statistic } from '../../hooks/useExamStatistic';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatisticChartProps {
  data: Statistic;
}
export function StatisticChart({ data }: StatisticChartProps) {
  const { attempt, rank } = data;

  const { ordinary, average, excellent } = rank;
  const { done, todo } = attempt;

  const attemptConfig = {
    labels: ['Trung bình', 'Khá', 'Giỏi'],
    datasets: [
      {
        label: 'Số người',
        data: [ordinary, average, excellent],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const rankConfig = {
    labels: ['Người đã làm', 'Người chưa làm'],
    datasets: [
      {
        label: 'Số người',
        data: [done, todo],
        backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Row gutter={50}>
      <Col span={12}>
        <Doughnut options={{ radius: 200 }} data={attemptConfig} />
      </Col>
      <Col span={12}>
        <Doughnut options={{ radius: 200 }} data={rankConfig} />
      </Col>
    </Row>
  );
}
