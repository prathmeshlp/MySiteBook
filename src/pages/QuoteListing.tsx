import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { Quote, TotalProps } from '../types/quotes';
import { useChangeQuoteStatus } from '../hooks/useChangeQuoteStatus';
import { formatAmount, formatDate } from '../utils/format';

interface TableProps {
  totals: TotalProps;
  data: Quote[];
}

const QuoteListing: React.FC<TableProps> = ({ totals, data }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);

  const {
    mutate,
    isError: statusError,
    error: statusErrorMsg,
  } = useChangeQuoteStatus(projectId!);

  useEffect(() => {
    if (data) {
      setAllQuotes(data);
    }
  }, [data, allQuotes]);

  const handleStatus = useCallback(
    (id: string) => {
      const quote = allQuotes.find((item) => item._id === id);
      if (quote) {
        const newStatus =
          quote.status === 'APPROVED' ? 'CANCELLED' : 'APPROVED';
        mutate({ projectId: projectId!, payload: { id, newStatus } });
      }
    },
    [allQuotes, mutate, projectId],
  );

  return (
    <>
      <div className="w-full h-full sm:h-[75vh] flex flex-col justify-between flex-wrap bg-white">
        <table className="min-w-full border-collapse text-left text-sm table-auto p-2 overflow-hidden">
          <thead>
            <tr className="h-14">
              <th className="px-4">ID</th>
              <th className="px-4">Title</th>
              <th className="status px-4"></th>
              <th className="change-status-btn  px-4"></th>
              <th className="px-4">Total Amount</th>
              <th className="px-4">Modified On</th>
              <th className="px-4">Created On</th>
            </tr>
          </thead>
          <tbody>
            {allQuotes.map((item) => {
              const totalAmount =
                totals.quoteTotals.find((total) => total._id === item._id)
                  ?.totalQuoteAmount || 0;
              return (
                <tr
                  key={item._id}
                  className="border-t group relative h-14 overflow-y-scroll"
                >
                  <td className="text-primaryBlue px-4">{item.quotationId}</td>
                  <td className="px-4">
                    {item.details?.title ? item.details?.title : 'Untitled'}
                  </td>
                  <td className="px-4">
                    {item.status === 'APPROVED' ? (
                      <div className="border w-24 text-sm flex-row-center text-center bg-lightGreen p-1 rounded-full">
                        <FaRegCircleCheck />
                        Approved
                      </div>
                    ) : null}
                  </td>
                  <td className="project-action px-4">
                    <button
                      onClick={() => handleStatus(item._id)}
                      className="w-48 p-1 btn-secondary hidden group-hover:block"
                    >
                      {item.status === 'APPROVED'
                        ? 'Mark As UNAPPROVED'
                        : 'Mark As APPROVED'}
                    </button>
                  </td>
                  <td className="font-bold px-4">
                    {formatAmount(totalAmount)}
                  </td>
                  <td className="px-4">{formatDate(item.updatedAt)}</td>
                  <td className="px-4">{formatDate(item.createdAt)}</td>
                </tr>
              );
            })}
          </tbody>
          {statusError && (
            <div className="error text-center">
              Error: {(statusErrorMsg as Error).message}
            </div>
          )}
        </table>
        <footer className="pagecount h-14 flex justify-start items-center text-sm border border-lightGray px-8">
          <span>{allQuotes.length} total</span>
        </footer>
      </div>
    </>
  );
};

export default QuoteListing;
