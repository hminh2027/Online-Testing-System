import { useMutation, useQuery } from '@tanstack/react-query';

export const initialCustomQUery = (service) => {
  const useItem = (id, options) => useQuery([service.path, id], () => fetch);
};
