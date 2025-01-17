import React from 'react';
import Project from './ProjectItem';
import type { ProjectType } from '../../types/project';

interface ArchieveProjectsProps {
  archivedProjects: ProjectType[];
}

const ArchievedProjects: React.FC<ArchieveProjectsProps> = ({
  archivedProjects,
}) => {
  return (
    <>
      {archivedProjects.length > 0 &&
        archivedProjects.map((project) => (
          <Project
            key={project._id}
            project={project}
            className="sm:h-archieveProjectHeight h-sampleProjectHeight"
          />
        ))}
    </>
  );
};

export default ArchievedProjects;
