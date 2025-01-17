import React from 'react';
import Header from '../components/Header';

const Error: React.FC = () => {
  return (
    <>
      <Header />
      <main className="w-screen h-heightMainContainer flex flex-column-center">
        <h1>An Error Occured</h1>
        <p>Could Not find this page</p>
      </main>
    </>
  );
};

export default Error;
