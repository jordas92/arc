/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import { addPageItemsToStore, removePageItemsFromStore } from 'store/storeSlices/sliceTutorials';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleFetchTurotialsData from 'store/dataHandlers/handleFetchTutorialsData';

import { ResponseFetchTutorials, Tutorials } from 'store/types/typesTutorials';
import { baseQueryWithReAuth, origin, pathnameApiTutorials, keepUnusedDataFor } from './common';

type ArgsFetchTutorials = {
	page: number;
	itemsPerPage: number;
	searchValue: string;
	isNsfw?: boolean;
};

const handleQueryArgs = (args: ArgsFetchTutorials) => {
	return {
		pageParam: args.page ? `&page=${args.page}` : '',
		perPageParam: args.itemsPerPage ? `&limit=${args.itemsPerPage}` : '',
		searchParam: args.searchValue ? `&search=${args.searchValue}` : '',
		nsfw: args.isNsfw ? `&nsfw=${args.isNsfw}` : '',
	};
};

export const apiTutorials = createApi({
	reducerPath: 'apiTutorials',
	baseQuery: baseQueryWithReAuth,
	keepUnusedDataFor,

	endpoints(build) {
		return {
			fetchTutorials: build.query<Tutorials, ArgsFetchTutorials>({
				query: (args) => {
					const { pageParam, perPageParam, searchParam, nsfw } = handleQueryArgs(args);

					return {
						method: 'GET',
						url: `${origin}${pathnameApiTutorials}?${pageParam}${perPageParam}${searchParam}${nsfw}`,
					};
				},

				transformResponse: (response: ResponseFetchTutorials) => {
					return handleFetchTurotialsData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(addPageItemsToStore(data));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchTutorials');
					}
				},

				async onCacheEntryAdded(args, { dispatch, cacheDataLoaded }) {
					try {
						await cacheDataLoaded;

						dispatch(removePageItemsFromStore({ key: args.page }));
					} catch (error) {
						// TODO_NEXT do not care for now...
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { useFetchTutorialsQuery, useLazyFetchTutorialsQuery } = apiTutorials;
