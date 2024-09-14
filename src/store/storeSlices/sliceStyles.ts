/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Styles } from '../types/typesStyles';

type Slice = Styles;

const initialState: Slice = [];

export const sliceStyles = createSlice({
	name: 'sliceStyles',
	initialState,
	reducers: {
		setStyles(state: Slice, action: PayloadAction<Styles>) {
			return action.payload;
		},
	},
});

// Actions
export const { setStyles } = sliceStyles.actions;
