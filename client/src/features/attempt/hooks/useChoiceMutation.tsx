import { useNavigate } from 'react-router-dom';
import { useAddChoice, useAddChoices } from './useChoice';
import { useAntDNoti } from '@/hooks/useAntDNoti/useAntDNoti';

export function useChoiceMutation() {
  const navigate = useNavigate();
  const { notify } = useAntDNoti();
  const { mutate: addFn } = useAddChoice({
    onSuccess: () => {},
    onError: (error) => {
      notify({
        type: 'error',
        description: error,
      });
      navigate('/class');
    },
  });

  const { mutate: addManyFn } = useAddChoices({
    onSuccess: () => {},
    onError: (error) => {
      notify({
        type: 'error',
        description: error,
      });
      navigate('/class');
    },
  });

  return {
    addFn,
    addManyFn,
  };
}
