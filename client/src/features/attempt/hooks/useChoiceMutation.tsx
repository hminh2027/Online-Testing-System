import { useNavigate } from 'react-router-dom';
import { CustomMessage } from '@/components';
import { useAddChoice, useAddChoices } from './useChoice';

export function useChoiceMutation() {
  const navigate = useNavigate();
  const { mutate: addFn } = useAddChoice({
    onSuccess: () => {},
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.error(error);
      navigate('/class');
    },
  });

  const { mutate: addManyFn } = useAddChoices({
    onSuccess: () => {},
    onError: (error) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      CustomMessage.error(error);
      navigate('/class');
    },
  });

  return {
    addFn,
    addManyFn,
  };
}
