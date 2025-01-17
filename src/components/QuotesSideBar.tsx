import React, { useCallback, useState } from 'react';
import {
  FaFileInvoiceDollar,
  FaFileInvoice,
  FaMoneyCheck,
  FaProjectDiagram,
  FaUsers,
  FaChartBar,
  FaBars,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const QuotesSideBar: React.FunctionComponent = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  return (
    <motion.nav
      initial={false}
      animate={{ width: isCollapsed ? '4rem' : '11rem' }}
      className="sidebar bg-white h-heightMainContainer border transition-width duration-100 overflow-hidden"
    >
      <div className="p-4 flex items-center justify-start">
        <button onClick={toggleMenu} className="text-2xl">
          <FaBars />
        </button>
      </div>
      <ul className="list-none p-0 m-0">
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-gray-200"
        >
          <FaFileInvoiceDollar className="mr-2 text-2xl" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="menu-text"
            >
              Quotation
            </motion.span>
          )}
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-gray-200"
        >
          <FaFileInvoice className="mr-2 text-2xl" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="menu-text"
            >
              Invoice
            </motion.span>
          )}
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-gray-200"
        >
          <FaMoneyCheck className="mr-2 text-2xl" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="menu-text"
            >
              Payments
            </motion.span>
          )}
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-gray-200"
        >
          <FaProjectDiagram className="mr-2 text-2xl" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="menu-text"
            >
              Project Details
            </motion.span>
          )}
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-gray-200"
        >
          <FaUsers className="mr-2 text-2xl" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="menu-text"
            >
              Project Users
            </motion.span>
          )}
        </motion.li>
        <motion.li
          whileHover={{ scale: 1.1 }}
          className="flex items-center p-4 cursor-pointer hover:bg-gray-200"
        >
          <FaChartBar className="mr-2 text-2xl" />
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="menu-text"
            >
              Reports
            </motion.span>
          )}
        </motion.li>
      </ul>
    </motion.nav>
  );
};

export default QuotesSideBar;
