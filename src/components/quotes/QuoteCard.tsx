import React, { useCallback } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { SlOptionsVertical } from 'react-icons/sl';
import { Quote, TotalProps } from '../../types/quotes';
import { useParams } from 'react-router-dom';
import Button from '../Button';
import { formatAmount, formatDate } from '../../utils/format';
import { useChangeQuoteStatus } from '../../hooks/useChangeQuoteStatus';

interface QuoteListCardProps {
  totals: TotalProps;
  quote: Quote;
}

const QuoteCard: React.FC<QuoteListCardProps> = ({ quote, totals }) => {
  const { projectId } = useParams<{ projectId: string }>();

  const {
    mutate,
    isError: statusError,
    error: statusErrorMsg,
  } = useChangeQuoteStatus(projectId!);

  const handleStatus = useCallback(() => {
    const newStatus = quote.status === 'APPROVED' ? 'CANCELLED' : 'APPROVED';
    mutate({ projectId: projectId!, payload: { id: quote._id, newStatus } });
  }, [mutate, projectId, quote.status, quote._id]);

  const totalAmount =
    totals.quoteTotals.find((total) => total._id === quote._id)
      ?.totalQuoteAmount || 0;

  return (
    <div className="quote-list-card flex flex-col justify-start min-h-20 p-4 gap-2 cursor-pointer border-2 rounded-lg bg-white shadow-lg">
      <div className="qid-amount flex justify-between items-center">
        <h6 className="qid font-semibold text-sm text-primaryBlue">
          {quote.quotationId}
        </h6>
        <h3 className="amount text-sm font-semibold">
          {formatAmount(totalAmount)}
        </h3>
      </div>
      <div className="title-status flex justify-start items-center gap-1">
        <h6 className="title font-semibold text-md text-ellipsis">
          {quote.details?.title ? quote.details?.title : 'Untitled'}
        </h6>
        {quote.status === 'APPROVED' ? (
          <div className="status border w-24 text-xs font-medium flex-row-center text-center bg-lightGreen p-1 rounded-full">
            <FaRegCircleCheck />
            Approved
          </div>
        ) : null}
      </div>
      <div className="modifiedon-createdon flex justify-start items-center gap-1 ">
        <h6 className="modifiedon text-xs">
          Modified on:{formatDate(quote.updatedAt)}
        </h6>
        |
        <h3 className="createdon text-xs">
          Created on:{formatDate(quote.createdAt)}
        </h3>
      </div>
      <div className="statuschange-options flex justify-between items-center">
        <Button
          onClick={handleStatus}
          className="p-1 btn-secondary text-xs font-semibold"
        >
          {quote.status === 'APPROVED'
            ? 'Mark As UNAPPROVED'
            : 'Mark As APPROVED'}
        </Button>
        <SlOptionsVertical />
      </div>
      {statusError && (
        <div className="error text-center">
          Error: {(statusErrorMsg as Error).message}
        </div>
      )}
    </div>
  );
};

export default QuoteCard;
