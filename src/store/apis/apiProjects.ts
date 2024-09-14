/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import {
	addProjectsToList,
	removeProjectFromList,
	setNextPageValue,
} from 'store/storeSlices/sliceProjects';
import {
	updateCurrentProjectTitle,
	addGenerationHistoryItem,
	setGenerationDataToProject,
	setOpenedProject,
} from 'store/storeSlices/sliceOpenedProjects';
import {
	addPageItemsToStore,
	removePageItemsFromStore,
} from 'store/storeSlices/sliceProjectImages';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import {
	handleFetchProjectsData,
	handleFetchProjectData,
} from 'store/dataHandlers/handleFetchProjectsData';
import handleCreateProjectData from 'store/dataHandlers/handleCreateProjectData';
import { handleFetchImagesData } from 'store/dataHandlers/handleFetchImagesData';
import { handleFetchPromptsData } from 'store/dataHandlers/handleFetchPromptsData';
import strings from 'store/common/strings';
import { generationTypes } from 'store/common/keys';
import { Projects, ProjectOpenedInit } from 'store/types/typesProjects';
import { ImageItems } from 'store/types/typesImages';
import { GenerationData } from 'store/types/typesCommon';

import { retrieveImageDimensions } from 'utils/imageUtils';
import {
	baseQueryWithReAuth,
	invalidationTags,
	origin,
	pathnameApiProjects,
	keepUnusedDataFor,
} from './common';

type ArgsFetchProjectImages = {
	page: number;
	itemsPerPage: number;
	searchValue: string;
	projectId: string;
};

type generationTypesKeys = keyof typeof generationTypes;
type ArgFetchPrompts = {
	projectId: string;
	generationType: (typeof generationTypes)[generationTypesKeys];
};

const { TRANSFORM, UPSCALE, INPAINT } = generationTypes;
const { initialProjectTitle } = strings;
const { clearFetchedProjects, clearFetchedMoreProjects, clearAllFetchedImages } = invalidationTags;

const handleQueryArgs = (args: ArgsFetchProjectImages) => {
	return {
		projectId: args.projectId || '',
		pageParam: args.page ? `page=${args.page}` : '',
		perPageParam: args.itemsPerPage ? `&limit=${args.itemsPerPage}` : '',
		searchParam: args.searchValue ? `&search=${args.searchValue}` : '',
	};
};

const handleFetchProjectPromptsParams = (args: ArgFetchPrompts) => {
	const transformTypes = [TRANSFORM, UPSCALE, INPAINT];
	const { generationType } = args;

	if (transformTypes.find((type) => type === generationType)) {
		return `?type=${TRANSFORM},${UPSCALE},${INPAINT}`;
	}
	return `/${generationType}`;
};

export const apiProjects = createApi({
	reducerPath: 'apiProjects',
	baseQuery: baseQueryWithReAuth,
	keepUnusedDataFor,

	tagTypes: [clearFetchedProjects, clearFetchedMoreProjects, clearAllFetchedImages],

	endpoints(build) {
		return {
			// Currently set to 15 items (by default) by the BE
			// TODO_NEXT - Pagination props are available and infinite scroll can be implemented!
			fetchProjects: build.query<{ projects: Projects }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiProjects}`,
					};
				},

				transformResponse: (response) => {
					const projects = handleFetchProjectsData(response);

					return { projects };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(addProjectsToList(data.projects.items));
						dispatch(setNextPageValue(data.projects.nextPage));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchProjects');
					}
				},

				providesTags: [clearFetchedProjects],
			}),

			fetchMoreProjects: build.query<{ projects: Projects }, string>({
				query: (page) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiProjects}?page=${page}`,
					};
				},

				transformResponse: (response) => {
					const projects = handleFetchProjectsData(response);

					return { projects };
				},

				async onQueryStarted(page, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						dispatch(addProjectsToList(data.projects.items));
						dispatch(setNextPageValue(data.projects.nextPage));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchMoreProjects');
					}
				},

				providesTags: [clearFetchedMoreProjects],
			}),

			fetchProject: build.query<ProjectOpenedInit, string>({
				query: (projectId) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiProjects}/${projectId}`,
					};
				},

				transformResponse: (response) => {
					return handleFetchProjectData(response);
				},

				async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						const { projectId, projectTitle, isDiscord, currentGenerationTool } = data;

						dispatch(
							setOpenedProject({
								projectId,
								projectTitle,
								isDiscord,
								currentGenerationTool,
							}),
						);
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchProject');
					}
				},

				providesTags: [clearFetchedProjects],
			}),

			createProject: build.mutation<string, void>({
				query: () => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiProjects}`,
						body: { title: initialProjectTitle },
					};
				},

				transformResponse: (response) => {
					return handleCreateProjectData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'createProject');
					}
				},

				// Clearing the cache to fetch the projects again when the Page is visited
				// so the new project will present
				invalidatesTags: [clearFetchedProjects, clearFetchedMoreProjects],
			}),

			updateProject: build.mutation<any, { projectId: string; newProjectTitle: string }>({
				query: (args) => {
					return {
						method: 'PUT',
						url: `${origin}${pathnameApiProjects}/${args.projectId}`,
						body: { title: args.newProjectTitle },
					};
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(updateCurrentProjectTitle(args.newProjectTitle));
					} catch (error) {
						handleResponseError(dispatch, error, 'updateProject');
					}
				},

				invalidatesTags: (result, error, args) => {
					if (error) {
						// Will not clear any cache
						return [];
					}
					// Will clear the cache for these tags
					// in order to fetch fresh data when the projects-all page is visited again
					return [clearFetchedProjects, clearFetchedMoreProjects];
				},
			}),

			deleteProject: build.mutation<any, string>({
				query: (projectId) => {
					return {
						method: 'DELETE',
						url: `${origin}${pathnameApiProjects}/${projectId}`,
					};
				},

				async onQueryStarted(projectId, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;

						dispatch(removeProjectFromList(projectId));
					} catch (error) {
						handleResponseError(dispatch, error, 'deleteProject');
					}
				},
			}),

			fetchProjectImages: build.query<ImageItems, ArgsFetchProjectImages>({
				query: (args) => {
					const { projectId, pageParam, perPageParam, searchParam } =
						handleQueryArgs(args);

					return {
						method: 'GET',
						url: `${origin}${pathnameApiProjects}/${projectId}/images?${pageParam}${perPageParam}${searchParam}`,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleFetchImagesData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(addPageItemsToStore(data));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchProjectImages');
					}
				},

				async onCacheEntryAdded(args, { dispatch, cacheDataLoaded }) {
					try {
						await cacheDataLoaded;

						dispatch(removePageItemsFromStore(args.page));
					} catch (error) {
						// TODO_NEXT do not care for now...
					}
				},
			}),

			fetchProjectPrompts: build.query<GenerationData, ArgFetchPrompts>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiProjects}/${args.projectId}/prompts${handleFetchProjectPromptsParams(args)}`,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleFetchPromptsData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(addGenerationHistoryItem(data));

						const { sourceImageUrl } = data;
						const sourceImageDimensions = await retrieveImageDimensions(sourceImageUrl);

						dispatch(setGenerationDataToProject({ data, sourceImageDimensions }));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchProjectPrompts');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const {
	useFetchProjectsQuery,
	useLazyFetchMoreProjectsQuery,
	useFetchProjectQuery,
	useCreateProjectMutation,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
	useFetchProjectImagesQuery,
	useLazyFetchProjectImagesQuery,
	useFetchProjectPromptsQuery,
} = apiProjects;
