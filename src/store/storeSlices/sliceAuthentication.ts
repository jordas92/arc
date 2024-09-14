/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Slice = {
	isAuthenticated: boolean;
	jwt: string;
	isEmailVerified: boolean;
};

const initialState: Slice = {
	isAuthenticated: false,
	jwt: '',
	isEmailVerified: false,
};

export const sliceAuthentication = createSlice({
	name: 'sliceAuthentication',
	initialState,
	reducers: {
		setIsUserAuthenticated(state: Slice, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},

		setToken(state: Slice, action: PayloadAction<string>) {
			state.jwt = action.payload;
		},

		setIsEmailVerified(state: Slice, action: PayloadAction<boolean>) {
			state.isEmailVerified = action.payload;
		},

		resetAuthenticationSlice: () => {
			return initialState;
		},
	},
});

// Actions
export const { setIsUserAuthenticated, setToken, setIsEmailVerified, resetAuthenticationSlice } =
	sliceAuthentication.actions;
