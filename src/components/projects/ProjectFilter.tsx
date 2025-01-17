import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useProjects';
import {
  selectActiveProjects,
  selectArchivedProjects,
} from '../../store/projectSlice';
import Button from '../Button';

const ProjectFilter: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = location.search.includes('type=active');
  const isArchived = location.search.includes('type=archived');

  const activeProjectsData = useAppSelector(selectActiveProjects);
  const archivedProjectsData = useAppSelector(selectArchivedProjects);

  const handleCreateNewProject = () => {
    navigate('/app/projects/create');
  };

  const handleGotoActive = () => {
    navigate('/app/projects?type=active');
  };

  const handleGotoArchieved = () => {
    navigate('/app/projects?type=archived');
  };

  return (
    <section className="project-type-links flex justify-between items-center sm:px-8 px-8 py-2 fixed z-10 sm:top-20 top-16 left-0 bg-lightGray w-full">
      <ul className="flex-row-center gap-2 sm:text-sm text-base">
        <li>
          <Button
            onClick={handleGotoActive}
            className={`${isActive ? 'border-b-2 border-warningYellow font-semibold' : ''}`}
          >
            Active&nbsp;({activeProjectsData && activeProjectsData?.totalCount})
          </Button>
        </li>
        <li>
          <Button
            onClick={handleGotoArchieved}
            className={`${isArchived ? 'border-b-2 border-yellow-500 font-semibold' : ''}`}
          >
            Archived&nbsp;(
            {archivedProjectsData && archivedProjectsData.totalCount})
          </Button>
        </li>
      </ul>
      <div className="create-new-project-btn sm:block hidden">
        <Button
          className="w-36 h-10 py-2 font-bold rounded-xl btn-primary"
          onClick={handleCreateNewProject}
        >
          + Create New
        </Button>
      </div>
    </section>
  );
};

export default ProjectFilter;
