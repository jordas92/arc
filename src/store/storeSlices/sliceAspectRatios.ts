/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AspectRatios } from '../types/typesAspectRatios';

type Slice = AspectRatios;

const initialState: Slice = {
	standard: {
		landscape: [],
		portrait: [],
	},
	sdxl: {
		landscape: [],
		portrait: [],
	},
};

export const sliceAspectRatios = createSlice({
	name: 'sliceAspectRatios',
	initialState,
	reducers: {
		setAspectRatios(state: Slice, action: PayloadAction<AspectRatios>) {
			return action.payload;
		},
	},
});

// Actions
export const { setAspectRatios } = sliceAspectRatios.actions;
