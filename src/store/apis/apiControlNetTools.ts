/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import { setControlNetTools } from 'store/storeSlices/sliceControlNet';

import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleFetchControlNetToolsData from 'store/dataHandlers/handleFetchControlNetToolsData';

import { ControlNetTools, ResponseControlNetTools } from 'store/types/typesControlNet';

import {
	baseQueryWithReAuth,
	invalidationTags,
	origin,
	pathnameApiControlNetTools,
} from './common';

const { clearFetchedControlNetTools } = invalidationTags;

export const apiControlNetTools = createApi({
	reducerPath: 'apiControlNetTools',
	baseQuery: baseQueryWithReAuth,

	tagTypes: [clearFetchedControlNetTools],

	endpoints(build) {
		return {
			fetchControlNetTools: build.query<ControlNetTools, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiControlNetTools}`,
					};
				},

				transformResponse: (response: ResponseControlNetTools) => {
					return handleFetchControlNetToolsData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						dispatch(setControlNetTools(data));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchControlNetTools');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { useFetchControlNetToolsQuery } = apiControlNetTools;
