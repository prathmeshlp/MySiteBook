import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login';
import Projects from './pages/Projects';
import Error from './pages/Error';
import Root from './pages/Root';
import { loader as ProjectsLoader } from './api/projects';
import ProjectQuotes from './pages/ProjectQuotes';
import { UserProvider } from './context/UserContext';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/status';
import CreateProject from './pages/CreateProject';
import { Provider } from 'react-redux';
import { store } from './store/store';
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: '/app',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: 'projects',
        element: (
          <PrivateRoute>
            <Projects />
          </PrivateRoute>
        ),
        loader: ProjectsLoader,
      },
      {
        path: 'project-cost/:projectId/quotes',
        element: (
          <PrivateRoute>
            <ProjectQuotes />
          </PrivateRoute>
        ),
      },
      {
        path: 'projects/create',
        element: (
          <PrivateRoute>
            <CreateProject />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
