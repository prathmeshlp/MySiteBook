import React, { useEffect } from 'react';
import { Await, useLoaderData, useLocation } from 'react-router-dom';
import Banner from '../components/Banner';
import ProjectFilter from '../components/projects/ProjectFilter';
import SampleProjects from '../components/projects/SampleProjects';
import { useAppDispatch } from '../hooks/useProjects';
import {
  ProjectData,
  setActiveProjects,
  setArchivedProjects,
  setSampleProjects,
} from '../store/projectSlice';
import { PuffLoader } from 'react-spinners';
import ProjectContent from '../components/projects/ProjectContent';
import ProjectsNavbar from '../components/projects/ProjectsNavbar';
import { TotalPaymentsType } from '../types/project';

interface LoaderData {
  sampleProjects: ProjectData;
  archivedProjects: ProjectData;
  activeProjects: ProjectData;
  totalPayments: TotalPaymentsType;
}

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeProjects, archivedProjects, sampleProjects, totalPayments } =
    useLoaderData() as LoaderData;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type') || '';

  useEffect(() => {
    dispatch(setActiveProjects(activeProjects));
    dispatch(setArchivedProjects(archivedProjects));
    dispatch(setSampleProjects(sampleProjects));
  }, [
    dispatch,
    activeProjects,
    archivedProjects,
    sampleProjects,
    totalPayments,
  ]);

  return (
    <div className="projects-main-container w-full h-full sm:mt-32 mt-122 mb-16 sm:mb-0 bg-lightGray sm:p-4 p-2">
      <ProjectFilter />
      <section
        className={`projects-container w-full h-full p-2 sm:p-4 lg:p-4 flex flex-col justify-cls gap-4 mx-auto ${type === 'active' ? 'active-projects' : 'archived-projects'}`}
      >
        <React.Suspense fallback={<PuffLoader />}>
          <Await
            resolve={type === 'active' ? activeProjects : archivedProjects}
          >
            {(projectData) => (
              <>
                <ProjectContent type={type} data={projectData.data} />
                {projectData.data.length === 0 ? null : <Banner />}
              </>
            )}
          </Await>
        </React.Suspense>
      </section>
      {type === 'active' && (
        <>
          <section className="sample-projects-container w-full h-full px-4 flex flex-col justify-center mx-auto">
            <h1 className="font-semibold sm:text-xl text-lg ml-2 mb-2 sm:mb-4 py-2 lg:py-0 sm:text-left">
              Sample Projects
            </h1>
            <main className="flex flex-col sm:flex-row justify-start sm:justify-center sm:items-center lg:justify-start lg:items-start lg flex-wrap gap-4 sm:gap-4 lg:gap-6 lg:p-0">
              <React.Suspense fallback={<PuffLoader />}>
                <Await resolve={sampleProjects}>
                  {(data) => (
                    <SampleProjects
                      sampleProjects={data.data}
                      totalPayments={totalPayments}
                    />
                  )}
                </Await>
              </React.Suspense>
            </main>
          </section>
        </>
      )}
      <ProjectsNavbar />
    </div>
  );
};

export default Projects;
