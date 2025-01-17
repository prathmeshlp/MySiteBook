import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/useProjects';
import { selectTotalQuotes } from '../../store/projectSlice';
import { TotalProps } from '../../types/quotes';
import Button from '../Button';
import { formatAmount } from '../../utils/format';

interface QuotesHeaderProps {
  totals: TotalProps;
  handleGoToAllQuotes: () => void;
  handleGoToApproved: () => void;
  handleGotoArchieved: () => void;
}

const QuotesHeader: React.FC<QuotesHeaderProps> = ({
  totals,
  handleGoToAllQuotes,
  handleGoToApproved,
  handleGotoArchieved,
}) => {
  const allQuotesdata = useAppSelector(selectTotalQuotes);
  const [activeButton, setActiveButton] = useState<string>('all');

  const approvedQuotesCount = allQuotesdata.filter(
    (quote) => quote.status === 'APPROVED',
  ).length;
  const archievedQuotesCount = allQuotesdata.filter(
    (quote) => quote.status === 'CANCELLED',
  ).length;

  return (
    <>
      <div className="quotes-sort-bar border flex justify-between items-center sm:py-1 p-1">
        <div className="quotes-sort-links flex-row-center text-sm">
          <Button
            onClick={() => {
              handleGoToAllQuotes();
              setActiveButton('all');
            }}
            className={`cursor-pointer ${
              activeButton === 'all'
                ? 'border-b-2 border-b-warningYellow font-semibold'
                : ''
            }`}
          >
            All({allQuotesdata.length})
          </Button>
          <Button
            onClick={() => {
              handleGoToApproved();
              setActiveButton('approved');
            }}
            className={`cursor-pointer ${
              activeButton === 'approved'
                ? 'border-b-2 border-b-warningYellow font-semibold'
                : ''
            }`}
          >
            Approved({approvedQuotesCount})
          </Button>
          <Button
            onClick={() => {
              handleGotoArchieved();
              setActiveButton('archived');
            }}
            className={`cursor-pointer ${
              activeButton === 'archived'
                ? 'border-b-2 border-b-warningYellow font-semibold'
                : ''
            }`}
          >
            Archived({archievedQuotesCount})
          </Button>
        </div>
        <div className="approved-quotations hidden sm:block">
          <h4>
            Total of Approved Quotation/:
            <span className="text-base font-bold">
              {formatAmount(totals?.totals?.quotedAmount)}
            </span>
          </h4>
        </div>
      </div>
      <div className="approved-quotations flex justify-between items-center sm:hidden p-3 text-xs bg-lightGray">
        <h4>Total of Approved Quotations</h4>
        <span className="text-lg font-bold">
          {formatAmount(totals?.totals?.quotedAmount)}
        </span>
      </div>
    </>
  );
};

export default QuotesHeader;
