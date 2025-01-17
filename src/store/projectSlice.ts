import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { ProjectType, TotalProjects } from '../types/project';
import { Quote } from '../types/quotes';

export interface ProjectData {
  data: ProjectType[];
  totalCount: number;
  totalProjects: TotalProjects[];
}

export interface ProjectState {
  activeProjects: ProjectData;
  archivedProjects: ProjectData;
  sampleProjects: ProjectData;
  totalQuotes: Quote[];
}

const initialState: ProjectState = {
  activeProjects: { data: [], totalCount: 0, totalProjects: [] },
  archivedProjects: { data: [], totalCount: 0, totalProjects: [] },
  sampleProjects: { data: [], totalCount: 0, totalProjects: [] },
  totalQuotes: [],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveProjects(state, action: PayloadAction<ProjectData>) {
      state.activeProjects = action.payload;
    },
    setArchivedProjects(state, action: PayloadAction<ProjectData>) {
      state.archivedProjects = action.payload;
    },
    setSampleProjects(state, action: PayloadAction<ProjectData>) {
      state.sampleProjects = action.payload;
    },
    setQuotesData(state, action: PayloadAction<Quote[]>) {
      state.totalQuotes = action.payload;
    },
  },
});

export const {
  setActiveProjects,
  setArchivedProjects,
  setSampleProjects,
  setQuotesData,
} = projectsSlice.actions;

export const selectActiveProjects = (state: RootState) =>
  state.projects.activeProjects;
export const selectArchivedProjects = (state: RootState) =>
  state.projects.archivedProjects;
export const selectSampleProjects = (state: RootState) =>
  state.projects.sampleProjects;
export const selectTotalQuotes = (state: RootState) =>
  state.projects.totalQuotes;

export default projectsSlice.reducer;
