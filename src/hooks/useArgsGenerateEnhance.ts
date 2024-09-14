/** Copyright (c) 2023-present Kristiyan Dimitrov */

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { generationToolModes, generationToolsKeys } from 'store/common/keys';
import {
	RequestGenerationEnhanceCommon,
	RequestGenerationEnhanceAdvanced,
	RequestGenerationEnhanceSimple,
	MetaIsRequestingGeneration,
} from 'store/types/typesGeneration';

import { fetchConvertImageUrlToBase64 } from 'utils/imageUtils';

const { SIMPLE, ADVANCED } = generationToolModes;
const { TOOL_ENHANCE } = generationToolsKeys;

const useArgsGenerateEnhance = () => {
	const {
		currentProjectId: projectId,
		currentMode, // use for including conditionally the props from SIMPLE and ADVANCED modes
		currentPrompt: prompt,
		currentStyles: styles,
		currentSampler: sampler,
		currentEnhanceTransformation: transformation,
		currentEnhanceModel: enhanceModel,
		currentEnhanceEngine: engine,
		currentEnhanceDetailsStrength: detailsStrength,
		currentEnhanceSharpness: sharpness,
		currentEnhanceScaleFactor: scaleFactor,
		// currentEnhanceIsResizeOn: isResizeOn, // TODO_NEXT use for including conditionally the 'resizedWidth' and 'resizedHeight' props
		currentEnhanceResizedWidth: resizedWidth,
		currentEnhanceResizedHeight: resizedHeight,
		currentEnhanceSourceImage,
	} = useSliceOpenedProjects();

	// Source image data
	const { imageId, imageUrl, imageBase64, imageWidth, imageHeight } = currentEnhanceSourceImage;

	// Used to feed the action 'setIsRequestingGeneration' to set isRequestingGeneration to 'false' if an error occurs
	const meta: MetaIsRequestingGeneration = {
		projectId,
		generationTool: TOOL_ENHANCE,
		isRequestingGeneration: false,
	};

	const commonBodyEnhance = async () => {
		const basicBody = {
			project_id: projectId,
			styles,
			width: imageWidth,
			height: imageHeight,
			prompt,
			transformation,
		};

		// one of the 'image' or 'imageId' must be provided
		if (imageId) {
			return {
				...basicBody,
				image: null,
				image_id: imageId,
			} as RequestGenerationEnhanceCommon;
		}

		const imageUrlToBase64 = await fetchConvertImageUrlToBase64(imageUrl);
		const imageToBase64 = imageBase64 || imageUrlToBase64;

		return {
			...basicBody,
			image: imageToBase64,
			image_id: null,
		} as RequestGenerationEnhanceCommon;
	};

	return async () => {
		const commonBody = await commonBodyEnhance();

		const bodySimple: RequestGenerationEnhanceSimple = {
			...commonBody,
			model: enhanceModel,
			sharpness,
			factor: scaleFactor,
		};

		const bodyAdvanced: RequestGenerationEnhanceAdvanced = {
			...commonBody,
			sampler,
			details_strength: detailsStrength,
			engine_type: engine,
			factor: scaleFactor,
			resized_width: resizedWidth,
			resized_height: resizedHeight,
		};

		switch (currentMode) {
			case SIMPLE:
				return {
					body: bodySimple,
					meta,
				};

			case ADVANCED:
				return {
					body: bodyAdvanced,
					meta,
				};

			default:
				return {
					body: bodySimple,
					meta,
				};
		}
	};
};

export default useArgsGenerateEnhance;
