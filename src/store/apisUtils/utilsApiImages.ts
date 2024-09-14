/** Copyright (c) 2023-present Kristiyan Dimitrov */

import {
	removeImageFromSliceImages,
	mutateIsFavoriteIntoSliceImages,
} from 'store/storeSlices/sliceImages';
import {
	removeImageFromSliceProjectImages,
	mutateIsFavoriteIntoSliceProjectImages,
} from 'store/storeSlices/sliceProjectImages';
import {
	removeImageFromGenerationsHistory,
	mutateIsFavoriteIntoGenerationsHistory,
} from 'store/storeSlices/sliceOpenedProjects';
import {
	removeImageFromModalData,
	mutateIsFavoriteIntoModalData,
} from 'store/storeSlices/sliceApp';
import { mutateIsFavoriteIntoSliceDiscover } from 'store/storeSlices/sliceDiscover';

import { keysSliceImages, myLibraryPageKeys, previewModalOriginKeys } from 'store/common/keys';
import { OriginFetchImage, ArgsFetchImages, ArgsImageMutation } from 'store/types/typesImages';
import { StoreDispatch } from 'store';

const {
	ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL,
	ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD,
	ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES,
	ORIGIN_HOMEPAGE_TAB_DISCOVER,
	ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
	ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD,
	ORIGIN_PROJECT_DRAWER_HISTORY,
	ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
	ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT,
	ORIGIN_PROJECT_CONTAINER_GENERATION,
} = previewModalOriginKeys;

const { FAVORITES, DISCORD } = myLibraryPageKeys;
const { ALL_IMAGES, DISCORD_IMAGES, FAVORITE_ALL_IMAGES, FAVORITE_PROJECT_IMAGES } =
	keysSliceImages;

export const handleFetchImagesArgs = (args: ArgsFetchImages) => {
	const handleOrigin = (origin: OriginFetchImage) => {
		switch (origin) {
			case ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL:
			case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
			case ALL_IMAGES: // should come from myLibraryPageKeys
				// with or without query param "type=default" => all images
				return {
					// TODO_NEXT create keys for the Images API types
					type: 'default',
					sliceKey: ALL_IMAGES,
				};

			case ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD:
			case ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD:
			case DISCORD:
				return {
					type: 'discord',
					sliceKey: DISCORD_IMAGES,
				};

			case ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES:
			case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
			case FAVORITES:
				return {
					type: 'favorites',
					sliceKey: FAVORITE_ALL_IMAGES,
				};

			case ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT:
				return {
					type: 'favorites',
					sliceKey: FAVORITE_PROJECT_IMAGES,
				};

			default:
				return {
					type: '',
					sliceKey: '',
				};
		}
	};

	return {
		typeParam: args.origin ? `type=${handleOrigin(args.origin).type}` : '',
		pageParam: args.page ? `&page=${args.page}` : '',
		perPageParam: args.itemsPerPage ? `&limit=${args.itemsPerPage}` : '',
		searchParam: args.searchValue ? `&search=${args.searchValue}` : '',
		projectIdParam: args.projectId ? `&project_id=${args.projectId}` : '',
		sliceKey: args.origin ? handleOrigin(args.origin).sliceKey : '',
	};
};

/**
 * Removes an image from the store, after a successful delete request.
 *
 * Note: Images from ORIGIN_HOMEPAGE_TAB_DISCOVER cannot be deleted
 */
export const removeImageFromStore = (dispatch: StoreDispatch, args: ArgsImageMutation) => {
	const { imageId, imagePage, projectId, type, origin } = args;

	dispatch(removeImageFromModalData(imageId));
	dispatch(removeImageFromGenerationsHistory({ imageId, projectId, type }));

	switch (origin) {
		case ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL:
		case ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD:
		case ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES:
		case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
		case ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD:
		case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
		case ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT:
		case ORIGIN_PROJECT_CONTAINER_GENERATION:
			dispatch(removeImageFromSliceImages({ imageId, imagePage: +imagePage }));
			break;

		case ORIGIN_PROJECT_DRAWER_HISTORY:
			dispatch(removeImageFromSliceProjectImages({ imageId, imagePage }));
			break;

		default:
			break;
	}
};

/**
 * Toggles the image 'isFavorite' value across Store slices
 */
export const mutateIsImageFavoriteIntoStore = (
	dispatch: StoreDispatch,
	args: ArgsImageMutation,
) => {
	const { imageId, imagePage, projectId, type, origin } = args;

	dispatch(mutateIsFavoriteIntoModalData(imageId));
	dispatch(mutateIsFavoriteIntoGenerationsHistory({ imageId, projectId, type }));

	switch (origin) {
		case ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL:
		case ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD:
		case ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES:
		case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
		case ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD:
		case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
		case ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT:
		case ORIGIN_PROJECT_CONTAINER_GENERATION:
			dispatch(mutateIsFavoriteIntoSliceImages({ imageId, imagePage: +imagePage }));
			break;

		case ORIGIN_PROJECT_DRAWER_HISTORY:
			dispatch(mutateIsFavoriteIntoSliceProjectImages({ imageId, imagePage }));
			break;

		case ORIGIN_HOMEPAGE_TAB_DISCOVER:
			dispatch(mutateIsFavoriteIntoSliceDiscover({ imageId, imagePage: +imagePage }));
			break;

		default:
			break;
	}
};
