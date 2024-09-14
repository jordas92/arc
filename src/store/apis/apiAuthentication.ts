/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleSignInData from 'store/dataHandlers/handleSignInData';
import { resetNotificationSlice, showNotification } from 'store/storeSlices/sliceNotification';
import {
	resetAuthenticationSlice,
	setIsEmailVerified,
	setIsUserAuthenticated,
	setToken,
} from 'store/storeSlices/sliceAuthentication';
import { setAuthUserData, resetUserSlice } from 'store/storeSlices/sliceUser';
import { resetAppSlice, openModal } from 'store/storeSlices/sliceApp';
import { resetImagesSlice } from 'store/storeSlices/sliceImages';
import { resetOpenedProjectsSlice } from 'store/storeSlices/sliceOpenedProjects';
import { resetProjectImagesSlice } from 'store/storeSlices/sliceProjectImages';
import { resetProjectsSlice } from 'store/storeSlices/sliceProjects';
import { resetSavedPromptsSlice } from 'store/storeSlices/sliceSavedPrompts';
import { resetTutorialsSlice } from 'store/storeSlices/sliceTutorials';
import { SingInData, AuthUser } from 'store/types/typesAuthentication';
import { apiProjects, apiUserWallets } from 'store';
import { modalsKeys, announcementsKeys } from 'store/common/keys';
import handleFetchUserData from 'store/dataHandlers/handleFetchUserData';
import { origin, pathnameApiAuthentication } from './common';

const { ANNOUNCEMENTS } = modalsKeys;
const { GENERAL } = announcementsKeys;

type ArgsSignIn = {
	email: string;
	password: string;
	remember: boolean;
};

const timeout = 15000; // milliseconds (15sec)
const prepareHeaders = (headers, { getState }) => {
	const { jwt } = getState().sliceAuthentication;

	if (jwt) {
		headers.set('Authorization', `Bearer ${jwt}`);
	}

	headers.set('Access-Control-Allow-Origin', `${origin}`);
	headers.set('Accept', 'application/json');
	headers.set('X-Content-Type-Options', 'nosniff');

	return headers;
};

