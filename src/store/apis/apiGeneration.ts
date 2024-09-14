/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import handleGenerateData from 'store/dataHandlers/handleGenerateData';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import {
	setIsRequestingGeneration,
	setInitialGenerationHistoryItem,
	setActiveImageIndex,
} from 'store/storeSlices/sliceOpenedProjects';
import {
	RequestGenerationConjure,
	RequestGenerationTransform,
	RequestGenerationInPaint,
	RequestGenerationUpscale,
	RequestGenerationEnhance,
	MetaIsRequestingGeneration,
} from 'store/types/typesGeneration';
import { apiUserWallets } from 'store';
import { baseQueryWithReAuth, origin, pathnameApiGenerate } from './common';

export const apiGeneration = createApi({
	reducerPath: 'apiGeneration',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			// eslint-disable-next-line prettier/prettier, max-len
			generateTextToImage: build.mutation<{ promptId: string }, { body: RequestGenerationConjure; meta: MetaIsRequestingGeneration }>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiGenerate}/conjure`,
						body: args.body,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleGenerateData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// TODO_NEXT consider to move this action to the 'generate' buttons
					dispatch(setActiveImageIndex(0));

					try {
						const { data } = await queryFulfilled;
						const { projectId, generationTool } = args.meta;

						dispatch(
							setInitialGenerationHistoryItem({
								projectId,
								generationTool,
								promptId: data.promptId,
							}),
						);
						dispatch(apiUserWallets.util.resetApiState());
					} catch (error) {
						dispatch(setIsRequestingGeneration(args.meta));
						handleResponseError(dispatch, error, 'generateTextToImage');
					}
				},
			}),

			// eslint-disable-next-line prettier/prettier, max-len
			generateImageToImage: build.mutation<{ promptId: string }, { body: RequestGenerationTransform; meta: MetaIsRequestingGeneration }>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiGenerate}/transform`,
						body: args.body,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleGenerateData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// TODO_NEXT consider to move this action to the 'generate' buttons
					dispatch(setActiveImageIndex(0));

					try {
						const { data } = await queryFulfilled;
						const { projectId, generationTool } = args.meta;

						dispatch(
							setInitialGenerationHistoryItem({
								projectId,
								generationTool,
								promptId: data.promptId,
							}),
						);
						dispatch(apiUserWallets.util.resetApiState());
					} catch (error) {
						dispatch(setIsRequestingGeneration(args.meta));
						handleResponseError(dispatch, error, 'generateImageToImage');
					}
				},
			}),

			// eslint-disable-next-line prettier/prettier
			generateInPaint: build.mutation<{ promptId: string }, { body: RequestGenerationInPaint; meta: MetaIsRequestingGeneration }>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiGenerate}/inpaint`,
						body: args.body,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleGenerateData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// TODO_NEXT consider to move this action to the 'generate' buttons
					dispatch(setActiveImageIndex(0));

					try {
						const { data } = await queryFulfilled;
						const { projectId, generationTool } = args.meta;

						dispatch(
							setInitialGenerationHistoryItem({
								projectId,
								generationTool,
								promptId: data.promptId,
							}),
						);
						dispatch(apiUserWallets.util.resetApiState());
					} catch (error) {
						dispatch(setIsRequestingGeneration(args.meta));
						handleResponseError(dispatch, error, 'generateInPaint');
					}
				},
			}),

			// eslint-disable-next-line prettier/prettier
			generateUpscale: build.mutation<{ promptId: string }, { body: RequestGenerationUpscale; meta: MetaIsRequestingGeneration }>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiGenerate}/upscale`,
						body: args.body,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleGenerateData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// TODO_NEXT consider to move this action to the 'generate' buttons
					dispatch(setActiveImageIndex(0));

					try {
						const { data } = await queryFulfilled;
						const { projectId, generationTool } = args.meta;

						dispatch(
							setInitialGenerationHistoryItem({
								projectId,
								generationTool,
								promptId: data.promptId,
							}),
						);
						dispatch(apiUserWallets.util.resetApiState());
					} catch (error) {
						dispatch(setIsRequestingGeneration(args.meta));
						handleResponseError(dispatch, error, 'generateUpscale');
					}
				},
			}),

			// eslint-disable-next-line prettier/prettier
			generateEnhance: build.mutation<{ promptId: string }, { body: RequestGenerationEnhance; meta: MetaIsRequestingGeneration }>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiGenerate}/enhance`,
						body: args.body,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleGenerateData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// TODO_NEXT consider to move this action to the 'generate' buttons
					dispatch(setActiveImageIndex(0));

					try {
						const { data } = await queryFulfilled;
						const { projectId, generationTool } = args.meta;

						dispatch(
							setInitialGenerationHistoryItem({
								projectId,
								generationTool,
								promptId: data.promptId,
							}),
						);
						dispatch(apiUserWallets.util.resetApiState());
					} catch (error) {
						dispatch(setIsRequestingGeneration(args.meta));
						handleResponseError(dispatch, error, 'generateEnhance');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const {
	useGenerateTextToImageMutation,
	useGenerateImageToImageMutation,
	useGenerateInPaintMutation,
	useGenerateUpscaleMutation,
	useGenerateEnhanceMutation,
} = apiGeneration;
