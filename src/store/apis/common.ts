/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { getApiOrigin } from 'utils/commonUtils';
import { apiAuthentication, StoreState } from '../index';

export const origin = getApiOrigin();

export const timeout = 15000; // milliseconds (15sec)

// Will invalidate the cache subscriptions after the provided value
export const keepUnusedDataFor = 0.5; // seconds

// APIs' pathnames
export const pathnameApiAuthentication = '/auth';
export const pathnameApiUser = '/v1/user';
export const pathnameApiUserWallets = '/v1/wallets';
export const pathnameApiProjects = '/v1/projects';
export const pathnameApiModels = '/v1/models';
export const pathnameApiImages = '/v1/images';
export const pathnameApiStyles = '/v1/styles';
export const pathnameApiSavedPrompts = '/v1/libraries';
export const pathnameApiGenerate = '/v1/arcana';
export const pathnameApiSamplers = '/v1/samplers';
export const pathnameApiProducts = '/v1/products';
export const pathnameApiEnhanceModels = '/v1/enhances';
export const pathnameApiPrompts = '/v1/prompts';
export const pathnameApiAnnouncements = '/v1/announcements';
export const pathnameApiTutorials = '/v1/tutorials';
export const pathnameApiSettings = '/v1/settings';
export const pathnameApiDiscover = '/v1/discover';
export const pathnameApiDiscord = '/user/discord';

// TODO_Controlnet_JULIA BE - is this the correct endpoint?
export const pathnameApiControlNetTools = '/v1/tools';
export const pathnameApiControlNet = '/v1/controlnet';

export const prepareHeaders = (headers, { getState }) => {
	const { jwt } = getState().sliceAuthentication;

	if (jwt) {
		headers.set('Authorization', `Bearer ${jwt}`);
	}

	headers.set('Access-Control-Allow-Origin', `${origin}`);
	headers.set('Accept', 'application/json');
	headers.set('X-Content-Type-Options', 'nosniff');

	return headers;
};

export const cacheKeys = {
	sharedSignUpMutation: 'sharedSignUpMutation',
};

export const invalidationTags = {
	clearFetchedProjects: 'clear fetched Projects cache',
	clearFetchedMoreProjects: 'clear fetched More Projects cache',
	clearFetchedSavedPrompts: 'clear fetched Saved Prompts cache',
	clearFetchedMoreSavedPrompts: 'clear fetched More Saved Prompts cache',
	clearAllFetchedImages: 'clear all fetched Images cache',
	// TODO_Controlnet_JULIA - verify whether its needed
	clearFetchedControlNetTools: 'clear fetched ControlNet tools cache',
};

// -------------------------------

// REFRESH_AUTHENTICATION - currently disabled and not supported by the BE

// Creates a new mutex instance
const mutex = new Mutex();

/**
 * Automatic re-authorization by extending fetchBaseQuery and
 * preventing multiple unauthorized errors using 'async-mutex'
 * https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
 */
export const baseQueryWithReAuth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	// Wait until the mutex is available without locking it.
	await mutex.waitForUnlock();

	const baseQuery = fetchBaseQuery({ baseUrl: '/', prepareHeaders, timeout });

	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401 && api.endpoint !== 'refreshToken') {
		// Checking whether the mutex is locked.
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();

			try {
				const promise = api.dispatch(apiAuthentication.endpoints.refreshToken.initiate());
				const refreshTokenResponse = await promise;

				const { data } = refreshTokenResponse as { data: Object };
				const { error } = refreshTokenResponse as { error: Object };

				if (data) {
					// Retry the initial query.
					result = await baseQuery(args, api, extraOptions);
				}

				if (error) {
					// Log out the user.
					const { sliceAuthentication } = api.getState() as StoreState;

					api.dispatch(
						apiAuthentication.endpoints.logout.initiate(sliceAuthentication.jwt),
					);
				}
			} finally {
				// Release must be called once the mutex should be released again.
				release();
			}
		} else {
			// Wait until the mutex is available without locking it.
			await mutex.waitForUnlock();

			result = await baseQuery(args, api, extraOptions);
		}
	}

	if (result.error && api.endpoint === 'refreshToken') {
		// Log out the user.
		const { sliceAuthentication } = api.getState() as StoreState;

		api.dispatch(apiAuthentication.endpoints.logout.initiate(sliceAuthentication.jwt));
	}

	return result;
};

// Cannot access 'baseQueryWithReAuth' before initialization
// https://github.com/reduxjs/redux-toolkit/issues/2153

// REFRESH_AUTHENTICATION - end