export const apiAuthentication = createApi({
	reducerPath: 'apiAuthentication',
	baseQuery: fetchBaseQuery({
		baseUrl: `${origin}`,
		timeout,
		prepareHeaders,
	}),

	endpoints(build) {
		return {
			signUp: build.mutation({
				query: (args) => {
					return {
						method: 'POST',
						url: `${pathnameApiAuthentication}/register`,
						body: args,
					};
				},
				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;

						dispatch(resetNotificationSlice());
						dispatch(
							showNotification({
								message: 'Successfully signed up!',
								severity: 'success',
							}),
						);
					} catch (error) {
						handleResponseError(dispatch, error, 'signUp');
					}
				},
			}),

			signIn: build.mutation<{ data: SingInData }, ArgsSignIn>({
				query: (args: ArgsSignIn) => {
					return {
						method: 'POST',
						url: `${pathnameApiAuthentication}/login`,
						body: args,
					};
				},

				transformResponse: (response) => {
					const data = handleSignInData(response);

					return { data };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(resetAppSlice());
						dispatch(resetImagesSlice());
						dispatch(resetNotificationSlice());
						dispatch(resetOpenedProjectsSlice());
						dispatch(resetProjectImagesSlice());
						dispatch(resetProjectsSlice());
						dispatch(resetTutorialsSlice());
						dispatch(apiProjects.util.resetApiState());

						dispatch(setIsUserAuthenticated(true));
						dispatch(setToken(data.data.jwt));

						dispatch(openModal({ type: ANNOUNCEMENTS, data: { type: GENERAL } }));
					} catch (error) {
						handleResponseError(dispatch, error, 'signIn');
					}
				},
			}),

			fetchAuthUser: build.query<{ user: AuthUser }, { data: SingInData } | any>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${pathnameApiAuthentication}/user`,
						headers: {
							// The token comes directly from the SIGN_IN response
							authorization: `Bearer ${args.data.jwt}`,
						},
					};
				},

				transformResponse: (response) => {
					const user = handleFetchUserData(response);

					return { user };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setAuthUserData(data.user));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchAuthUser');
					}
				},
			}),

			logout: build.mutation<any, string>({
				query: (jwt) => {
					return {
						method: 'POST',
						url: `${pathnameApiAuthentication}/logout`,
						body: {},
						headers: {
							// The token comes from the Authentication slice
							authorization: `Bearer ${jwt}`,
						},
					};
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// Will clear the store and redirect the user to the SignIn page.
					// Does not care if the 'logout' request will succeed or fail.

					// TODO_NEXT use extrareducers to reset all with one dispatch!
					// https://redux-toolkit.js.org/api/createSlice#extrareducers
					dispatch(resetAppSlice());
					dispatch(resetAuthenticationSlice());
					dispatch(resetImagesSlice());
					dispatch(resetNotificationSlice());
					dispatch(resetOpenedProjectsSlice());
					dispatch(resetProjectImagesSlice());
					dispatch(resetProjectsSlice());
					dispatch(resetSavedPromptsSlice());
					dispatch(resetUserSlice());
					dispatch(resetTutorialsSlice());
					dispatch(apiProjects.util.resetApiState());
					dispatch(apiUserWallets.util.resetApiState());

					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'logout');
					}
				},
			}),

			resetPassword: build.mutation({
				query: (args: {
					token: string;
					email: string;
					password: string;
					password_confirmation: string;
				}) => {
					return {
						method: 'POST',
						url: `${pathnameApiAuthentication}/password/reset`,
						body: args,
					};
				},
				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'resetPassword');
					}
				},
			}),

			forgottenPassword: build.mutation({
				query: (args) => {
					return {
						method: 'POST',
						url: `${pathnameApiAuthentication}/password/forgot`,
						body: args,
					};
				},
				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'forgottenPassword');
					}
				},
			}),

			validateDiscord: build.query({
				query: (args) => {
					return {
						method: 'GET',
						url: `${pathnameApiAuthentication}/discord/token/${args.discordRefreshToken}/${args.discordToken}`,
					};
				},
				transformResponse: (response) => {
					const data = handleSignInData(response);
					return { data };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						dispatch(resetAppSlice());
						dispatch(resetNotificationSlice());
						dispatch(resetImagesSlice());
						dispatch(resetOpenedProjectsSlice());
						dispatch(resetProjectImagesSlice());
						dispatch(resetSavedPromptsSlice());
						dispatch(resetProjectsSlice());
						dispatch(resetTutorialsSlice());
						dispatch(resetUserSlice());
						dispatch(apiProjects.util.resetApiState());
						dispatch(apiUserWallets.util.resetApiState());
						dispatch(setIsUserAuthenticated(true));
						dispatch(setToken(data.data.jwt));

						dispatch(openModal({ type: ANNOUNCEMENTS, data: { type: GENERAL } }));
					} catch (error) {
						handleResponseError(dispatch, error, 'validateDiscord');
					}
				},
			}),

			emailValidation: build.query({
				query: (args: { userId: string | undefined; hash: string | undefined }) => {
					return {
						method: 'GET',
						url: `${pathnameApiAuthentication}/verification/verify/${args.userId}/${args.hash}`,
					};
				},
				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(setIsEmailVerified(true));
					} catch (error) {
						dispatch(setIsEmailVerified(false));
						handleResponseError(dispatch, error, 'emailValidation');
					}
				},
			}),

			// REFRESH_AUTHENTICATION - currently disabled and not supported by the BE
			refreshToken: build.mutation<{ data: SingInData }, void>({
				query: () => {
					return {
						method: 'POST',
						url: `${pathnameApiAuthentication}/refresh`,
						body: {},
					};
				},

				transformResponse: (response) => {
					const data = handleSignInData(response);

					return { data };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setToken(data.data.jwt));
					} catch (error) {
						// Will clear the store and redirect the user to the SignIn page.
						dispatch(resetAuthenticationSlice());
						dispatch(resetUserSlice());
						window.localStorage.clear();

						handleResponseError(dispatch, error, 'refreshToken');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const {
	useSignUpMutation,
	useSignInMutation,
	useFetchAuthUserQuery,
	useLogoutMutation,
	useResetPasswordMutation,
	useForgottenPasswordMutation,
	useValidateDiscordQuery,
	useEmailValidationQuery,
	useRefreshTokenMutation,
} = apiAuthentication;
