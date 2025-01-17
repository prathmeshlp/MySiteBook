import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import { PaymentTotalType, ProjectType } from '../../types/project';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { SlOptionsVertical } from 'react-icons/sl';
import { MdOutlineEdit } from 'react-icons/md';
import { FaRegClone } from 'react-icons/fa';
import { IoArchiveOutline } from 'react-icons/io5';
import { formatAmount, formatDate } from '../../utils/format';

interface ProjectProps {
  project: ProjectType;
  className?: string;
  totalAmountData?: PaymentTotalType;
}

const ProjectItem: React.FC<ProjectProps> = ({
  project,
  className,
  totalAmountData,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleGoToQuotes = (id: string) => {
    navigate(`/app/project-cost/${id}/quotes`);
  };
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      optionsRef.current &&
      !optionsRef.current.contains(event.target as Node)
    ) {
      setIsOptionsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleProjectClick = useCallback(
    (id: string) => {
      if (window.innerWidth < 640) {
        handleGoToQuotes(id);
      }
    },
    [handleGoToQuotes],
  );

  return (
    <>
      {project && (
        <div
          onClick={() => handleProjectClick(project._id)}
          className={`project sm:w-[257px] lg:w-[346px] w-full border rounded-lg  shadow-lg group relative bg-white cursor-pointer sm:cursor-default ${
            className || ''
          } `}
        >
          <div className="w-[90%] p-5 sm:p-5 flex flex-col sm:gap-4 gap-2 justify-start">
            <span className="font-semibold text-md ellipses">
              {project.name}
            </span>
            <h3 className="text-xs">
              Updated On: {formatDate(project.updatedOn)}
            </h3>
            <div className="calculations flex w-full justify-between items-start">
              <div className="text-green-600 text-sm sm:text-xs">
                <span>In</span>
                <span className="flex font-medium">
                  <FaArrowDownLong />
                  {formatAmount(totalAmountData?.paymentTotal.RECEIPT ?? 0)}
                </span>
              </div>
              <div className="out error text-sm sm:text-xs  ">
                <span>Out</span>
                <span className="flex font-medium">
                  -
                  <FaArrowUpLong />
                  {formatAmount(totalAmountData?.paymentTotal.EXPENSE ?? 0)}
                </span>
              </div>
              <div className="balance flex text-sm sm:text-xs">
                <span>=</span>
                <div className="flex flex-col text-sm sm:text-xs ">
                  <span>Balance</span>
                  <span className="font-medium">
                    {formatAmount(totalAmountData?.paymentTotal.Balance ?? 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="project-action hidden sm:group-hover:flex flex-col justify-center items-center sm:bg-bghOverProject rounded-lg absolute inset-0 ">
            <Button
              onClick={() => handleGoToQuotes(project._id)}
              className="w-28 h-10 bg-white text-blue-500 font-medium text-sm rounded-3xl border-blue-500 border-2"
            >
              {project.type === 'sample-project' ? 'Explore' : 'Open'}
            </Button>
          </div>
          <div
            className="option-btn hidden absolute group-hover:block right-3 top-3 p-3 bg-white rounded-full cursor-pointer"
            ref={optionsRef}
            onClick={() => setIsOptionsOpen((prev) => !prev)}
          >
            {<SlOptionsVertical />}
          </div>
          {isOptionsOpen && (
            <div className="absolute z-[1055] sm:-right-20 sm:top-16 -right-2 top-14 p-3 flex flex-col justify-start items-start sm:gap-2 gap-3 bg-white rounded-lg shadow-xl">
              <div className="edit flex justify-center items-center  gap-1 cursor-pointer">
                <span>
                  <MdOutlineEdit />
                </span>
                <span>Edit</span>
              </div>
              <div className="edit flex justify-center items-center gap-1 cursor-pointer">
                <span>
                  <FaRegClone />
                </span>
                <span>Clone</span>
              </div>
              <div className="edit flex justify-center items-center gap-1 cursor-pointer">
                <span>
                  <IoArchiveOutline />
                </span>
                <span>Archieve</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectItem;
