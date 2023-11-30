import { endpoints } from '@/config';
import { axiosInstance } from '@/libs';
import type { ResponseItem } from '@/types';

interface AttemptInfo {
  done: number;
  todo: number;
}

interface RankInfo {
  excellent: number;
  average: number;
  ordinary: number;
}

export interface Statistic {
  rank: RankInfo;
  attempt: AttemptInfo;
}

export type ResStatistic = ResponseItem<Statistic>;

export function useExamStatistic() {
  const fetchStatisticByExamId = (id: string) =>
    axiosInstance<ResStatistic>({
      url: `${endpoints.apis.statistic.exam.path}/${id}`,
      params: {},
    });

  return {
    fetchStatisticByExamId,
  };
}
