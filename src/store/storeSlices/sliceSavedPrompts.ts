/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SavedPrompt, SavedPrompts } from '../types/typesSavedPrompts';

type Slice = SavedPrompts;

const initialState: Slice = {
	items: [],
	nextPage: '',
};

export const sliceSavedPrompts = createSlice({
	name: 'sliceSavedPrompts',
	initialState,
	reducers: {
		setSavedPrompts(state: Slice, action: PayloadAction<SavedPrompts>) {
			const { items, nextPage } = action.payload;

			return {
				items: [...state.items, ...items],
				nextPage,
			};
		},

		updateSavedPrompts(state: Slice, action: PayloadAction<SavedPrompt>) {
			const { id, prompt, title } = action.payload;

			state.items = state.items.map((item) => {
				if (item.id === id) {
					return {
						...item,
						prompt,
						title,
					};
				}

				return item;
			});
		},

		removeSavedPrompt(state: Slice, action: PayloadAction<string>) {
			const promptId = action.payload;

			state.items = state.items.filter((item) => item.id !== promptId);
		},

		resetSavedPromptsSlice() {
			return initialState;
		},
	},
});

// Actions
export const { setSavedPrompts, updateSavedPrompts, removeSavedPrompt, resetSavedPromptsSlice } =
	sliceSavedPrompts.actions;
