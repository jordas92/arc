/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import {
	addImagesToGenerationHistoryItem,
	setIsGeneratingToGenerationHistoryItem,
} from 'store/storeSlices/sliceOpenedProjects';
import {
	handleFetchPromptData,
	handleFetchPromptImagesData,
	handleFetchPromptDetails,
} from 'store/dataHandlers/handleFetchPromptsData';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import { GenerationData } from 'store/types/typesCommon';
import { PromptImages } from 'store/types/typesPrompts';
import { generationToolsKeys } from 'store/common/keys';
import {
	baseQueryWithReAuth,
	origin,
	pathnameApiPrompts,
	keepUnusedDataFor,
} from 'store/apis/common';

type ArgsFetchPromptImages = {
	projectId: string;
	promptId: string;
	generationTool: keyof typeof generationToolsKeys;
};

type ArgsFetchPromptDetails = {
	prompt_id: string;
	user_id: number;
};

export const apiPrompts = createApi({
	reducerPath: 'apiPrompts',
	baseQuery: baseQueryWithReAuth,
	keepUnusedDataFor,

	endpoints(build) {
		return {
			fetchPrompt: build.query<GenerationData, string>({
				query: (promptId) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiPrompts}/${promptId}`,
					};
				},

				transformResponse: (response, meta, promptId) => {
					return handleFetchPromptData(response);
				},

				async onQueryStarted(promptId, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchPrompt');
					}
				},
			}),

			fetchPromptImages: build.query<PromptImages, ArgsFetchPromptImages>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiPrompts}/${args.promptId}/images`,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleFetchPromptImagesData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						const { projectId, promptId, generationTool } = args;

						dispatch(addImagesToGenerationHistoryItem(data));
						dispatch(
							setIsGeneratingToGenerationHistoryItem({
								projectId,
								generationTool,
								promptId,
								isGenerating: false,
							}),
						);
					} catch (error) {
						const { projectId, promptId, generationTool } = args;

						dispatch(
							setIsGeneratingToGenerationHistoryItem({
								projectId,
								generationTool,
								promptId,
								isGenerating: false,
							}),
						);
						handleResponseError(dispatch, error, 'fetchPromptImages');
					}
				},
			}),

			fetchPromptDetails: build.mutation<any, ArgsFetchPromptDetails>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiPrompts}/details`,
						body: args,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleFetchPromptDetails(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchPromptDetails');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const {
	useLazyFetchPromptQuery,
	useFetchPromptImagesQuery,
	useLazyFetchPromptImagesQuery,
	useFetchPromptDetailsMutation,
} = apiPrompts;
