/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EnhanceModels } from '../types/typesEnhanceModels';

type Slice = EnhanceModels;

const initialState: Slice = [];

export const sliceEnhanceModels = createSlice({
	name: 'sliceEnhanceModels',
	initialState,
	reducers: {
		setEnhanceModels(state: Slice, action: PayloadAction<EnhanceModels>) {
			return action.payload;
		},

		resetEnhanceModelsSlice() {
			return initialState;
		},
	},
});

// Actions
export const { setEnhanceModels, resetEnhanceModelsSlice } = sliceEnhanceModels.actions;
