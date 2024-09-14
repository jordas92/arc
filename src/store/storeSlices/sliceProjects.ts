/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Project, Projects } from '../types/typesProjects';

type Slice = Projects;

const initialState: Slice = {
	items: [],
	nextPage: '',
};

export const sliceProjects = createSlice({
	name: 'sliceProjects',
	initialState,
	reducers: {
		addProjectsToList(state: Slice, action: PayloadAction<Array<Project>>) {
			state.items = [...state.items, ...action.payload];
		},

		setNextPageValue(state: Slice, action: PayloadAction<string>) {
			state.nextPage = action.payload;
		},

		removeProjectFromList(state: Slice, action: PayloadAction<string>) {
			const projectId = action.payload;

			state.items = state.items.filter((item) => item.projectId !== projectId);
		},

		resetProjectsSlice() {
			return initialState;
		},
	},
});

// Actions
export const { addProjectsToList, setNextPageValue, removeProjectFromList, resetProjectsSlice } =
	sliceProjects.actions;
