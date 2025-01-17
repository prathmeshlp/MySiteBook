import React from 'react';
import Project from './ProjectItem';
import type { ProjectType, TotalPaymentsType } from '../../types/project';

interface SampleProjectsProps {
  sampleProjects: ProjectType[];
  totalPayments: TotalPaymentsType;
}

const SampleProjects: React.FC<SampleProjectsProps> = ({
  sampleProjects,
  totalPayments,
}) => {
  return (
    <>
      {sampleProjects.length > 0 ? (
        sampleProjects.map((project) => {
          const totalAmountData =
            totalPayments &&
            totalPayments.paymentTotals?.find(
              (total) => total._id === project._id,
            );
          return (
            <Project
              key={project._id}
              project={project}
              totalAmountData={totalAmountData}
              className="h-sampleProjectHeight"
            />
          );
        })
      ) : (
        <h1 className="font-bold sm:text-lg text-md">No Sample Projects</h1>
      )}
    </>
  );
};

export default SampleProjects;
