import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { IoStarOutline } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';

interface SidebarProps {
  isSidebarOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  LoggedInUsersName: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  onClose,
  onLogout,
  LoggedInUsersName,
}) => {
  return (
    <>
      <section
        className={`fixed inset-0 z-30 transition-opacity duration-300 sm:hidden ${
          isSidebarOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <nav
        className={`fixed left-0 top-0 w-64 h-full bg-white transform transition-transform duration-300 flex flex-col justify-between items-start ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="name-menu-options">
          <div className="flex justify-start items-center p-4">
            <h2 className="text-xl font-bold">{LoggedInUsersName}</h2>
          </div>
          <ul className="flex flex-col gap-4 justify-start items-start p-4 w-full">
            <li>
              <p className="flex-row-center gap-2">
                <CgProfile fontSize={24} />
                <Link to="/profile" onClick={onClose}>
                  My Profile
                </Link>
              </p>
            </li>
            <li>
              <p className="flex-row-center gap-2">
                <IoMdHelpCircleOutline fontSize={24} />
                <Link to="/help" onClick={onClose}>
                  Help
                </Link>
              </p>
            </li>
            <li>
              <p className="flex-row-center gap-2">
                <IoStarOutline fontSize={24} />
                <Link to="/rate" onClick={onClose}>
                  Rate this App
                </Link>
              </p>
            </li>
          </ul>
        </div>
        <div className="border border-grey flex flex-col justify-start items-center w-full">
          <div
            className="logout-btn p-4 border border-darkGray w-full flex justify-start items-center cursor-pointer gap-4"
            onClick={onLogout}
          >
            <LuLogOut />
            <span className="hover:bg-lightGray">Logout</span>
          </div>
          <div className="version w-full text-center border text-xs font-bold p-2">
            <h3>Version 2.8.0</h3>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
