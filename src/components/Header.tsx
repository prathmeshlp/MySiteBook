import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaBars, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa6';
import mySiteBookLogo from '../assets/site-book-logo-small.svg';
import Button from './Button';
import Sidebar from './SideBar';
import { useAppSelector } from '../hooks/useProjects';
import {
  selectActiveProjects,
  selectSampleProjects,
} from '../store/projectSlice';
import { ProjectType } from '../types/project';

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get('type') || '';
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { projectId } = useParams<{ projectId: string }>();

  const activeProjectsData = useAppSelector(selectActiveProjects);
  const sampleProjectsData = useAppSelector(selectSampleProjects);

  const activeProjectTitle = useMemo(() => {
    const project = activeProjectsData.data.find(
      (item: ProjectType) => item._id === projectId
    );
    return project ? project.name : '';
  }, [activeProjectsData.data, projectId]);

  const sampleProjectTitle = useMemo(() => {
    const project = sampleProjectsData.data.find(
      (item: ProjectType) => item._id === projectId
    );
    return project ? project.name : '';
  }, [sampleProjectsData.data, projectId]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const capitalizedType = useMemo(() => type.charAt(0).toUpperCase() + type.slice(1), [type]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate('/');
  }, [navigate]);

  const handleGoToProjects = useCallback(() => {
    navigate('/app/projects?type=active');
  }, [navigate]);

  const LoggedInUsersName = useMemo(() => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : '';
  }, []);

  return (
    <header className="main-header bg-bgHeader w-full sm:h-20 h-16 py-2 px-4 flex justify-between fixed top-0 left-0 z-20">
      <div className="flex items-center sm:hidden">
        <button className="mr-4" onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <FaBars size={24} />
        </button>
        <h1 className="font-bold text-xl">Projects</h1>
      </div>

      <section className="header-links-left sm:flex gap-4 hidden">
        <div className="mysitelog w-16">
          <img
            src={mySiteBookLogo}
            alt="mySiteBookLogo"
            className="bg-white max-w-full rounded-md cursor-pointer"
            onClick={handleGoToProjects}
          />
        </div>
        <div className="navigation-links-and-project-type flex flex-col justify-start">
          <ul className="flex justify-start items-center gap-4 font-semibold text-sm">
            <li className={location.pathname.includes('/app/project') ? 'border-b-2 border-darkGray font-bold' : ''}>
              <Link to="/app/projects/?type=active">Projects</Link>
            </li>
            <li className={location.pathname === '/app/my-items' ? 'border-b-2 border-darkGray' : ''}>
              <Link to="/app/my-items">My Items</Link>
            </li>
            <li className={location.pathname === '/app/site-book-library' ? 'border-b-2 border-darkGray' : ''}>
              <Link to="/app/site-book-library">Site Book Library</Link>
            </li>
            <li className={location.pathname === '/app/settings' ? 'border-b-2 border-darkGray' : ''}>
              <Link to="/app/settings">Settings</Link>
            </li>
            <li className={location.pathname === '/app/help' ? 'border-b-2 border-darkGray' : ''}>
              <Link to="/app/help">Help</Link>
            </li>
          </ul>
          <div className="project-type mt-3">
            <span className="text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
              {activeProjectTitle || sampleProjectTitle || capitalizedType}
            </span>
          </div>
        </div>
      </section>

      <section className="header-links-right sm:block hidden">
        <div className="user-account w-full" ref={dropdownRef}>
          <Button onClick={() => setIsDropdownOpen((prev) => !prev)} className="bg-transparent text-center flex-row-center font-semibold">
            {LoggedInUsersName}
            <span>
              <FaAngleDown size={12} />
            </span>
          </Button>
          {isDropdownOpen && (
            <div className="bg-white border rounded shadow-lg">
              <Link to="/app/profile" className="flex-row-center p-2 hover:bg-lightGray">
                <FaUser className="mr-2" />
                My Profile
              </Link>
              <Button onClick={handleLogout} className="flex-row-center text-center w-full hover:bg-lightGray">
                <FaSignOutAlt className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </section>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        LoggedInUsersName={LoggedInUsersName}
      />
    </header>
  );
};

export default Header;
