import { useState, useEffect } from 'react';
import { fetchQuotesTotals } from '../api/status';
import { TotalQuotedAmountType } from '../types/quotes';

export const useFetchTotals = (projectId: string) => {
  const [totals, setTotals] = useState<TotalQuotedAmountType>({
    quoteTotals: [],
    totals: {
      quotedAmount: 0,
      invoiceToRaised: 0,
      balanceToRaise: 0,
      approvedQuotes: 0,
    },
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const totalsData = await fetchQuotesTotals(projectId);
        setTotals(totalsData);
      } catch (error) {
        setError('Failed to fetch quotes totals. Please try again later.');
      }
    };

    if (projectId) {
      fetchTotals();
    }
  }, [projectId]);

  return { totals, error };
};
