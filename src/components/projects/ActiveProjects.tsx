import React from 'react';
import Project from './ProjectItem';
import type { ProjectType } from '../../types/project';

interface ActiveProjectsProps {
  activeProjects: ProjectType[];
}

const ActiveProjects: React.FC<ActiveProjectsProps> = ({ activeProjects }) => {
  return (
    <>
      {activeProjects.length > 0 &&
        activeProjects.map((project) => (
          <Project
            key={project._id}
            project={project}
            className="sm:h-activeProjectHeight h-sampleProjectHeight"
          />
        ))}
    </>
  );
};

export default ActiveProjects;
