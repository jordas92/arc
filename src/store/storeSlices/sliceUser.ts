/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { announcementsKeys } from 'store/common/keys';
import { User, SliceUser, Connection } from 'store/types/typesUser';
import { Wallet } from 'store/types/typesUserWallets';

const { GENERAL, TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = announcementsKeys;

type Slice = SliceUser;

const initialState: Slice = {
	id: 0,
	name: '',
	username: '',
	email: '',
	avatar: '',
	description: '',
	isNsfwEnabled: false,

	wallets: [],
	creditsBalance: 0,
	creditsRedeem: 0,
	imagesLeft: 0,

	// TODO_NEXT
	// e.g. connections: {
	// 	discord: { id: '', name: '' },
	// 	facebook: { id: '', name: '' },
	// },
	discordId: '',
	discordName: '',

	settings: {
		announcements: {
			[GENERAL]: true,
			[TEXT_TO_IMAGE]: true,
			[IMAGE_TO_IMAGE]: true,
			[TOOL_ENHANCE]: true,
		},
	},
};

export const sliceUser = createSlice({
	name: 'sliceUser',
	initialState,
	reducers: {
		setAuthUserData(state: Slice, action: PayloadAction<User>) {
			return { ...state, ...action.payload };
		},

		setUserData(state: Slice, action: PayloadAction<User>) {
			const { id, name, username, email, avatar, description, isNsfwEnabled } =
				action.payload;

			return {
				...state,
				id,
				name,
				username,
				email,
				avatar,
				description,
				isNsfwEnabled,
			};
		},

		setAnnoucements: (
			state: Slice,
			action: PayloadAction<{
				type: keyof typeof announcementsKeys;
				show: boolean;
			}>,
		) => {
			return {
				...state,
				settings: {
					...state.settings,
					announcements: {
						...state.settings?.announcements,
						[action.payload.type as keyof typeof announcementsKeys]:
							action.payload.show,
					},
				},
			};
		},

		setUserWallets: (state: Slice, action: PayloadAction<Array<Wallet>>) => {
			state.wallets = action.payload;
		},

		setUserCreditsBalance: (state: Slice, action: PayloadAction<number>) => {
			state.creditsBalance = action.payload;
		},

		setUserImagesLeft: (state: Slice, action: PayloadAction<number>) => {
			const creditsBalance = action.payload;

			state.imagesLeft = Math.floor(creditsBalance / 10);
		},

		setUserCreditsRedeem: (state: Slice, action: PayloadAction<number>) => {
			state.creditsRedeem = action.payload;
		},

		setUserDiscordData: (state: Slice, action: PayloadAction<Connection>) => {
			state.discordId = action.payload.connectionId;
			state.discordName = action.payload.connectionName;
		},

		resetUserDiscordData: (state: Slice) => {
			state.discordId = '';
			state.discordName = '';
		},

		resetUserSlice: () => {
			return initialState;
		},
	},
});

// Actions
export const {
	setAuthUserData,
	setUserData,
	setAnnoucements,
	setUserWallets,
	setUserCreditsBalance,
	setUserImagesLeft,
	setUserCreditsRedeem,
	setUserDiscordData,
	resetUserDiscordData,
	resetUserSlice,
} = sliceUser.actions;
