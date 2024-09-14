/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import commonUtils from 'store/common/utils';
import { TutorialItem, Tutorials } from '../types/typesTutorials';

const { removeItemsFromObjectByKeyOffset } = commonUtils;

type Pages = {
	fetchedPages: {
		[page: number]: TutorialItem[];
	};
	pagesTotal: number;
};

type Slice = Pages;

const initialState: Slice = {
	fetchedPages: {},
	pagesTotal: 0,
};

export const sliceTutorials = createSlice({
	name: 'sliceTutorials',
	initialState,
	reducers: {
		addPageItemsToStore(state: Slice, action: PayloadAction<Tutorials>) {
			const { items, pagesTotal, currentFetchedPage } = action.payload;

			state.pagesTotal = pagesTotal;
			state.fetchedPages[currentFetchedPage] = items;
		},

		removePageItemsFromStore(
			state: Slice,
			action: PayloadAction<{
				key: number;
			}>,
		) {
			const { key } = action.payload;
			state.fetchedPages = {
				...removeItemsFromObjectByKeyOffset(current(state.fetchedPages), key),
			};
		},

		resetTutorialsSlice() {
			return initialState;
		},
	},
});

// Actions
export const { addPageItemsToStore, removePageItemsFromStore, resetTutorialsSlice } =
	sliceTutorials.actions;
