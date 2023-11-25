import { useAsync } from 'react-use';
import { useParams } from 'react-router-dom';
import { useExamStatistic } from '../../hooks/useExamStatistic';

interface StatisticChartProps {}
export function StatisticChart({}: StatisticChartProps) {
  const { id } = useParams();
  const { fetchStatisticByExamId } = useExamStatistic();

  useAsync(async () => {
    if (!id) return;
    const res = await fetchStatisticByExamId(id);

    console.log(res);
  }, [id]);

  return <div>Chart</div>;
}
