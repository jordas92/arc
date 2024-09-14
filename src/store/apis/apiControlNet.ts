/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import handlePreProcessImageData from 'store/dataHandlers/handlePreProcessImageData';
import { RequestPreProcessImage } from 'store/types/typesPreProcessImage';
import { baseQueryWithReAuth, origin, pathnameApiControlNet } from './common';
import handleResponseError from '../dataHandlers/handleResponseError';

export const apiControlNet = createApi({
	reducerPath: 'apiControlNet',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			preProcessImage: build.mutation<string, RequestPreProcessImage>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiControlNet}/preprocess`,
						body: args,
					};
				},

				transformResponse: (response) => {
					return handlePreProcessImageData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'preProcessImage');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { usePreProcessImageMutation } = apiControlNet;
