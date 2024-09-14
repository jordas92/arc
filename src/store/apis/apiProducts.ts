/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import {
	handleFetchProductsData,
	handleFetchCheckoutData,
} from 'store/dataHandlers/handleFetchProductsData';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import { Products } from 'store/types/typesProducts';

import { baseQueryWithReAuth, origin, pathnameApiProducts } from './common';

export const apiProducts = createApi({
	reducerPath: 'apiProducts',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			fetchProducts: build.query<{ products: Products }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiProducts}`,
					};
				},

				transformResponse: (response) => {
					const products = handleFetchProductsData(response);

					return { products };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchProducts');
					}
				},
			}),

			createCheckout: build.mutation<any, { id: number }>({
				query: (args) => {
					const { id } = args;

					return {
						method: 'POST',
						url: `${origin}${pathnameApiProducts}/${id}`,
					};
				},

				transformResponse: (response) => {
					return handleFetchCheckoutData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'createCheckout');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { useFetchProductsQuery, useCreateCheckoutMutation } = apiProducts;
