/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceUser from 'store/hooks/useSliceUser';
// TODO_ControlNet
// import useSliceControlNet from 'store/hooks/useSliceControlNet';
import {
	setIsRequestingGeneration,
	setIsGenerationContainerHidden,
	toggleInPaintMaskVisible,
} from 'store/storeSlices/sliceOpenedProjects';
import { openModal } from 'store/storeSlices/sliceApp';
import { showNotification } from 'store/storeSlices/sliceNotification';
import {
	useGenerateImageToImageMutation,
	useGenerateInPaintMutation,
	useGenerateTextToImageMutation,
} from 'store/apis/apiGeneration';
import { generationToolsKeys, modalsKeys } from 'store/common/keys';
import {
	RequestGenerationCommon,
	RequestGenerationConjure,
	RequestGenerationTransform,
	RequestGenerationInPaint,
	MetaIsRequestingGeneration,
	// RequestControlNetTools,
} from 'store/types/typesGeneration';

import {
	CREDITS_COST_GENERAL,
	BUY_CREDITS_THRESHOLD_GENERAL,
	GENERATION_BATCH_SIZE,
	GENERATION_STEPS,
} from 'constants/default';
import { validateImageDimensions, validateImageSource } from 'utils/commonUtils';
import { fetchConvertImageUrlToBase64 } from 'utils/imageUtils';
import { DropdownGeneration } from 'components/Common/DropdownGeneration';
import SplitButton from 'components/Common/SplitButton';
import { conditionalBtnContent } from './conditionalBtnContent';

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE } = generationToolsKeys;
const { CREDITS } = modalsKeys;

