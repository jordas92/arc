/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import {
	baseQueryWithReAuth,
	origin,
	pathnameApiDiscover,
	keepUnusedDataFor,
} from 'store/apis/common';
import handleFetchDiscoverData from 'store/dataHandlers/handleFetchDiscoverData';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import { addPageItemsToStore, removePageItemsFromStore } from 'store/storeSlices/sliceDiscover';
import { DiscoverImagesItems } from 'store/types/typesDiscover';

type QueryArgs = {
	page: number;
	itemsPerPage: number;
	searchValue: string;
};

const handleQueryArgs = (args: QueryArgs) => {
	return {
		pageParam: args.page ? `page=${args.page}` : '',
		perPageParam: args.itemsPerPage ? `&limit=${args.itemsPerPage}` : '',
		searchParam: args.searchValue ? `&search=${args.searchValue}` : '',
	};
};

export const apiDiscover = createApi({
	reducerPath: 'apiDiscover',
	baseQuery: baseQueryWithReAuth,
	keepUnusedDataFor,

	endpoints(build) {
		return {
			fetchDiscover: build.query<DiscoverImagesItems, QueryArgs>({
				query: (args) => {
					const { pageParam, perPageParam, searchParam } = handleQueryArgs(args);

					return {
						method: 'GET',
						url: `${origin}${pathnameApiDiscover}?${pageParam}${perPageParam}${searchParam}`,
					};
				},

				transformResponse: (response, meta, args) => {
					return handleFetchDiscoverData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(addPageItemsToStore(data));
					} catch (error) {
						handleResponseError(dispatch, error, `fetchDiscover`);
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
export const { useFetchDiscoverQuery, useLazyFetchDiscoverQuery } = apiDiscover;
