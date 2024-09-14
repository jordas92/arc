/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationToolsKeys, generationTypes } from '../common/keys';

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;

type generationTypesKeys = keyof typeof generationTypes;

export type ResponseSampler = {
	availability: Array<(typeof generationTypes)[generationTypesKeys]>;
	default: (typeof generationTypes)[generationTypesKeys] | null;
	id: string;
	key: string;
	title: string;
};

/**
 * Expected API response type from 'fetchSamplers'.
 * Only props related to the FE are included.
 */
export type ResponseSamplers = Array<ResponseSampler>;

export type Sampler = {
	id: string;
	key: string;
	value: string;
};

type GenerationToolSampler = {
	items: Array<Sampler>;
	default: string;
};

export type Samplers = {
	[TEXT_TO_IMAGE]: GenerationToolSampler;
	[IMAGE_TO_IMAGE]: GenerationToolSampler;
	[TOOL_ENHANCE]: GenerationToolSampler;
};
