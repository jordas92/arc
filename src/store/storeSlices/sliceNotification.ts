/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { notificationSeverity } from '../common/keys';

// TODO_NEXT Move into types file or may be not?
export type Notification = {
	message: string;
	severity?: keyof typeof notificationSeverity;
	autohide?: boolean;
	action?: {
		label: string;
		data: any;
	};
	closeOnClickAway?: boolean;
};

// Slice is the same as Notification but without optional keys
// TODO_NEXT find and implement a clean TS solution
// https://pawelgrzybek.com/make-the-typescript-interface-partially-optional-required/
type Slice = {
	message: string;
	severity: string;
	autohide: boolean;
	visible?: boolean;
	action: {
		label: string;
		data: any;
	} | null;
	closeOnClickAway: boolean;
};

// When the message is an empty string (falsy) => a notification will not be displayed
const initialState: Slice = {
	message: '',
	severity: '',
	autohide: true,
	visible: false,
	action: null,
	closeOnClickAway: true,
};

// LEGACY extracted from appSlice
export const sliceNotification = createSlice({
	name: 'sliceNotification',
	initialState,
	reducers: {
		showNotification(state: Slice, action: PayloadAction<Notification>) {
			return { ...state, ...action.payload, visible: true };
		},

		clearNotification(state: Slice) {
			return { ...state, ...initialState };
		},

		resetNotificationSlice: () => {
			return initialState;
		},
	},
});

// Actions
export const { showNotification, clearNotification, resetNotificationSlice } =
	sliceNotification.actions;
