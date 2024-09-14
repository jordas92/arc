/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from 'store/common/utils';
import { generationTypes } from 'store/common/keys';
import { GenerationData } from 'store/types/typesCommon';
import {
	ResponseFetchPrompts,
	ResponseFetchPrompt,
	ResponseFetchPromptImages,
	ResponseFetchPromptDetails,
	PromptImages,
	PromptDetails,
} from 'store/types/typesPrompts';
import { ResponseFetchImagesItem } from 'store/types/typesImages';

import {
	ASPECT_RATIO_LOCKED,
	CGF_DEFAULT_VALUE,
	CLIP_SKIP_DEFAULT_VALUE,
	DEFAULT_MODEL_TEXT_TO_IMAGE,
	GENERATION_BATCH_SIZE,
} from 'constants/default';
import { retrieveImageDimensions } from 'utils/imageUtils';
import { handleApectRatio } from '../../utils/aspectRatioUtils';

type generationTypesKeys = keyof typeof generationTypes;

const { CONJURE } = generationTypes;

const {
	valueToString,
	valueToNumber,
	valueToBoolean,
	handleStyles,
	handleThumbValue,
	emptyGenerationData,
} = commonUtils;

export const handleFetchedPrompt = (fetchedPrompt: ResponseFetchPrompt | any): GenerationData => {
	return {
		promptId: valueToString(fetchedPrompt?.id),
		projectId: valueToString(fetchedPrompt?.project_id),
		model: valueToString(fetchedPrompt?.model, DEFAULT_MODEL_TEXT_TO_IMAGE),
		styles: handleStyles(fetchedPrompt?.styles),
		prompt: valueToString(fetchedPrompt?.prompt),
		promptNegative: valueToString(fetchedPrompt?.negative_prompt),
		imageWidth: valueToNumber(fetchedPrompt?.width),
		imageHeight: valueToNumber(fetchedPrompt?.height),
		ratio: handleApectRatio(valueToString(fetchedPrompt?.aspect_ratio), ASPECT_RATIO_LOCKED),
		cfg: valueToNumber(fetchedPrompt?.cfg, CGF_DEFAULT_VALUE),
		clipSkip: valueToNumber(fetchedPrompt?.clip_skip, CLIP_SKIP_DEFAULT_VALUE),
		sampler: valueToString(fetchedPrompt?.sampler),
		transformation: valueToNumber(fetchedPrompt?.transformation),
		type: valueToString(
			fetchedPrompt?.type,
			CONJURE,
		) as (typeof generationTypes)[generationTypesKeys],
		sourceImageUrl: valueToString(fetchedPrompt?.image),
		sourceImageId: valueToString(fetchedPrompt?.image_id),
		sharpness: valueToString(fetchedPrompt?.sharpening),
	};
};

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchPromptsData = (response: ResponseFetchPrompts | any): GenerationData => {
	const defaultPayload = {
		data: [],
	};

	// Takes care of the scenario when 'data' prop is missing in the payload
	const { data: responseData = defaultPayload.data } = response;

	if (Array.isArray(responseData) && responseData.length > 0) {
		const newestPrompt: ResponseFetchPrompt | any = responseData[0];

		return handleFetchedPrompt(newestPrompt);
	}

	return emptyGenerationData;
};

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchPromptData = (response: ResponseFetchPrompt | any): GenerationData => {
	return handleFetchedPrompt(response);
};

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchPromptImagesData = (
	response: ResponseFetchPromptImages | any,
): PromptImages => {
	// FE limitation for the scenario when the BE sends more images than the batch_size (count)!
	// Limit for the displayed generated images
	const limit = GENERATION_BATCH_SIZE;

	const items: PromptImages = {
		projectId: '',
		promptId: '',
		type: '',
		images: [],
	};

	if (Array.isArray(response)) {
		response.forEach((item: ResponseFetchImagesItem) => {
			const { projectId, promptId, type } = items;

			if (!projectId) {
				items.projectId = valueToString(item?.project_id);
			}

			if (!promptId) {
				items.promptId = valueToString(item?.prompt_id);
			}

			if (!type) {
				items.type = valueToString(item?.type);
			}

			if (items.images.length < limit) {
				items.images.push({
					imageId: valueToString(item?.id),
					imageUrl: valueToString(item?.url),
					thumbUrl: handleThumbValue(item?.thumb_url, item?.url),
					isImageNsfw: valueToBoolean(item?.nsfw, true),
					isFavorite: valueToBoolean(item?.favorite),
					promptId: valueToString(item?.prompt_id),
				});
			}
		});
	}

	return items;
};

export const handleFetchPromptDetails = async (
	response: ResponseFetchPromptDetails | any,
): Promise<PromptDetails> => {
	const { imageWidth, imageHeight } = await retrieveImageDimensions(response?.image);
	return {
		promptId: valueToString(response?.prompt_id),
		projectId: valueToString(response?.project_id),
		imageUrl: valueToString(response?.image),
		imageWidth,
		imageHeight,
	};
};
