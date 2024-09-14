/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationToolsKeys } from '../common/keys';
import { GenerationData } from './typesCommon';

// Common for 'CONJURE' & 'TRANSFORM' & 'INPAINT'
export interface RequestGenerationCommon {
	project_id: string;
	count: number; // TODO_NEXT_BE - Does the FE need to provide this prop since it is not controlled by the UI?
	aspect_ratio: string;
	model: string;
	styles: Array<string>;
	width: number;
	height: number;
	prompt: string;
	negative_prompt: string;
	cfg: number;
	clip_skip: number;
	sampler: string;
	steps: number; // TODO_NEXT_BE - Does the FE need to provide this prop since it is not controlled by the UI?
	// tools: Array<RequestControlNetTools>; // TODO_ControlNet
}

// CONJURE (use interface if extends needed)
export type RequestGenerationConjure = RequestGenerationCommon;

// TRANSFORM
export interface RequestGenerationTransform extends RequestGenerationCommon {
	// One of the 'image' or 'imageId' must be provided
	image: string | null; // image source (converted to Base64 for external uploaded image)
	image_id: string | null; // image source (for Arcana generated image)
	transformation: number;
}

// INPAINT
export interface RequestGenerationInPaint extends RequestGenerationCommon {
	// One of the 'image' or 'imageId' must be provided
	image: string | null; // Base64 (uploaded image)
	image_id: string | null; // image source (for Arcana generated image)
	transformation: number;
	mask: string; // Base64
	mask_invert: boolean;
	inpaint_type: string;
}

// Common for 'ENHANCE SIMPLE' & 'ENHANCE ADVANCED'
export interface RequestGenerationEnhanceCommon {
	project_id: string;
	styles: Array<string>;
	width: number;
	height: number;
	prompt: string;
	transformation: number; // Creativity
	// One of the 'image' or 'image_id' must be provided
	image: string | null; // image source (converted to Base64 for external uploaded image)
	image_id: string | null; // image source (for Arcana generated image)
}

// ENHANCE SIMPLE
export interface RequestGenerationEnhanceSimple extends RequestGenerationEnhanceCommon {
	model: string;
	factor: number;
	sharpness: string;
}

// ENHANCE ADVANCED
export interface RequestGenerationEnhanceAdvanced extends RequestGenerationEnhanceCommon {
	// TODO_NEXT_BE
	sampler: string;
	details_strength: number;
	engine_type: string;
	factor: number;
	resized_width: number;
	resized_height: number;
}

// ENHANCE
export type RequestGenerationEnhance =
	| RequestGenerationEnhanceSimple
	| RequestGenerationEnhanceAdvanced;

// UPSCALE
export type RequestGenerationUpscale = {
	project_id: string;
	image_id: string;
	factor: number;
};

export type MetaIsRequestingGeneration = {
	projectId: string;
	generationTool: keyof typeof generationToolsKeys;
	isRequestingGeneration: boolean;
};

export type RequestControlNetTools = {
	key: string;
	image: string;
	mask: null; // TODO_ControlNet - virify with BE
	influence: number;
	preprocess: boolean;
};

/**
 * Expected Pusher API response type. Only props related to the FE are included.
 */
export interface ResponseGenerate {
	error: string | null; // Error message
	project_id: string | null;
	prompt_id: string | null;
	type: string | null;
}

export type GenerateHandledResponse = {
	generationData: GenerationData | null;
	generationError: {
		projectId: string;
		generationTool: keyof typeof generationToolsKeys;
		promptId: string;
		errorMessage: string;
	} | null;
};
