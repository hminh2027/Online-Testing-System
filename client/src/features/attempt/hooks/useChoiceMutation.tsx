import { useAddChoice, useAddChoices } from './useChoice';

export function useChoiceMutation() {
  const { mutate: addFn } = useAddChoice({
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: addManyFn } = useAddChoices({
    onSuccess: () => {},
    onError: () => {},
  });

  return {
    addFn,
    addManyFn,
  };
}
