/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Models, ModelMeta, Model, ModelMetaImage } from '../types/typesModels';

type Slice = {
	models: Models;
	modelDetail: ModelMeta;
	nextMetaModelsPage: number;
};

const InitialModelDetail = {
	key: '',
	name: '',
	type: '',
	modalTitle: '',
	modalDescription: '',
	processor: '',
	images: [],
};

const initialState: Slice = {
	models: [],
	modelDetail: InitialModelDetail,
	nextMetaModelsPage: 0,
};

export const sliceModels = createSlice({
	name: 'sliceModels',
	initialState,
	reducers: {
		setModels(state: Slice, action: PayloadAction<Models>) {
			state.models = action.payload;
		},

		setModelDetail(state: Slice, action: PayloadAction<ModelMeta>) {
			state.modelDetail = action.payload;
		},

		addMetaModels(state: Slice, action: PayloadAction<Array<ModelMetaImage>>) {
			state.modelDetail.images = [...state.modelDetail.images, ...action.payload];
		},

		setNextMetaModelPage(state: Slice, action: PayloadAction<number>) {
			state.nextMetaModelsPage = action.payload;
		},
	},
});

// Actions
export const { setModels, addMetaModels, setNextMetaModelPage, setModelDetail } =
	sliceModels.actions;