const BtnGenerate: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { creditsBalance } = useSliceUser();

	const {
		currentGenerationTool,
		currentImageWidth,
		currentImageHeight,
		currentPrompt,
		currentModel,
		currentStyles,
		currentNegativePrompt,
		currentProjectId,
		currentRatio,
		currentCfg,
		currentClipSkip,
		currentIsRequestingGeneration,
		currentInpaintTransformation,
		currentInPaintMask,
		currentInPaintMaskInvert,
		currentInPaintType,
		currentInPaintImageUrl: sourceImageUrl,
		currentInPaintImageId: sourceImageId,
		currentInPaintImageBase64: sourceImagebase64,
		currentIsInPaintMode,
		currentInPaintSourceImageOrigin,
		currentSampler,
	} = useSliceOpenedProjects();

	// TODO_ControlNet
	// const { currentControlNetTool, controlNetTools } = useSliceControlNet();

	const [generateTextToImage] = useGenerateTextToImageMutation();
	const [generateImageToImage] = useGenerateImageToImageMutation();
	const [generateInPaint] = useGenerateInPaintMutation();

	// TODO_ControlNet
	// const controlNetToolArgs = (): Array<RequestControlNetTools> => {
	// 	if (currentControlNetTool) {
	// 		const { controlNetGenerationData } = controlNetTools[currentControlNetTool];
	// 		const { preProcessedImageUrl, sourceImageUrl, sourceImageBase64, isImagePreprocessed } =
	// 			controlNetGenerationData;

	// 		let toolImage = preProcessedImageUrl;

	// 		if (!toolImage) {
	// 			toolImage = sourceImageUrl || sourceImageBase64;
	// 		}

	// 		return [
	// 			{
	// 				key: currentControlNetTool.toLowerCase(),
	// 				image: toolImage,
	// 				mask: null, // BE requirement
	// 				influence: controlNetGenerationData.influence,
	// 				preprocess: !isImagePreprocessed,
	// 			},
	// 		];
	// 	}

	// 	return [];
	// };

	// Used to feed the action 'setIsRequestingGeneration' to set isRequestingGeneration to 'false' if an error occurs
	const meta: MetaIsRequestingGeneration = {
		projectId: currentProjectId,
		generationTool: currentGenerationTool,
		isRequestingGeneration: false,
	};

	const commonBody: RequestGenerationCommon = {
		project_id: currentProjectId,
		count: GENERATION_BATCH_SIZE,
		aspect_ratio: currentRatio,
		model: currentModel,
		styles: currentStyles,
		width: currentImageWidth,
		height: currentImageHeight,
		prompt: currentPrompt,
		negative_prompt: currentNegativePrompt,
		cfg: currentCfg,
		clip_skip: currentClipSkip,
		sampler: currentSampler,
		steps: GENERATION_STEPS,
		// TODO_ControlNet
		// tools: controlNetToolArgs(),
	};

	const argsGenerateConjure: {
		body: RequestGenerationConjure;
		meta: MetaIsRequestingGeneration;
	} = {
		body: commonBody,
		meta,
	};

	const argsGenerateTransform = async () => {
		// one of the 'image' or 'image_id' must be provided
		if (sourceImageId) {
			return {
				body: {
					...commonBody,
					transformation: currentInpaintTransformation,
					image: null,
					image_id: sourceImageId,
				},
				meta,
			};
		}

		const sourceImageUrlToBase64 = await fetchConvertImageUrlToBase64(sourceImageUrl);
		const imageToBase64 = sourceImageUrlToBase64 || sourceImagebase64;

		return {
			body: {
				...commonBody,
				transformation: currentInpaintTransformation,
				image: imageToBase64,
				image_id: null,
			},
			meta,
		};
	};

	const argsGenerateInPaint = async () => {
		// one of the 'image' or 'imageId' must be provided
		if (sourceImageId) {
			return {
				body: {
					...commonBody,
					transformation: currentInpaintTransformation,
					image: null,
					image_id: sourceImageId,
					// Inpaint related
					mask: currentInPaintMask,
					mask_invert: currentInPaintMaskInvert,
					inpaint_type: currentInPaintType.toLowerCase(),
				},
				meta,
			};
		}

		const sourceImageUrlToBase64 = await fetchConvertImageUrlToBase64(sourceImageUrl);
		const imageToBase64 = sourceImageUrlToBase64 || sourceImagebase64;

		return {
			body: {
				...commonBody,
				transformation: currentInpaintTransformation,
				image: imageToBase64,
				image_id: null,
				// Inpaint related
				mask: currentInPaintMask,
				mask_invert: currentInPaintMaskInvert,
				inpaint_type: currentInPaintType.toLowerCase(),
			},
			meta,
		};
	};

	const startPreGeneration = () => {
		dispatch(setIsGenerationContainerHidden(false));

		dispatch(
			setIsRequestingGeneration({
				projectId: currentProjectId,
				generationTool: currentGenerationTool,
				isRequestingGeneration: true,
			}),
		);
	};

	const handleOnClickGenerate = async () => {
		const { isLimitExceeded, message } = validateImageSource(
			currentImageWidth,
			currentImageHeight,
			currentInPaintSourceImageOrigin,
		);

		if (creditsBalance <= BUY_CREDITS_THRESHOLD_GENERAL) {
			dispatch(openModal({ type: CREDITS }));
		}

		if (creditsBalance >= CREDITS_COST_GENERAL) {
			switch (currentGenerationTool) {
				case TEXT_TO_IMAGE: {
					const { isLimitExceeded: isImageDimensionsLimitExceeded, validationMessage } =
						validateImageDimensions(
							currentImageWidth,
							currentImageHeight,
							currentModel,
						);

					if (isImageDimensionsLimitExceeded) {
						dispatch(
							showNotification({
								message: validationMessage,
								severity: 'warning',
							}),
						);
					} else {
						startPreGeneration();
						generateTextToImage(argsGenerateConjure);
					}

					break;
				}

				case IMAGE_TO_IMAGE:
					dispatch(toggleInPaintMaskVisible(false));
					if (isLimitExceeded) {
						dispatch(
							showNotification({
								message,
								severity: 'warning',
								autohide: false,
								closeOnClickAway: false,
							}),
						);
					} else {
						startPreGeneration();

						if (currentInPaintMask) {
							const args: {
								body: RequestGenerationInPaint;
								meta: MetaIsRequestingGeneration;
							} = await argsGenerateInPaint();

							generateInPaint(args);
						} else {
							const args: {
								body: RequestGenerationTransform;
								meta: MetaIsRequestingGeneration;
							} = await argsGenerateTransform();

							generateImageToImage(args);
						}
					}
					break;

				default:
					break;
			}
		}
	};

	const { tooltip, btnContent } = conditionalBtnContent(
		currentGenerationTool,
		currentIsInPaintMode,
		currentIsRequestingGeneration,
		currentPrompt,
	);

	const isGenerateButtonDisabled = currentIsRequestingGeneration || !currentPrompt;

	return (
		<Tooltip title={tooltip} placement="top" arrow>
			<Box sx={{ position: 'relative' }}>
				<SplitButton
					text={btnContent}
					content={<DropdownGeneration />}
					disabled={isGenerateButtonDisabled}
					onClick={handleOnClickGenerate}
				/>
			</Box>
		</Tooltip>
	);
};

export default BtnGenerate;
