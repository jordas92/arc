/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import { setUserData, setUserDiscordData, resetUserDiscordData } from 'store/storeSlices/sliceUser';
import { showNotification } from 'store/storeSlices/sliceNotification';
import { resetImagesSlice } from 'store/storeSlices/sliceImages';
import { resetProjectImagesSlice } from 'store/storeSlices/sliceProjectImages';
import { resetOpenedProjectsSlice } from 'store/storeSlices/sliceOpenedProjects';
import { resetTutorialsSlice } from 'store/storeSlices/sliceTutorials';
import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleFetchUserData from 'store/dataHandlers/handleFetchUserData';
import handleFetchUserConnectionByTypeData from 'store/dataHandlers/handleFetchUserConnectionByTypeData';
import handleCreateConnectionData from 'store/dataHandlers/handleCreateConnectionData';
import {
	User,
	RequestUpdateUser,
	RequestUpdateUserAvatar,
	RequestUpdateUserNsfw,
	ResponseFetchUser,
	RequestUpdateUserSettings,
	RequestUpdateUserPassword,
	ResponseConnection,
	Connection,
	RequestCreateConnection,
} from 'store/types/typesUser';
import { consumerTypes } from 'store/common/keys';
import { apiImages, apiProjects } from 'store';

import { baseQueryWithReAuth, origin, pathnameApiUser } from './common';

type consumerTypesKeys = keyof typeof consumerTypes;

export const apiUser = createApi({
	reducerPath: 'apiUser',
	baseQuery: baseQueryWithReAuth,
	endpoints(build) {
		return {
			fetchUser: build.query<{ user: User }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiUser}`,
					};
				},
				transformResponse: (response) => {
					const user = handleFetchUserData(response);

					return { user };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						dispatch(setUserData(data.user));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchUser');
					}
				},
			}),

			deleteUser: build.mutation<any, void>({
				query: () => {
					return {
						method: 'DELETE',
						url: `${origin}${pathnameApiUser}`,
					};
				},
				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(
							showNotification({
								message: 'Successfully deleted Arcana account!',
								severity: 'success',
							}),
						);
					} catch (error) {
						handleResponseError(dispatch, error, 'deleteUser');
					}
				},
			}),

			updateUser: build.mutation<{ user: User }, RequestUpdateUser>({
				query: (args) => {
					return {
						method: 'PATCH',
						url: `${origin}${pathnameApiUser}`,
						body: args,
					};
				},

				transformResponse: (response) => {
					const user = handleFetchUserData(response);
					return { user };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						dispatch(setUserData(data.user));
						dispatch(
							showNotification({
								message: 'Successfully saved!',
								severity: 'success',
							}),
						);
					} catch (error) {
						handleResponseError(dispatch, error, 'updateUser');
					}
				},
			}),

			updateUserAvatar: build.mutation<{ user: User }, RequestUpdateUserAvatar>({
				query: (args) => {
					const bodyFormData = new FormData();
					bodyFormData.append('file', args.file);

					return {
						method: 'POST',
						url: `${origin}${pathnameApiUser}/avatar`,
						body: bodyFormData,
					};
				},

				transformResponse: (response: ResponseFetchUser) => {
					const user = handleFetchUserData(response);
					return { user };
				},

				async onQueryStarted(options, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						dispatch(setUserData(data.user));
						dispatch(
							showNotification({
								message: 'Image successfully saved!',
								severity: 'success',
							}),
						);
					} catch (error) {
						handleResponseError(dispatch, error, 'updateUserAvatar');
					}
				},
			}),

			updateNsfw: build.mutation<{ user: User }, RequestUpdateUserNsfw>({
				query: (args) => {
					return {
						method: 'PATCH',
						url: `${origin}${pathnameApiUser}`,
						body: args,
					};
				},

				transformResponse: (response) => {
					const user = handleFetchUserData(response);
					return { user };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setUserData(data.user));

						dispatch(resetImagesSlice());
						dispatch(resetProjectImagesSlice());
						dispatch(resetOpenedProjectsSlice());
						dispatch(resetTutorialsSlice());
						dispatch(apiImages.util.resetApiState());
						dispatch(apiProjects.util.resetApiState());

						if (data.user.isNsfwEnabled) {
							dispatch(
								showNotification({
									message: 'Successfully enabled NSFW Blocker!',
									severity: 'success',
								}),
							);
						} else {
							dispatch(
								showNotification({
									message: 'Successfully disabled NSFW Blocker!',
									severity: 'success',
								}),
							);
						}
					} catch (error) {
						handleResponseError(dispatch, error, 'updateNsfw');
					}
				},
			}),

			updateUserSettings: build.mutation<{ user: User }, RequestUpdateUserSettings>({
				query: (args) => {
					return {
						method: 'PATCH',
						url: `${origin}${pathnameApiUser}/settings`,
						body: args,
					};
				},
				transformResponse: (response) => {
					const user = handleFetchUserData(response);

					return { user };
				},
				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'updateUser');
					}
				},
			}),

			changeUserPassword: build.mutation<{ user: User }, RequestUpdateUserPassword>({
				query: (args) => {
					return {
						method: 'PATCH',
						url: `${origin}${pathnameApiUser}/password`,
						body: args,
					};
				},
				transformResponse: (response) => {
					const user = handleFetchUserData(response);

					return { user };
				},
				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(
							showNotification({
								message: 'Successfully saved!',
								severity: 'success',
							}),
						);
					} catch (error) {
						handleResponseError(dispatch, error, 'updateUser');
					}
				},
			}),

			// eslint-disable-next-line prettier/prettier
			fetchConnectionByType: build.query<Connection, (typeof consumerTypes)[consumerTypesKeys]>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiUser}/connections/${args}`,
					};
				},

				transformResponse: (response: ResponseConnection) => {
					return handleFetchUserConnectionByTypeData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;
						dispatch(setUserDiscordData(data));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchConnectionByType');
					}
				},
			}),

			createConnection: build.mutation<string, RequestCreateConnection>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiUser}/connections`,
						body: args,
					};
				},

				transformResponse: (response: string) => {
					return handleCreateConnectionData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'updateUser');
					}
				},
			}),

			deleteConnection: build.mutation<void, (typeof consumerTypes)[consumerTypesKeys]>({
				query: (args) => {
					return {
						method: 'DELETE',
						url: `${origin}${pathnameApiUser}/connections/${args}`,
					};
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(resetUserDiscordData());
					} catch (error) {
						handleResponseError(dispatch, error, 'deleteConnection');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const {
	useFetchUserQuery,
	useFetchConnectionByTypeQuery,
	useLazyFetchConnectionByTypeQuery,
	useLazyFetchUserQuery,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useUpdateUserAvatarMutation,
	useUpdateNsfwMutation,
	useUpdateUserSettingsMutation,
	useChangeUserPasswordMutation,
	useCreateConnectionMutation,
	useDeleteConnectionMutation,
} = apiUser;
