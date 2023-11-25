import { endpoints } from '@/config';
import { axiosInstance } from '@/libs';

interface AttemptInfo {
  done: number;
  todo: number;
  doing: number;
}

interface RankInfo {
  excellent: number;
  average: number;
  ordinary: number;
}

interface StatisticProps {
  rank: RankInfo;
  attempt: AttemptInfo;
}

export function useExamStatistic() {
  const fetchStatisticByExamId = (id: string) =>
    axiosInstance<StatisticProps>({
      url: `${endpoints.apis.statistic.exam.path}/${id}`,
      params: {},
    });

  return {
    fetchStatisticByExamId,
  };
}
