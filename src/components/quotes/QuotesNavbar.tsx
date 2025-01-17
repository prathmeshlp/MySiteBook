import React from 'react';
import quotationImg from '../../assets/quotesNavbar/quote-black-and-white.svg';
import quotationImgBlue from '../../assets/quotesNavbar/quotes-primary.svg';
import invvoiceImg from '../../assets/quotesNavbar/invoices.svg';
import invvoiceImgBlue from '../../assets/quotesNavbar/invoices-primary.svg';
import paymentsImg from '../../assets/quotesNavbar/payments.svg';
import paymentsImgBlue from '../../assets/quotesNavbar/payments-blue.svg';
import reportsImg from '../../assets/quotesNavbar/report.svg';
import { Link, useLocation } from 'react-router-dom';

const QuotesNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sm:hidden flex justify-between items-end flex-shrink fixed bottom-0 left-0 w-full bg-white shadow-lg">
      <p
        className={`flex-column-center p-4 cursor-pointer ${
          location.pathname.includes('/app/project-cost/')
            ? 'border-b-2 border-b-primaryBlue text-primaryBlue font-semibold'
            : ''
        }`}
      >
        <img
          src={
            location.pathname.includes('/app/project-cost/')
              ? quotationImgBlue
              : quotationImg
          }
          alt="quotationImg"
          className="w-6 h-6"
        />
        <Link to="/app/projects?type=active" className="text-xs">
          Quotations
        </Link>
      </p>
      <p
        className={`flex-column-center p-4 cursor-pointer ${
          location.pathname === '/app/setting/cost-library'
            ? 'border-b-2 border-b-primaryBlue'
            : ''
        }`}
      >
        <img
          src={
            location.pathname === '/app/setting/cost-library'
              ? invvoiceImgBlue
              : invvoiceImg
          }
          alt="invvoiceImg"
          className="w-6 h-6"
        />
        <span className="text-xs">Invoices</span>
      </p>
      <p
        className={`flex-column-center p-4 cursor-pointer ${
          location.pathname === '/app/setting/cost-library'
            ? 'border-b-2 border-b-primaryBlue'
            : ''
        }`}
      >
        <img
          src={
            location.pathname === '/app/setting/cost-library'
              ? paymentsImgBlue
              : paymentsImg
          }
          alt="paymentsImg"
          className="w-6 h-6"
        />
        <span className="text-xs">Payments</span>
      </p>
      <p
        className={`flex-column-center p-4 cursor-pointer ${
          location.pathname === '/app/setting/cost-library'
            ? 'border-b-2 border-b-primaryBlue'
            : ''
        }`}
      >
        <img
          src={
            location.pathname === '/app/setting/cost-library'
              ? reportsImg
              : reportsImg
          }
          alt="reportsImg"
          className="w-6 h-6"
        />
        <span className="text-xs">Report</span>
      </p>
    </nav>
  );
};

export default QuotesNavbar;
