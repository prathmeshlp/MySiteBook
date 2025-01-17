import { QueryClient } from '@tanstack/react-query';
import { getToken } from './auth';

export const queryClient = new QueryClient();

export const changeQuoteStatus = async ({
  projectId,
  payload,
}: {
  projectId: string;
  payload: { id: string; newStatus: string };
}) => {
  const token = getToken();
  const response = await fetch(
    `https://app.mysitebook.io/api/projects/${projectId}/quotes/edit-status?type=QUOTATION`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error('Failed to change quote status');
  }
  return;
};

export const loadQuotesQuotationData = async (projectId: string) => {
  const token = getToken();
  const response = await fetch(
    `https://app.mysitebook.io/api/projects/${projectId}/quotes/quotes-list?type=QUOTATION`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch project quotes');
  }

  return await response.json();
};

export async function fetchQuotesTotals(projectId: string) {
  const token = getToken();
  const queryParams = new URLSearchParams({
    categoryFilter: '',
    type: 'QUOTATION',
    resource: 'undefined',
  }).toString();

  const url = `https://app.mysitebook.io/api/projects/${projectId}/quotes/fetch-totals?${queryParams}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quotes totals');
  }

  return response.json();
}
