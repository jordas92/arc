/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReAuth, invalidationTags, origin, pathnameApiSavedPrompts } from './common';
import handleFetchSavedPromptsData from '../dataHandlers/handleFetchSavedPromptsData';
import handleFetchUpdatedSavedPromptsData from '../dataHandlers/handleFetchUpdatedSavedPromptsData';
import handleResponseError from '../dataHandlers/handleResponseError';
import { notificationSeverity } from '../common/keys';
import strings from '../common/strings';
import {
	removeSavedPrompt,
	resetSavedPromptsSlice,
	setSavedPrompts,
	updateSavedPrompts,
} from '../storeSlices/sliceSavedPrompts';
import { setIsOverlayLoaderOn } from '../storeSlices/sliceApp';
import { showNotification } from '../storeSlices/sliceNotification';

import { ResponseUpdatedSavedPrompt, SavedPrompts } from '../types/typesSavedPrompts';

const { success } = notificationSeverity;
const { clearFetchedSavedPrompts, clearFetchedMoreSavedPrompts } = invalidationTags;
const { savedPromptRenamed, savedPromptDeleted } = strings;

export const apiSavedPrompts = createApi({
	reducerPath: 'apiSavedPrompts',
	baseQuery: baseQueryWithReAuth,

	tagTypes: [clearFetchedSavedPrompts, clearFetchedMoreSavedPrompts],

	endpoints(build) {
		return {
			fetchSavedPrompts: build.query<{ savedPrompts: SavedPrompts }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiSavedPrompts}`,
					};
				},

				transformResponse: (response) => {
					const savedPrompts = handleFetchSavedPromptsData(response);

					return { savedPrompts };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setSavedPrompts(data.savedPrompts));
						dispatch(setIsOverlayLoaderOn(false));
					} catch (error) {
						dispatch(setIsOverlayLoaderOn(false));
						handleResponseError(dispatch, error, 'fetchSavedPrompts');
					}
				},

				providesTags: [clearFetchedSavedPrompts],
			}),

			fetchMoreSavedPrompts: build.query<{ savedPrompts: SavedPrompts }, string>({
				query: (page: string) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiSavedPrompts}?page=${page}`,
					};
				},

				transformResponse: (response) => {
					const savedPrompts = handleFetchSavedPromptsData(response);

					return { savedPrompts };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setSavedPrompts(data.savedPrompts));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchMoreSavedPrompts');
					}
				},

				providesTags: [clearFetchedMoreSavedPrompts],
			}),

			savePrompt: build.mutation<any, { title: string; prompt: string }>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiSavedPrompts}`,
						body: args,
					};
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					dispatch(setIsOverlayLoaderOn(true));

					try {
						await queryFulfilled;
						dispatch(setIsOverlayLoaderOn(false));
						dispatch(resetSavedPromptsSlice());
					} catch (error) {
						dispatch(setIsOverlayLoaderOn(false));
						handleResponseError(dispatch, error, 'savePrompt');
					}
				},

				invalidatesTags: (result, error, args) => {
					if (error) {
						// Will not clear any cache
						return [];
					}

					// Clearing the cache for these tags in order to fetch the saved prompts again
					// so the new saved prompt will present in the list
					return [clearFetchedSavedPrompts, clearFetchedMoreSavedPrompts];
				},
			}),

			updateSavedPrompt: build.mutation<any, { id: string; title: string; prompt: string }>({
				query: (args) => {
					const { id, title, prompt } = args;

					return {
						method: 'PUT',
						url: `${origin}${pathnameApiSavedPrompts}/${id}`,
						body: { title, prompt },
					};
				},

				transformResponse: (response: ResponseUpdatedSavedPrompt) => {
					return handleFetchUpdatedSavedPromptsData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					dispatch(setIsOverlayLoaderOn(true));

					try {
						const { data } = await queryFulfilled;

						if (data) {
							dispatch(setIsOverlayLoaderOn(false));
							dispatch(updateSavedPrompts(data));
							dispatch(
								showNotification({
									message: savedPromptRenamed,
									severity: success,
								}),
							);
						}
					} catch (error) {
						dispatch(setIsOverlayLoaderOn(false));
						handleResponseError(dispatch, error, 'updateSavedPrompt');
					}
				},
			}),

			deleteSavedPrompt: build.mutation<any, string>({
				query: (id) => {
					return {
						method: 'DELETE',
						url: `${origin}${pathnameApiSavedPrompts}/${id}`,
					};
				},

				async onQueryStarted(promptId, { dispatch, queryFulfilled }) {
					dispatch(setIsOverlayLoaderOn(true));

					try {
						await queryFulfilled;
						dispatch(setIsOverlayLoaderOn(false));
						dispatch(removeSavedPrompt(promptId));
						dispatch(
							showNotification({
								message: savedPromptDeleted,
								severity: success,
							}),
						);
					} catch (error) {
						dispatch(setIsOverlayLoaderOn(false));
						handleResponseError(dispatch, error, 'deleteSavedPrompt');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const {
	useFetchSavedPromptsQuery,
	useLazyFetchMoreSavedPromptsQuery,
	useSavePromptMutation,
	useUpdateSavedPromptMutation,
	useDeleteSavedPromptMutation,
} = apiSavedPrompts;
