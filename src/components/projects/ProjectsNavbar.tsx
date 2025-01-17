import React from 'react';
import projectsImg from '../../assets/projectsNavbar/projects.-icon.svg';
import projectsImgBlue from '../../assets/projectsNavbar/projects-blue.svg';
import siteBookImg from '../../assets/projectsNavbar/Sitebook-lib-black.svg';
import siteBookImgBlue from '../../assets/projectsNavbar/Sitebook-lib-blue.svg';
import myItemsImg from '../../assets/projectsNavbar/my-items.svg';
import myItemsImgBlue from '../../assets/projectsNavbar/My-items-blue.svg';
import { Link, useLocation } from 'react-router-dom';

const ProjectsNavbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sm:hidden flex justify-between items-end fixed bottom-0 left-0 w-full bg-white shadow-lg">
      <p
        className={`flex-column-center px-6 py-2 cursor-pointer ${
          location.pathname === '/app/projects'
            ? 'border-b-2 border-b-primaryBlue text-primaryBlue'
            : ''
        }`}
      >
        <img
          src={
            location.pathname === '/app/projects'
              ? projectsImgBlue
              : projectsImg
          }
          alt="ProjectsImg"
          className="w-6 h-6"
        />
        <Link to="/app/projects?type=active" className="text-xs text-center">
          Projects
        </Link>
      </p>
      <p
        className={`flex-column-center px-6 py-2 cursor-pointer ${
          location.pathname === '/app/setting/cost-library'
            ? 'border-b-2 border-b-primaryBlue text-primaryBlue'
            : ''
        }`}
      >
        <img
          src={
            location.pathname === '/app/setting/cost-library'
              ? siteBookImgBlue
              : siteBookImg
          }
          alt="siteBookImg"
          className="w-6 h-6"
        />
        <span className="text-xs text-center">Sitebook Library</span>
      </p>
      <p
        className={`flex-column-center px-6 py-2 cursor-pointer ${
          location.pathname === '/app/setting/cost-library'
            ? 'border-b-2 border-b-primaryBlue  text-primaryBlue'
            : ''
        }`}
      >
        <img
          src={
            location.pathname === '/app/setting/cost-library'
              ? myItemsImgBlue
              : myItemsImg
          }
          alt="siteBookImg"
          className="w-6 h-6"
        />
        <span className="text-xs text-center">My items</span>
      </p>
    </nav>
  );
};

export default ProjectsNavbar;
