/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleFetchStylesData from 'store/dataHandlers/handleFetchStylesData';
import { setStyles } from 'store/storeSlices/sliceStyles';
import { ResponseStyles, Styles } from 'store/types/typesStyles';

import { baseQueryWithReAuth, origin, pathnameApiStyles } from './common';

export const apiStyles = createApi({
	reducerPath: 'apiStyles',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			fetchStyles: build.query<{ styles: Styles }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiStyles}`,
					};
				},

				transformResponse: (response: ResponseStyles) => {
					const styles = handleFetchStylesData(response);

					return { styles };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setStyles(data.styles));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchStyles');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { useFetchStylesQuery } = apiStyles;
