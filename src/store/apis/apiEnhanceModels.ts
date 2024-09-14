/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleFetchEnhanceModelsData from 'store/dataHandlers/handleFetchEnhanceModelsData';
import { ResponseEnhanceModels, EnhanceModels } from 'store/types/typesEnhanceModels';

import { setEnhanceModels } from 'store/storeSlices/sliceEnhanceModels';
import { baseQueryWithReAuth, origin, pathnameApiEnhanceModels } from './common';

export const apiEnhanceModels = createApi({
	reducerPath: 'apiEnhanceModels',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			fetchEnhanceModels: build.query<{ enhanceModels: EnhanceModels }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiEnhanceModels}`,
					};
				},

				transformResponse: (response: ResponseEnhanceModels) => {
					const enhanceModels = handleFetchEnhanceModelsData(response);

					return { enhanceModels };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setEnhanceModels(data.enhanceModels));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchEnhanceModels');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { useFetchEnhanceModelsQuery } = apiEnhanceModels;
