/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import { setGeneratedImageAsSource } from 'store/storeSlices/sliceOpenedProjects';
import {
	addPageItemsToStore,
	removePageItemsFromStore,
	removeFavoriteFromSliceImages,
} from 'store/storeSlices/sliceImages';
import {
	handleFetchImagesArgs,
	removeImageFromStore,
	mutateIsImageFavoriteIntoStore,
} from 'store/apisUtils/utilsApiImages';

import handleResponseError from 'store/dataHandlers/handleResponseError';
import {
	handleFetchImagesData,
	handleFetchImageData,
	handleFetchPublicImageData,
} from 'store/dataHandlers/handleFetchImagesData';
import {
	ImageItems,
	GeneratedImageAsSource,
	ArgsImageMutation,
	ArgsFetchImages,
	ArgsUpdateIsFavorite,
} from 'store/types/typesImages';

import {
	baseQueryWithReAuth,
	invalidationTags,
	origin,
	pathnameApiImages,
	keepUnusedDataFor,
} from 'store/apis/common';

import { retrieveImageDimensions } from 'utils/imageUtils';

const { clearAllFetchedImages } = invalidationTags;

export const apiImages = createApi({
	reducerPath: 'apiImages',
	baseQuery: baseQueryWithReAuth,
	keepUnusedDataFor,
	tagTypes: [clearAllFetchedImages],

	endpoints(build) {
		return {
			fetchImages: build.query<ImageItems, ArgsFetchImages>({
				query: (args) => {
					const { typeParam, pageParam, perPageParam, searchParam, projectIdParam } =
						handleFetchImagesArgs(args);

					return {
						method: 'GET',
						url: `${origin}${pathnameApiImages}?${typeParam}${pageParam}${perPageParam}${searchParam}${projectIdParam}`,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleFetchImagesData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					const { sliceKey } = handleFetchImagesArgs(args);

					try {
						const { data } = await queryFulfilled;

						dispatch(addPageItemsToStore({ ...data, origin: sliceKey }));
					} catch (error) {
						handleResponseError(dispatch, error, `fetchImages - ${sliceKey}`);
					}
				},

				async onCacheEntryAdded(args, { dispatch, cacheDataLoaded }) {
					try {
						await cacheDataLoaded;
						const { sliceKey } = handleFetchImagesArgs(args);

						dispatch(removePageItemsFromStore({ key: args.page, origin: sliceKey }));
					} catch (error) {
						// TODO_NEXT do not care for now...
					}
				},

				providesTags: [clearAllFetchedImages],
			}),

			// eslint-disable-next-line prettier/prettier
			fetchImage: build.query<GeneratedImageAsSource, { imageId: string; generationTool: string }>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiImages}/${args.imageId}`,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleFetchImageData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						const { isImageNsfw, imageUrl: sourceImageUrl } = data;
						const sourceImageUrlDimensions =
							await retrieveImageDimensions(sourceImageUrl);

						dispatch(
							setGeneratedImageAsSource({
								sourceImageId: args.imageId,
								isImageNsfw,
								sourceImageUrl,
								sourceImageUrlDimensions,
								generationTool: args.generationTool,
							}),
						);
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchImage');
					}
				},
			}),

			deleteImage: build.mutation<any, ArgsImageMutation>({
				query: (args) => {
					return {
						method: 'DELETE',
						url: `${origin}${pathnameApiImages}/${args.imageId}`,
					};
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						// Does not care about the payload from a successful API response

						removeImageFromStore(dispatch, args);
					} catch (error) {
						handleResponseError(dispatch, error, 'deleteImage');
					}
				},
			}),

			updateIsImageFavorite: build.mutation<any, ArgsUpdateIsFavorite>({
				query: (args) => {
					return {
						method: 'PUT',
						url: `${origin}${pathnameApiImages}/${args.imageId}/favorites`,
						body: {
							id: args.imageId,
							favorite: args.isFavorite,
						},
					};
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// Mutating the Store slices before the API response to provide a smooth user experience
					// An optimistic update
					mutateIsImageFavoriteIntoStore(dispatch, args);

					try {
						await queryFulfilled;
						// Does not care about the payload from a successful API response

						if (!args.isFavorite) {
							dispatch(removeFavoriteFromSliceImages({ imagePage: +args.imagePage }));
						}
					} catch (error) {
						// Mutating the Store slices - reverts the previous image 'isFavorite' state
						mutateIsImageFavoriteIntoStore(dispatch, args);
						handleResponseError(dispatch, error, 'updateIsImageFavorite');
					}
				},
			}),

			fetchPublicImage: build.query<string, { promptId: string }>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiImages}/public?promptID=${args.promptId}`,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleFetchPublicImageData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchImage');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const {
	useFetchImagesQuery,
	useLazyFetchImagesQuery,
	useFetchImageQuery,
	useDeleteImageMutation,
	useUpdateIsImageFavoriteMutation,
	useFetchPublicImageQuery,
	useLazyFetchPublicImageQuery,
} = apiImages;
