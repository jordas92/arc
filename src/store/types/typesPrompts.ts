/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationTypes } from '../common/keys';
import { GenerationData } from './typesCommon';
import { ResponseFetchImagesItem } from './typesImages';

type generationTypesKeys = keyof typeof generationTypes;

export type Generation = {
	promptId: string;
	isGenerating: boolean;
	images: GenerationImage[];
	generationData: GenerationData;
};

export type GenerationImage = {
	imageId: string;
	imageUrl: string;
	thumbUrl: string;
	isImageNsfw: boolean;
	isFavorite: boolean;
	promptId: string;
};

/**
 * Expected API response type. Only props related to the FE are included.
 * Prompt <=> GenerationData
 */
export interface ResponseFetchPrompt {
	id: string | null; // promptId
	project_id: string | null;
	model: string | null;
	styles: Array<string> | null;
	prompt: string | null;
	negative_prompt: string | null;
	width: number | null;
	height: number | null;
	aspect_ratio: string | null;
	cfg: number | null;
	clip_skip: number | null;
	sampler: string | null;
	sharpening: string | null;
	transformation: number | null;
	type: (typeof generationTypes)[generationTypesKeys] | null;
	// If the type is NOT "Conjure", it means the generation is made from a source image,
	// so one of the 'image' or 'image_id' must be available
	image: string | null; // image source (URL)
	image_id: string | null; // image source (image ID) => fetch the source image URL from API Images
}

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchPrompts = {
	data: Array<ResponseFetchPrompt>;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchPromptDetails = {
	prompt_id: string | null;
	project_id: string | null;
	image: string | null;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchPromptImages = Array<ResponseFetchImagesItem>;

export type PromptImages = {
	projectId: string;
	promptId: string;
	type: (typeof generationTypes)[generationTypesKeys] | string;
	images: Array<GenerationImage>;
};

export type PromptDetails = {
	projectId: string;
	promptId: string;
	imageUrl: string;
	imageWidth: number;
	imageHeight: number;
};
