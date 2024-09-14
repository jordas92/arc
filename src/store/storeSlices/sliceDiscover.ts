/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import commonUtils from 'store/common/utils';
import { DiscoverImageItem, DiscoverImagesItems } from 'store/types/typesDiscover';

const { removeItemsFromObjectByKeyOffset, toggleIsImageFavorite } = commonUtils;

type Pages = {
	fetchedPages: {
		[page: number]: DiscoverImageItem[];
	};
	pagesTotal: number;
};

type Slice = Pages;

const initialState: Slice = {
	fetchedPages: {},
	pagesTotal: 0,
};

const mutateIsFavorite = (state: Slice, imageId: string, imagePage: number) => {
	return state.fetchedPages[imagePage].map((item: DiscoverImageItem) => {
		return toggleIsImageFavorite(item, imageId);
	});
};

export const sliceDiscover = createSlice({
	name: 'sliceDiscover',
	initialState,
	reducers: {
		addPageItemsToStore(state: Slice, action: PayloadAction<DiscoverImagesItems>) {
			const { items, pagesTotal, currentFetchedPage } = action.payload;

			state.pagesTotal = pagesTotal;
			state.fetchedPages[currentFetchedPage] = items;
		},

		mutateIsFavoriteIntoSliceDiscover(
			state: Slice,
			action: PayloadAction<{
				imageId: string;
				imagePage: number;
			}>,
		) {
			const { imageId, imagePage } = action.payload;

			state.fetchedPages[imagePage] = mutateIsFavorite(state, imageId, imagePage);
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

		resetDiscoverSlice() {
			return initialState;
		},
	},
});

// Actions
export const {
	addPageItemsToStore,
	mutateIsFavoriteIntoSliceDiscover,
	removePageItemsFromStore,
	resetDiscoverSlice,
} = sliceDiscover.actions;
