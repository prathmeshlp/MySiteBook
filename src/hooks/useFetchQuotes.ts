import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { loadQuotesQuotationData } from '../api/status';
import { Quote } from '../types/quotes';

export const useFetchQuotes = (projectId: string) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {
    data,
    isError,
    error: queryError,
    isLoading,
  } = useQuery<Quote[]>({
    queryKey: ['quotes', projectId],
    queryFn: () => loadQuotesQuotationData(projectId),
  });

  useEffect(() => {
    if (data) {
      setQuotes(data);
    }
    if (isError && queryError) {
      setError((queryError as Error).message);
    }
  }, [data, isError, queryError]);

  return { quotes, error, isLoading };
};
