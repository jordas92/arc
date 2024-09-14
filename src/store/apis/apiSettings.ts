/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import { setAspectRatios } from 'store/storeSlices/sliceAspectRatios';
import { handleFetchAspectRatiosData } from 'store/dataHandlers/handleFetchSettingsData';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import { AspectRatios } from 'store/types/typesAspectRatios';

import { baseQueryWithReAuth, origin, pathnameApiSettings } from './common';

export const apiSettings = createApi({
	reducerPath: 'apiSettings',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			fetchAspectRatios: build.query<AspectRatios, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiSettings}/aspect-ratios`,
					};
				},

				transformResponse: (response: any) => {
					return handleFetchAspectRatiosData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setAspectRatios(data));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchAspectRatios');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { useFetchAspectRatiosQuery } = apiSettings;
