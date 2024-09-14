/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import commonUtils from 'store/common/utils';
import { ImageItem, ImageItems } from 'store/types/typesImages';

type Slice = {
	fetchedPages: {
		[page: number]: ImageItem[];
	};
	pagesTotal: number;
};

const { removeItemsFromObjectByKeyOffset, toggleIsImageFavorite } = commonUtils;

const initialState: Slice = {
	fetchedPages: {},
	pagesTotal: 0,
};

export const sliceProjectImages = createSlice({
	name: 'sliceProjectImages',
	initialState,
	reducers: {
		addPageItemsToStore(state: Slice, action: PayloadAction<ImageItems>) {
			const { items, pagesTotal, currentFetchedPage } = action.payload;

			state.pagesTotal = pagesTotal;
			state.fetchedPages[currentFetchedPage] = items;
		},

		removePageItemsFromStore(state: Slice, action: PayloadAction<number>) {
			state.fetchedPages = {
				...removeItemsFromObjectByKeyOffset(current(state.fetchedPages), action.payload),
			};
		},

		removeImageFromSliceProjectImages(
			state: Slice,
			action: PayloadAction<{
				imageId: string;
				imagePage: string;
			}>,
		) {
			const { imageId, imagePage } = action.payload;

			state.fetchedPages[imagePage] = state.fetchedPages[imagePage].filter(
				(item: ImageItem) => item.imageId !== imageId,
			);
		},

		mutateIsFavoriteIntoSliceProjectImages(
			state: Slice,
			action: PayloadAction<{
				imageId: string;
				imagePage: string;
			}>,
		) {
			const { imageId, imagePage } = action.payload;

			state.fetchedPages[imagePage] = state.fetchedPages[imagePage].map((item: ImageItem) => {
				return toggleIsImageFavorite(item, imageId);
			});
		},

		resetProjectImagesSlice() {
			return initialState;
		},
	},
});

// Actions
export const {
	addPageItemsToStore,
	removePageItemsFromStore,
	removeImageFromSliceProjectImages,
	mutateIsFavoriteIntoSliceProjectImages,
	resetProjectImagesSlice,
} = sliceProjectImages.actions;
