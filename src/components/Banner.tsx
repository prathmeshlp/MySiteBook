import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';

const Card: React.FC = () => {
  return (
    <>
      <div className="banner card flex flex-col sm:flex-row w-full h-full sm:h-max sm:justify-between justify-end items-center bg-white rounded-lg shadow-lg p-2 sm:p-4 lg:p-4 lg:mx-auto gap-2 sm:gap-0">
        <div className="column-small-screen flex flex-col sm:gap-0 gap-3 w-full sm:w-2/3   h-full">
          <section className="header-text px-4">
            <h1 className="font-bold text-textGreen text-start sm:text-[28px] text-lg">
              From Estimates to Tracking Expenses, Site Book does it all!
            </h1>
          </section>
          <section className="card-text w-full px-4 py-2 sm:py-4 order-last">
            <div className="description-text text-sm sm:text-base flex flex-col justify-start gap-2">
              <p className="flex items-center gap-2">
                <span>
                  <FaRegCheckCircle />
                </span>
                <span className="font-semibold">Estimate Project</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <FaRegCheckCircle />
                </span>
                <span className="font-semibold">Generate Quotations</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <FaRegCheckCircle />
                </span>
                <span className="font-semibold">Prepare Invoices</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <FaRegCheckCircle />
                </span>
                <span className="font-semibold">In-built Rate Library</span>
              </p>
              <p className="flex items-center gap-2">
                <span>
                  <FaRegCheckCircle />
                </span>
                <span className="font-semibold ">
                  Punch Site-wise Expense & Receipt
                </span>
              </p>
            </div>
          </section>
          <section className="video-tutorial w-full h-1/2 flex-row-center sm:hidden block">
            <iframe
              src="https://www.youtube.com/embed/QqQY9RdSyFc"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full rounded-md"
            ></iframe>
          </section>
        </div>
        <section className="video-tutorial sm:w-1/3 w-full h-full sm:h-[85%] sm:flex justify-center items-center sm:p-4 p-0 hidden">
          <iframe
            src="https://www.youtube.com/embed/QqQY9RdSyFc"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full sm:h-48 h-full border-2 border-darkGray rounded-md"
          ></iframe>
        </section>
      </div>
    </>
  );
};

export default Card;
