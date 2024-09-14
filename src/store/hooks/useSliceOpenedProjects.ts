/** Copyright (c) 2023-present Kristiyan Dimitrov */

import {
	CGF_DEFAULT_VALUE,
	CLIP_SKIP_DEFAULT_VALUE,
	DEFAULT_TRANSFORMATION_VALUE,
} from 'constants/default';

import useStoreSelector from './useStoreSelector';
import { generationToolsKeys } from '../common/keys';
import {
	GenerationToolTextToImage,
	GenerationToolImageToImage,
	GenerationToolEnhance,
	CommonSettingsView,
} from '../storeSlices/sliceOpenedProjects';

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;

/**
 * Provides data from the global state store for `slice Opened Projects`
 */
function useSliceOpenedProjects() {
	const sliceOpenedProjects = useStoreSelector((state) => state.sliceOpenedProjects);

	const { currentProjectId, openedDrawer, openedProjects } = sliceOpenedProjects;

	// Taking care of the props (default values). The openedProjects object initially is empty!
	// The components consuming this data will be rendered before the store is set up.

	const defaultInPaintObj = {
		isInPaintMode: false,
		imageId: '',
		imageUrl: '',
		base64Image: '',
		isImageNsfw: true,
		mask: '',
		inPaintType: '',
		maskInvert: false,
		sourceImageOrigin: '',
		isMaskVisible: false,
		isDrawing: false,
		isCursorDrawing: false,
		drawingLines: [],
		brushSize: 0,
		brushOpacity: 0,
		brushColor: {},
		tool: '',
		cursorPosition: { x: 0, y: 0 },
		isCanvasInitialized: false,
		initCanvasContainerDimensions: { width: 0, height: 0 },
	};

	if (currentProjectId) {
		const currentProject = openedProjects[currentProjectId];
		const {
			projectTitle: currentProjectTitle,
			generationsHistory,
			currentGenerationTool,
			generationTools,
			settingsViews,
		} = currentProject;

		const currentGenerationToolObj = generationTools[
			currentGenerationTool
		] as GenerationToolImageToImage;

		const currentEnhanceToolObj = generationTools[TOOL_ENHANCE] as GenerationToolEnhance;

		const currentTextToImageToolObj = generationTools[
			TEXT_TO_IMAGE
		] as GenerationToolTextToImage;

		const currentImageToImageToolObj = generationTools[
			IMAGE_TO_IMAGE
		] as GenerationToolImageToImage;

		const currentSettingsView = settingsViews[currentGenerationTool] as CommonSettingsView;

		const {
			mode: currentMode,
			model: currentModel,
			styles: currentStyles,
			imageWidth: currentImageWidth,
			imageHeight: currentImageHeight,
			originalSourceImageWidth: currentOriginalSourceImageWidth,
			originalSourceImageHeight: currentOriginalSourceImageHeight,
			ratio: currentRatio,
			cfg: currentCfg,
			clipSkip: currentClipSkip,
			promptNegative: currentNegativePrompt,
			prompt: currentPrompt,
			isAspectRatioPortrait: currentIsApectRatioPortrait,
			isRequestingGeneration: currentIsRequestingGeneration,
			activeImageIndex: currentActiveImageIndex,
			sampler: currentSampler,
			inPaint: currentInPaintObj = defaultInPaintObj,
			transformation: currentInpaintTransformation,
			transformationPrevValue: currentInpaintTransformationPrevValue,
		} = currentGenerationToolObj;

		const {
			isInPaintMode: currentIsInPaintMode,
			imageId: currentInPaintImageId,
			imageUrl: currentInPaintImageUrl,
			base64Image: currentInPaintImageBase64,
			isImageNsfw: currentInPaintImageIsNsfw,
			mask: currentInPaintMask,
			inPaintType: currentInPaintType,
			maskInvert: currentInPaintMaskInvert,
			isMaskVisible: currentInPaintMaskVisible,
			isDrawing: currentInPaintIsDrawing,
			isCursorDrawing: currentInPaintIsCursorDrawing,
			drawingLines: currentInPaintDrawingLines,
			sourceImageOrigin: currentInPaintSourceImageOrigin,
			brushColor: currentInPaintBrushColor,
			brushOpacity: currentInPaintBrushOpacity,
			brushSize: currentInPaintBrushSize,
			tool: currentInPaintTool,
			cursorPosition: currentInPaintCursorPosition,
			initCanvasContainerDimensions: currentInitCanvasContainerDimensions,
		} = currentInPaintObj;

		const {
			// 'mode', 'prompt', 'styles', and 'sampler' will be retrieved from 'currentGenerationToolObj'
			transformation: currentEnhanceTransformation,
			model: currentEnhanceModel,
			engine: currentEnhanceEngine,
			detailsStrength: currentEnhanceDetailsStrength,
			sharpness: currentEnhanceSharpness,
			scaleFactor: currentEnhanceScaleFactor,
			isResizeOn: currentEnhanceIsResizeOn,
			resizeStrength: currentEnhanceResizeStrength,
			resizedWidth: currentEnhanceResizedWidth,
			resizedHeight: currentEnhanceResizedHeight,
			sourceImage: currentEnhanceSourceImage,
			isRequestingGeneration: isRequestingGenerationEnhance,
		} = currentEnhanceToolObj;

		const {
			isGenerationContainerHidden: currentIsGenerationContainerHidden,
			isNegativePromptExpanded: currentIsNegativePromptExpanded,
		} = currentSettingsView;

		const currentGeneration = (currentGenerationTool: keyof typeof generationToolsKeys) => {
			// The first (last generated) item
			const generation = generationsHistory[currentGenerationTool][0];

			return generation || null;
		};

		return {
			openedProjects,
			openedDrawer,
			currentProjectId,
			currentProjectTitle,
			currentPrompt,
			currentNegativePrompt,
			currentGenerationTool,
			currentMode,
			currentModel,
			currentStyles,
			currentImageWidth,
			currentImageHeight,
			currentOriginalSourceImageWidth,
			currentOriginalSourceImageHeight,
			currentRatio,
			currentCfg,
			currentClipSkip,
			currentIsApectRatioPortrait,
			currentIsRequestingGeneration,
			currentActiveImageIndex,
			currentSampler,
			currentIsNegativePromptExpanded,
			currentIsGenerationContainerHidden,
			currentGeneration: currentGeneration(currentGenerationTool),
			currentIsInPaintMode,
			currentInpaintTransformation,
			currentInpaintTransformationPrevValue,
			currentInPaintImageId,
			currentInPaintImageUrl,
			currentInPaintImageBase64,
			currentInPaintImageIsNsfw,
			currentInPaintMask,
			currentInPaintType,
			currentInPaintMaskInvert,
			currentInPaintMaskVisible,
			currentInPaintIsDrawing,
			currentInPaintIsCursorDrawing,
			currentInPaintDrawingLines,
			currentInPaintSourceImageOrigin,
			currentInPaintBrushSize,
			currentInPaintBrushColor,
			currentInPaintBrushOpacity,
			currentInPaintCursorPosition,
			currentInitCanvasContainerDimensions,
			currentInPaintTool,
			currentEnhanceTransformation,
			currentEnhanceModel,
			currentEnhanceEngine,
			currentEnhanceDetailsStrength,
			currentEnhanceSharpness,
			currentEnhanceScaleFactor,
			currentEnhanceIsResizeOn,
			currentEnhanceResizeStrength,
			currentEnhanceResizedWidth,
			currentEnhanceResizedHeight,
			currentEnhanceSourceImage,
			isRequestingGenerationEnhance,
			isRequestingGenerationTextToImage: currentTextToImageToolObj.isRequestingGeneration,
			isRequestingGenerationImageToImage: currentImageToImageToolObj.isRequestingGeneration,
		};
	}

	return {
		openedProjects,
		openedDrawer: '',
		currentProjectId: '',
		currentProjectTitle: '',
		currentPrompt: '',
		currentNegativePrompt: '',
		currentIsApectRatioPortrait: false,
		currentGenerationTool: TEXT_TO_IMAGE,
		currentMode: '',
		currentModel: '',
		currentStyles: [],
		currentImageWidth: 0,
		currentImageHeight: 0,
		currentRatio: '',
		currentCfg: CGF_DEFAULT_VALUE,
		currentClipSkip: CLIP_SKIP_DEFAULT_VALUE,
		currentIsRequestingGeneration: false,
		currentActiveImageIndex: 0,
		currentSampler: '',
		currentIsGenerationContainerHidden: false,
		currentIsNegativePromptExpanded: true,
		currentGeneration: null,
		currentInpaintTransformation: DEFAULT_TRANSFORMATION_VALUE,
		currentInpaintTransformationPrevValue: DEFAULT_TRANSFORMATION_VALUE,
		currentIsInPaintMode: defaultInPaintObj.isInPaintMode,
		currentInPaintImageId: defaultInPaintObj.imageId,
		currentInPaintImageUrl: defaultInPaintObj.imageUrl,
		currentInitCanvasContainerDimensions: defaultInPaintObj.initCanvasContainerDimensions,
		currentInPaintImageBase64: defaultInPaintObj.base64Image,
		currentInPaintImageIsNsfw: defaultInPaintObj.isImageNsfw,
		currentInPaintMask: defaultInPaintObj.mask,
		currentInPaintType: defaultInPaintObj.inPaintType,
		currentInPaintMaskInvert: defaultInPaintObj.maskInvert,
		currentInPaintVisibleMask: defaultInPaintObj.mask,
		currentInPaintSourceImageOrigin: defaultInPaintObj.sourceImageOrigin,
		currentEnhanceTransformation: 0,
		currentEnhanceModel: '',
		currentEnhanceEngine: '',
		currentEnhanceDetailsStrength: 0,
		currentEnhanceScaleFactor: 2,
		currentEnhanceSharpness: '',
		currentEnhanceIsResizeOn: false,
		currentEnhanceResizeStrength: 0,
		currentEnhanceResizedWidth: 0,
		currentEnhanceResizedHeight: 0,
		currentEnhanceSourceImage: {
			imageBase64: '',
			imageId: '',
			imageUrl: '',
			imageWidth: 0,
			imageHeight: 0,
		},
		isRequestingGenerationEnhance: false,
		isRequestingGenerationTextToImage: false,
		isRequestingGenerationImageToImage: false,
	};
}

export default useSliceOpenedProjects;
