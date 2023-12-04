import { useNavigate } from 'react-router-dom';
import { useAddAttempt, useDeleteAttempt, usePatchAttempt, useUpdateAttempt } from './useAttempt';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

export function useAttemptMutation() {
  const navigate = useNavigate();
  const { notify } = useAntDNoti();
  const { mutate: addFn } = useAddAttempt({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: (error) => {
      notify({
        type: 'error',
        description: error,
      });
    },
  });

  const { mutate: updateFn } = useUpdateAttempt({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: (error) => {
      notify({
        type: 'error',
        description: error,
      });
      navigate('/class');
    },
  });

  const { mutate: deleteFn } = useDeleteAttempt({
    onSuccess: (res) => {
      notify({
        type: 'success',
        description: res.message,
      });
    },
    onError: () => {},
  });

  const { mutate: patchFn } = usePatchAttempt({
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    addFn,
    updateFn,
    deleteFn,
    increaseTaboutFn: patchFn,
  };
}
