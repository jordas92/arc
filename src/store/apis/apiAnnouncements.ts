/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReAuth, origin, pathnameApiAnnouncements } from './common';
import handleFetchAnnouncementsData from '../dataHandlers/handleFetchAnnouncementsData';
import handleResponseError from '../dataHandlers/handleResponseError';

import { Announcements } from '../types/typesAnnouncements';

type ArgsFetchQuery = {
	category: string;
	page?: string;
};

export const apiAnnouncements = createApi({
	reducerPath: 'apiAnnouncements',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			// Currently set to 10 items (by default) by the BE (pagination props provided)
			fetchAnnouncements: build.query<{ announcements: Announcements }, ArgsFetchQuery>({
				query: (args) => {
					const { category } = args;
					return {
						method: 'GET',
						url: `${origin}${pathnameApiAnnouncements}?category=${category}`,
					};
				},

				transformResponse: (response) => {
					const announcements = handleFetchAnnouncementsData(response);

					return { announcements };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchAnnouncements');
					}
				},
			}),

			fetchMoreAnnouncements: build.query<{ announcements: Announcements }, ArgsFetchQuery>({
				query: (args) => {
					const { category, page } = args;
					return {
						method: 'GET',
						url: `${origin}${pathnameApiAnnouncements}?category=${category}&page=${page}`,
					};
				},

				transformResponse: (response) => {
					const announcements = handleFetchAnnouncementsData(response);

					return { announcements };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchMoreAnnouncements');
					}
				},
			}),
		};
	},
});

// Auto-generated React hooks
export const { useFetchAnnouncementsQuery, useLazyFetchMoreAnnouncementsQuery } = apiAnnouncements;
