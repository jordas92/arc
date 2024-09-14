/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import {
	setModels,
	addMetaModels,
	setNextMetaModelPage,
	setModelDetail,
} from 'store/storeSlices/sliceModels';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleFetchModelsData from 'store/dataHandlers/handleFetchModelsData';
import handleFetchModelMetaData from 'store/dataHandlers/handleFetchModelMetaData';
import {
	ResponseModels,
	Models,
	ResponseModelMeta,
	ModelMeta,
	ResponseModelItems,
	ResponseModelMetaItems,
} from 'store/types/typesModels';

import { baseQueryWithReAuth, origin, pathnameApiModels, keepUnusedDataFor } from './common';
import { handleFetchMoreMetaModelsData } from '../dataHandlers/handleFetchMoreMetaModelsData';

export const apiModels = createApi({
	reducerPath: 'apiModels',
	baseQuery: baseQueryWithReAuth,
	keepUnusedDataFor,

	endpoints(build) {
		return {
			fetchModels: build.query<{ models: Models }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiModels}`,
					};
				},

				transformResponse: (response: ResponseModels) => {
					const models = handleFetchModelsData(response);

					return { models };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setModels(data.models));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchModels');
					}
				},
			}),

			fetchMoreMetaModels: build.query<
				{ models: ResponseModelMetaItems },
				{ model: string; limit: number }
			>({
				query: (args) => {
					const { model, limit } = args;
					return {
						method: 'GET',
						url: `${origin}${pathnameApiModels}/images?model=${model}&limit=${limit}`,
					};
				},

				transformResponse: (response: ResponseModelItems) => {
					const models = handleFetchMoreMetaModelsData(response);

					return { models };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						dispatch(addMetaModels(data.models.data));
						dispatch(setNextMetaModelPage(data.models.currentFetchedPage));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchMoreMetaModels');
					}
				},
			}),

			// TODO_MIRO - verify usage
			getModelMeta: build.query<{ modelMeta: ModelMeta }, { modelKey: string }>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiModels}/${args.modelKey}`,
					};
				},

				transformResponse: (response: ResponseModelMeta) => {
					const modelMeta = handleFetchModelMetaData(response);

					return { modelMeta };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setModelDetail(data.modelMeta));
					} catch (error) {
						handleResponseError(dispatch, error, 'getModelMeta');
					}
				},
			}),

			fetchModelMeta: build.query<{ modelMeta: ModelMeta }, { modelKey: string }>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiModels}/${args.modelKey}`,
					};
				},

				transformResponse: (response: ResponseModelMeta) => {
					const modelMeta = handleFetchModelMetaData(response);

					return { modelMeta };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setModelDetail(data.modelMeta));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchModelMeta');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const {
	useFetchModelsQuery,
	useLazyFetchMoreMetaModelsQuery,
	useGetModelMetaQuery,
	useLazyFetchModelMetaQuery,
} = apiModels;
