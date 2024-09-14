/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleFetchSamplersData from 'store/dataHandlers/handleFetchSamplersData';
import { setSamplers } from 'store/storeSlices/sliceSamplers';
import { ResponseSamplers, Samplers } from 'store/types/typesSamplers';

import { baseQueryWithReAuth, origin, pathnameApiSamplers } from './common';

export const apiSamplers = createApi({
	reducerPath: 'apiSamplers',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			fetchSamplers: build.query<{ samplers: Samplers }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiSamplers}`,
					};
				},

				transformResponse: (response: ResponseSamplers) => {
					const samplers = handleFetchSamplersData(response);

					return { samplers };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setSamplers(data.samplers));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchSamplers');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { useFetchSamplersQuery } = apiSamplers;
