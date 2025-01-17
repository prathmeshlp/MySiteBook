import React from 'react';
import ActiveProjects from './ActiveProjects';
import ArchievedProjects from './ArchievedProject';
import NoData from '../NoData';
import { ProjectType } from '../../types/project';
import Banner from '../Banner';

const ProjectContent: React.FC<{ type: string; data: ProjectType[] }> = ({
  type,
  data,
}) => {
  return (
    <>
      <main className="flex flex-col sm:flex-row justify-start sm:justify-center sm:items-center lg:justify-start lg:items-start lg flex-wrap gap-4 sm:gap-4 lg:gap-6 lg:px-0 lg:py-0">
        {data && data.length > 0 ? (
          <>
            {type === 'active' && <ActiveProjects activeProjects={data} />}
            {type === 'archived' && (
              <ArchievedProjects archivedProjects={data} />
            )}
          </>
        ) : (
          <>
            <Banner />
            {type === 'archived' && <NoData />}
          </>
        )}
      </main>
    </>
  );
};

export default ProjectContent;
