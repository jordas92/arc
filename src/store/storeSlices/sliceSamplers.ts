/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { generationToolsKeys } from 'store/common/keys';
import { Samplers } from '../types/typesSamplers';

type Slice = Samplers;

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;

const initialState: Slice = {
	[TEXT_TO_IMAGE]: {
		items: [],
		default: '',
	},
	[IMAGE_TO_IMAGE]: {
		items: [],
		default: '',
	},
	[TOOL_ENHANCE]: {
		items: [],
		default: '',
	},
};

export const sliceSamplers = createSlice({
	name: 'sliceSamplers',
	initialState,
	reducers: {
		setSamplers(state: Slice, action: PayloadAction<Samplers>) {
			return action.payload;
		},
	},
});

// Actions
export const { setSamplers } = sliceSamplers.actions;
