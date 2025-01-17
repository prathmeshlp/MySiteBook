import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../store/projectSlice';
import type { ProjectState } from '../store/projectSlice';

const store = configureStore({
  reducer: {
    projects: projectsReducer,
  },
});

export type RootState = {
  projects: ProjectState;
};

export type AppDispatch = typeof store.dispatch;

export { store };
