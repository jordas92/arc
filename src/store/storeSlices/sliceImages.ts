/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

import commonUtils from 'store/common/utils';
import { keysSliceImages } from 'store/common/keys';
import { ImageItem, ImageItems } from 'store/types/typesImages';

const { ALL_IMAGES, DISCORD_IMAGES, FAVORITE_ALL_IMAGES, FAVORITE_PROJECT_IMAGES } =
	keysSliceImages;
const { removeItemsFromObjectByKeyOffset, toggleIsImageFavorite } = commonUtils;

export interface ImageItemsFromOrigin extends ImageItems {
	origin: keyof typeof keysSliceImages | string;
}

type Pages = {
	fetchedPages: {
		[page: number]: ImageItem[];
	};
	pagesTotal: number;
};

type Slice = {
	[ALL_IMAGES]: Pages;
	[DISCORD_IMAGES]: Pages;
	[FAVORITE_ALL_IMAGES]: Pages;
	[FAVORITE_PROJECT_IMAGES]: Pages;
};

const initialState: Slice = {
	[ALL_IMAGES]: {
		fetchedPages: {},
		pagesTotal: 0,
	},
	[DISCORD_IMAGES]: {
		fetchedPages: {},
		pagesTotal: 0,
	},
	[FAVORITE_ALL_IMAGES]: {
		fetchedPages: {},
		pagesTotal: 0,
	},
	[FAVORITE_PROJECT_IMAGES]: {
		fetchedPages: {},
		pagesTotal: 0,
	},
};

const mutateIsFavoriteBySliceKey = (
	state: Slice,
	imageId: string,
	imagePage: number,
	sliceKey: keyof typeof keysSliceImages,
) => {
	return state[sliceKey].fetchedPages[imagePage].map((item: ImageItem) => {
		return toggleIsImageFavorite(item, imageId);
	});
};

const removeImageBySliceKey = (
	state: Slice,
	imageId: string,
	imagePage: number,
	sliceKey: keyof typeof keysSliceImages,
) => {
	return state[sliceKey].fetchedPages[imagePage].filter(
		(item: ImageItem) => item.imageId !== imageId,
	);
};

const removeFavoriteBySliceKey = (
	state: Slice,
	imagePage: number,
	sliceKey: keyof typeof keysSliceImages,
) => {
	return state[sliceKey].fetchedPages[imagePage].filter(
		(item: ImageItem) => item.isFavorite !== false,
	);
};

export const sliceImages = createSlice({
	name: 'sliceImages',
	initialState,
	reducers: {
		addPageItemsToStore(state: Slice, action: PayloadAction<ImageItemsFromOrigin>) {
			const { origin, items, pagesTotal, currentFetchedPage } = action.payload;

			state[origin].pagesTotal = pagesTotal;
			state[origin].fetchedPages[currentFetchedPage] = items;
		},

		mutateIsFavoriteIntoSliceImages(
			state: Slice,
			action: PayloadAction<{
				imageId: string;
				imagePage: number;
			}>,
		) {
			const { imageId, imagePage } = action.payload;

			if (state[ALL_IMAGES].fetchedPages[imagePage]) {
				state[ALL_IMAGES].fetchedPages[imagePage] = mutateIsFavoriteBySliceKey(
					state,
					imageId,
					imagePage,
					ALL_IMAGES,
				);
			}

			if (state[DISCORD_IMAGES].fetchedPages[imagePage]) {
				state[DISCORD_IMAGES].fetchedPages[imagePage] = mutateIsFavoriteBySliceKey(
					state,
					imageId,
					imagePage,
					DISCORD_IMAGES,
				);
			}

			if (state[FAVORITE_ALL_IMAGES].fetchedPages[imagePage]) {
				state[FAVORITE_ALL_IMAGES].fetchedPages[imagePage] = mutateIsFavoriteBySliceKey(
					state,
					imageId,
					imagePage,
					FAVORITE_ALL_IMAGES,
				);
			}

			if (state[FAVORITE_PROJECT_IMAGES].fetchedPages[imagePage]) {
				state[FAVORITE_PROJECT_IMAGES].fetchedPages[imagePage] = mutateIsFavoriteBySliceKey(
					state,
					imageId,
					imagePage,
					FAVORITE_PROJECT_IMAGES,
				);
			}
		},

		removePageItemsFromStore(
			state: Slice,
			action: PayloadAction<{
				origin: string;
				key: number;
			}>,
		) {
			const { origin, key } = action.payload;

			state[origin].fetchedPages = {
				...removeItemsFromObjectByKeyOffset(current(state[origin].fetchedPages), key),
			};
		},

		removeImageFromSliceImages(
			state: Slice,
			action: PayloadAction<{
				imageId: string;
				imagePage: number;
			}>,
		) {
			const { imageId, imagePage } = action.payload;

			if (state[ALL_IMAGES].fetchedPages[imagePage]) {
				state[ALL_IMAGES].fetchedPages[imagePage] = removeImageBySliceKey(
					state,
					imageId,
					imagePage,
					ALL_IMAGES,
				);
			}

			if (state[DISCORD_IMAGES].fetchedPages[imagePage]) {
				state[DISCORD_IMAGES].fetchedPages[imagePage] = removeImageBySliceKey(
					state,
					imageId,
					imagePage,
					DISCORD_IMAGES,
				);
			}

			if (state[FAVORITE_ALL_IMAGES].fetchedPages[imagePage]) {
				state[FAVORITE_ALL_IMAGES].fetchedPages[imagePage] = removeImageBySliceKey(
					state,
					imageId,
					imagePage,
					FAVORITE_ALL_IMAGES,
				);
			}

			if (state[FAVORITE_PROJECT_IMAGES].fetchedPages[imagePage]) {
				state[FAVORITE_PROJECT_IMAGES].fetchedPages[imagePage] = removeImageBySliceKey(
					state,
					imageId,
					imagePage,
					FAVORITE_PROJECT_IMAGES,
				);
			}
		},

		removeFavoriteFromSliceImages(
			state: Slice,
			action: PayloadAction<{
				imagePage: number;
			}>,
		) {
			const { imagePage } = action.payload;

			if (state[FAVORITE_ALL_IMAGES].fetchedPages[imagePage]) {
				state[FAVORITE_ALL_IMAGES].fetchedPages[imagePage] = removeFavoriteBySliceKey(
					state,
					imagePage,
					FAVORITE_ALL_IMAGES,
				);
			}

			if (state[FAVORITE_PROJECT_IMAGES].fetchedPages[imagePage]) {
				state[FAVORITE_PROJECT_IMAGES].fetchedPages[imagePage] = removeFavoriteBySliceKey(
					state,
					imagePage,
					FAVORITE_PROJECT_IMAGES,
				);
			}
		},

		resetImagesSlice() {
			return initialState;
		},
	},
});

// Actions
export const {
	addPageItemsToStore,
	mutateIsFavoriteIntoSliceImages,
	removePageItemsFromStore,
	removeImageFromSliceImages,
	removeFavoriteFromSliceImages,
	resetImagesSlice,
} = sliceImages.actions;
