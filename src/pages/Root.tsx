import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <div className="main-container w-full h-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
