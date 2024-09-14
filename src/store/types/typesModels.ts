import { ResponsePaginationData } from './typesCommon';

/** Copyright (c) 2023-present Kristiyan Dimitrov */

export type ResponseModel = {
	key: string | null;
	name: string | null;
	image: string | null;
	processor: string | null; // e.g. "standard" or "sdxl" or ...
};

/**
 * Expected API response type from 'fetchModels'.
 * Only props related to the FE are included.
 */
export type ResponseModels = Array<ResponseModel>;

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseModelItems = {
	data: Array<ResponseModelMetaNext>;
	meta: ResponsePaginationData;
};

export type Model = {
	key: string;
	name: string;
	image: string;
	processor: string;
	disabled?: boolean;
};

export type Models = Array<Model>;

export type ResponseModelMetaImage = {
	prompt: string | null;
	negative_prompt: string | null;
	aspect_ratio: string | null;
	styles: Array<string>;
	url: string | null;
};

/**
 * Expected API response type from 'getModelMeta' and 'fetchModelMeta'
 * Only props related to the FE are included.
 */
export type ResponseModelMeta = {
	key: string | null;
	name: string | null;
	modal_title: string | null;
	modal_description: string | null;
	processor: string | null; // e.g. "standard" or "sdxl" or ...
	images: Array<ResponseModelMetaImage>;
};

export type ResponseModelMetaNext = {
	key: string | null;
	name: string | null;
	image: string | null;
	processor: string | null; // e.g. "standard" or "sdxl" or ...
};

export interface ModelMetaItems {
	data: Array<ResponseModelMetaNext>;
	pagesTotal: number;
	currentFetchedPage: number;
	itemsTotal: number;
}

export interface ResponseModelMetaItems {
	data: Array<ModelMetaImage>;
	currentFetchedPage: number;
}

export type ModelMetaImage = {
	prompt: string;
	promptNegative: string;
	ratio: string;
	isAspectRatioPortrait: boolean;
	styles: Array<string>;
	url: string;
};

export type ModelMeta = {
	key: string;
	name: string;
	modalTitle: string;
	modalDescription: string;
	processor: string;
	images: Array<ModelMetaImage>;
};
