import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import QuotesSideBar from '../components/QuotesSideBar';
import QuoteListing from './QuoteListing';
import { Quote } from '../types/quotes';
import QuotesHeader from '../components/quotes/QuotesHeader';
import { useAppDispatch } from '../hooks/useProjects';
import { setQuotesData } from '../store/projectSlice';
import QuoteCard from '../components/quotes/QuoteCard';
import QuotesNavbar from '../components/quotes/QuotesNavbar';
import { FaPlus } from 'react-icons/fa6';
import { useFetchQuotes } from '../hooks/useFetchQuotes';
import { useFetchTotals } from '../hooks/useFetchTotals';

const ProjectQuotes: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [allQuotes, setAllQuotes] = useState<Quote[]>([]);
  const dispatch = useAppDispatch();

  const { quotes, error: quotesError, } = useFetchQuotes(projectId!);
  const { totals: totalQuotedAmount, error: totalsError } = useFetchTotals(
    projectId!,
  );


  useEffect(() => {
    if (quotes) {
      setAllQuotes(quotes);
      dispatch(setQuotesData(quotes));
    }
  }, [quotes, dispatch]);

  const handleGoToAllQuotes = useCallback(() => setAllQuotes(quotes), [quotes]);
  const handleGoToApproved = useCallback(
    () => setAllQuotes(quotes.filter((quote) => quote.status === 'APPROVED')),
    [quotes],
  );
  const handleGotoArchieved = useCallback(
    () => setAllQuotes(quotes.filter((quote) => quote.status === 'CANCELLED')),
    [quotes],
  );

  return (
    <div className="project-quotes sm:mt-20 mt-16 w-full sm:h-heightMainContainer h-heightMainContainerSmall relative">
      <main className="quotes-main flex sm:flex-row flex-col">
        <section className="navbar hidden sm:block h-full">
          <QuotesSideBar />
        </section>
        <section className="quotes-container w-full h-full">
          <div className="header flex justify-between items-center p-2 border">
            <h1 className="quotes-header sm:ml-4 ml-2 sm:text-xl text-base font-bold">
              Quotes
            </h1>
            <button className="w-36 h-10 py-2 font-medium rounded-xl btn-secondary sm:block hidden">
              + Create New
            </button>
          </div>
          <div className="quotesheader">
            <QuotesHeader
              totals={totalQuotedAmount}
              handleGoToAllQuotes={handleGoToAllQuotes}
              handleGoToApproved={handleGoToApproved}
              handleGotoArchieved={handleGotoArchieved}
            />
          </div>
          <div className="quotes-listing sm:block hidden w-full h-full">
            <QuoteListing totals={totalQuotedAmount} data={allQuotes} />
          </div>
          {quotesError && <div className="error p-4">{quotesError}</div>}
          {totalsError && <div className="error p-4">{totalsError}</div>}
        </section>
        <section className="quote-list-card-container w-full h-full p-2 flex flex-col justify-center gap-4 mb-20 sm:mb-0 sm:hidden bg-lightGray">
          {allQuotes &&
            allQuotes.map((quote) => {
              return (
                <QuoteCard
                  key={quote._id}
                  quote={quote}
                  totals={totalQuotedAmount}
                />
              );
            })}
        </section>
      </main>
      <QuotesNavbar />
      <div className="create-quote-btn sm:hidden flex-row-center rounded-full fixed bottom-20 right-2 w-14 h-14 bg-createQuoteIconBg text-white">
        <FaPlus size={25} />
      </div>
    </div>
  );
};

export default ProjectQuotes;
