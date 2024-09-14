/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createApi } from '@reduxjs/toolkit/query/react';

import handleResponseError from 'store/dataHandlers/handleResponseError';
import handleFetchUserWalletsData from 'store/dataHandlers/handleFetchUserWalletsData';
import handleFetchUserWalletsBalanceData from 'store/dataHandlers/handleFetchUserWalletsBalanceData';
import {
	setUserWallets,
	setUserCreditsBalance,
	setUserImagesLeft,
	setUserCreditsRedeem,
} from 'store/storeSlices/sliceUser';
import {
	ResponseWallets,
	Wallets,
	ResponseWalletsBalance,
	WalletsBalance,
	RequestWalletBalanceByConnection,
} from 'store/types/typesUserWallets';

import { baseQueryWithReAuth, origin, pathnameApiUserWallets } from './common';

export const apiUserWallets = createApi({
	reducerPath: 'apiUserWallets',
	baseQuery: baseQueryWithReAuth,

	endpoints(build) {
		return {
			// TODO_NEXT - Use when UI Design is ready
			// Fully handled and wired up with the store
			fetchUserWallets: build.query<{ wallets: Wallets }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiUserWallets}`,
					};
				},

				transformResponse: (response: ResponseWallets) => {
					const wallets = handleFetchUserWalletsData(response);

					return { wallets };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setUserWallets(data.wallets));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchUserWallets');
					}
				},
			}),

			fetchUserWalletsBalance: build.query<{ walletsBalance: WalletsBalance }, void>({
				query: () => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiUserWallets}/balance/*`,
					};
				},

				transformResponse: (response: ResponseWalletsBalance) => {
					const walletsBalance = handleFetchUserWalletsBalanceData(response);

					return { walletsBalance };
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						const { data } = await queryFulfilled;

						dispatch(setUserCreditsBalance(data.walletsBalance.creditsBalance));
						dispatch(setUserImagesLeft(data.walletsBalance.creditsBalance));
						dispatch(setUserCreditsRedeem(data.walletsBalance.creditsRedeem));
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchUserWalletsBalance');
					}
				},
			}),

			redeemUserCredits: build.mutation<{ walletsBalance: WalletsBalance }, void>({
				query: () => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiUserWallets}/redeem`,
					};
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// After redeeming credits, fetch fetchUserWalletsBalance again to get the credits
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'redeemUserCredits');
					}
				},
			}),

			// eslint-disable-next-line prettier/prettier
			fetchUserWalletsBalanceByConnection: build.query<WalletsBalance, RequestWalletBalanceByConnection>({
				query: (args) => {
					return {
						method: 'GET',
						url: `${origin}${pathnameApiUserWallets}/connection/${args.type}/${args.id}`,
					};
				},

				transformResponse: (response: ResponseWalletsBalance) => {
					return handleFetchUserWalletsBalanceData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'fetchUserWalletsBalanceByConnection');
					}
				},
			}),

			// eslint-disable-next-line prettier/prettier
			redeemDiscordUserCredits: build.mutation<WalletsBalance, RequestWalletBalanceByConnection>({
				query: (args) => {
					return {
						method: 'POST',
						url: `${origin}${pathnameApiUserWallets}/connection/${args.type}/${args.id}/redeem`,
					};
				},

				transformResponse: (response: ResponseWalletsBalance) => {
					return handleFetchUserWalletsBalanceData(response);
				},

				async onQueryStarted(args, { dispatch, queryFulfilled }) {
					// After redeeming credits, fetch fetchUserWalletsBalance again to get the credits
					try {
						await queryFulfilled;
					} catch (error) {
						handleResponseError(dispatch, error, 'redeemDiscordUserCredits');
					}
				},
			}),

			// TODO_NEXT - Two more endpoints are available for API Wallets, but no UI designs are available
			// GET User Wallet
			// GET User Wallet Transactions
		};
	},
});

// Auto-generated React hooks
export const {
	useFetchUserWalletsQuery,
	useFetchUserWalletsBalanceQuery,
	useLazyFetchUserWalletsBalanceQuery,
	useFetchUserWalletsBalanceByConnectionQuery,
	useLazyFetchUserWalletsBalanceByConnectionQuery,
	useRedeemUserCreditsMutation,
	useRedeemDiscordUserCreditsMutation,
} = apiUserWallets;
