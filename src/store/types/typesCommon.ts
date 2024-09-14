/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationTypes } from 'store/common/keys';
import {
	GenerationToolEnhance,
	GenerationToolImageToImage,
	GenerationToolTextToImage,
} from 'store/storeSlices/sliceOpenedProjects';

type generationTypesKeys = keyof typeof generationTypes;

export type Option = {
	id: string;
	value: string;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponsePaginationData = {
	current_page: number | null;
	last_page: number | null;
	per_page: number | null;
	total: number | null;
};

// GenerationData <=> Prompt
export type GenerationData = {
	promptId: string;
	projectId: string;
	model: string;
	styles: Array<string>;
	prompt: string;
	promptNegative: string;
	imageWidth: number;
	imageHeight: number;
	ratio: string;
	cfg: number;
	clipSkip: number;
	sampler: string;
	transformation: number;
	type: (typeof generationTypes)[generationTypesKeys];
	sourceImageUrl: string;
	sourceImageId: string; // available only for 'Arcana' images
	sharpness: string;
};

export type TextToImageGenerationData = Pick<
	GenerationToolTextToImage,
	| 'model'
	| 'styles'
	| 'imageWidth'
	| 'imageHeight'
	| 'ratio'
	| 'cfg'
	| 'clipSkip'
	| 'promptNegative'
	| 'prompt'
	| 'sampler'
>;

export type ImageToImageGenerationData = Pick<
	GenerationToolImageToImage,
	| 'model'
	| 'styles'
	| 'imageWidth'
	| 'imageHeight'
	| 'ratio'
	| 'cfg'
	| 'clipSkip'
	| 'promptNegative'
	| 'prompt'
	| 'sampler'
	| 'transformation'
>;

export type EnhanceGenerationData = Pick<
	GenerationToolEnhance,
	'model' | 'engine' | 'sampler' | 'styles' | 'prompt' | 'transformation' | 'sharpness'
>;
