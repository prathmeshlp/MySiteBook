import { useMutation } from '@tanstack/react-query';
import { changeQuoteStatus, queryClient } from '../api/status';

export const useChangeQuoteStatus = (projectId: string) => {
  const { mutate, isError, error } = useMutation({
    mutationFn: changeQuoteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['quotes', projectId],
      });
    },
  });

  return { mutate, isError, error };
};
