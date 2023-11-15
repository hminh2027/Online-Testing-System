import { axiosInstance } from '@/libs';
import type { ResAttemptItem } from '@/features/attempt/types';
import { endpoints } from '@/config';

export default function useOngoingAttempt() {
  const fetchOnGoingAttempt = () =>
    axiosInstance<ResAttemptItem>({
      url: endpoints.apis.attempt.path,
      params: {},
    });

  // Should consider whether place in useAttemptMutation or useOngoing one
  const patchTabout = () => {};

  return { fetchOnGoingAttempt };
}
