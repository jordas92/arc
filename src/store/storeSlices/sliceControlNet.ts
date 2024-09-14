/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice } from '@reduxjs/toolkit';

import { controlNetKeys } from 'store/common/keys';
import { ControlNetGenerationData, ControlNetTools } from 'store/types/typesControlNet';

type Slice = {
	openedControlNetDrawer: keyof typeof controlNetKeys | string;
	currentControlNetTool: keyof typeof controlNetKeys | string;
	controlNetTools: ControlNetTools;
};

const initialControlNetGenerationData: ControlNetGenerationData = {
	sourceImageUrl: '',
	sourceImageBase64: '',
	preProcessedImageUrl: '',
	isSourceImageShown: false,
	isImagePreprocessed: false,
	influence: 1,
};

type ActionType_A = {
	payload: ControlNetTools | {};
};

type ActionType_B = {
	payload: keyof typeof controlNetKeys | string;
};

type ActionType_C = {
	payload: string;
};

type ActionType_D = {
	payload: number;
};

type ActionType_E = {
	payload: boolean;
};

const initialState: Slice = {
	openedControlNetDrawer: '',
	currentControlNetTool: '',
	controlNetTools: {},
};

export const sliceControlNet = createSlice({
	name: 'sliceControlNet',
	initialState,
	reducers: {
		setControlNetTools(state: Slice, action: ActionType_A) {
			state.controlNetTools = action.payload;
		},

		setOpenControlNetDrawer(state: Slice, action: ActionType_B) {
			state.openedControlNetDrawer = action.payload;
		},

		closeControlNetDrawer(state: Slice) {
			state.openedControlNetDrawer = '';
		},

		// should be set when toggle in on/off
		setCurrentControlNetTool(state: Slice, action: ActionType_B) {
			state.currentControlNetTool = action.payload;
		},

		setIsImagesContainerExpanded(state: Slice, action: ActionType_E) {
			state.controlNetTools[state.openedControlNetDrawer].isImagesContainerExpanded =
				action.payload;
		},

		// generation data
		setSourceImageUrl(state: Slice, action: ActionType_C) {
			const { controlNetGenerationData } =
				state.controlNetTools[state.openedControlNetDrawer];

			state.controlNetTools[state.openedControlNetDrawer].controlNetGenerationData = {
				...controlNetGenerationData,
				sourceImageUrl: action.payload,
			};
		},

		// generation data
		setSourceImageBase64(state: Slice, action: ActionType_C) {
			const { controlNetGenerationData } =
				state.controlNetTools[state.openedControlNetDrawer];

			state.controlNetTools[state.openedControlNetDrawer].controlNetGenerationData = {
				...controlNetGenerationData,
				sourceImageBase64: action.payload,
			};
		},

		// generation data
		setPreProcessedImageUrl(state: Slice, action: ActionType_C) {
			const { controlNetGenerationData } =
				state.controlNetTools[state.openedControlNetDrawer];

			state.controlNetTools[state.openedControlNetDrawer].controlNetGenerationData = {
				...controlNetGenerationData,
				preProcessedImageUrl: action.payload,
			};
		},

		// generation data
		setIsSourceImageShown(state: Slice, action: ActionType_E) {
			const { controlNetGenerationData } =
				state.controlNetTools[state.openedControlNetDrawer];

			state.controlNetTools[state.openedControlNetDrawer].controlNetGenerationData = {
				...controlNetGenerationData,
				isSourceImageShown: action.payload,
			};
		},

		// generation data
		setIsImagePreprocessed(state: Slice, action: ActionType_E) {
			const { controlNetGenerationData } =
				state.controlNetTools[state.openedControlNetDrawer];

			state.controlNetTools[state.openedControlNetDrawer].controlNetGenerationData = {
				...controlNetGenerationData,
				isImagePreprocessed: action.payload,
			};
		},

		// generation data
		setInfluence(state: Slice, action: ActionType_D) {
			const { controlNetGenerationData } =
				state.controlNetTools[state.openedControlNetDrawer];

			state.controlNetTools[state.openedControlNetDrawer].controlNetGenerationData = {
				...controlNetGenerationData,
				influence: action.payload,
			};
		},

		resetControlNetGenerationData(state: Slice) {
			state.currentControlNetTool = '';

			Object.keys(state.controlNetTools).forEach((key) => {
				state.controlNetTools[key].controlNetGenerationData =
					initialControlNetGenerationData;
			});
		},

		resetControlNetSlice: () => {
			return initialState;
		},
	},
});

// Actions
export const {
	setControlNetTools,
	setOpenControlNetDrawer,
	closeControlNetDrawer,
	setCurrentControlNetTool,
	setIsImagesContainerExpanded,
	setSourceImageUrl,
	setSourceImageBase64,
	setPreProcessedImageUrl,
	setIsSourceImageShown,
	setIsImagePreprocessed,
	setInfluence,
	resetControlNetGenerationData,
	resetControlNetSlice,
} = sliceControlNet.actions;
