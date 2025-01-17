import React from 'react';
import noDataImg from '../assets/no-data-img.gif';

const Nodata: React.FC = () => {
  return (
    <section className="no-data-container w-full h-heightNoDataContainer flex-column-center">
      <img src={noDataImg} alt="noDataImg" />
      <h2>No data availbale</h2>
    </section>
  );
};

export default Nodata;
