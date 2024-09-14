/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	drawersKeys,
	generationToolModes,
	generationToolsKeys,
	generationTypes,
} from 'store/common/keys';
import { Generation, GenerationImage, PromptImages } from 'store/types/typesPrompts';
import { Samplers } from 'store/types/typesSamplers';
import { ProjectOpenedInit } from 'store/types/typesProjects';
import { MetaIsRequestingGeneration } from 'store/types/typesGeneration';
import {
	TextToImageGenerationData,
	ImageToImageGenerationData,
	EnhanceGenerationData,
	GenerationData,
} from 'store/types/typesCommon';
import commonUtils from 'store/common/utils';

import {
	ASPECT_RATIO_LOCKED,
	ASPECT_RATIO_ONE_TO_ONE,
	CGF_DEFAULT_VALUE,
	CLIP_SKIP_DEFAULT_VALUE,
	DEFAULT_MODEL_TEXT_TO_IMAGE,
	DEFAULT_MODEL_IMAGE_TO_IMAGE,
	DEFAULT_TRANSFORMATION_VALUE,
	DEFAULT_CREATIVITY_VALUE,
	DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_IMAGE_TO_IMAGE,
	DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_TEXT_TO_IMAGE,
	inPaintToolsKeys,
} from 'constants/default';
import { reverseRatioValue, handleIsAspectRatioPortrait } from 'utils/aspectRatioUtils';

import { CanvasStateTypes } from '../../utils/canvas/canvasTypes';

const {
	toggleIsImageFavorite,
	generationToolFromGenerationType,
	handleDataForGenerationToolStore,
	emptyGenerationData,
} = commonUtils;

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { SIMPLE } = generationToolModes;
const { BRUSH } = inPaintToolsKeys;

type generationTypesKeys = keyof typeof generationTypes;

export interface GenerationToolCommon {
	mode: keyof typeof generationToolModes;
	model: string;
	styles: Array<string>;
	imageWidth: number;
	imageHeight: number;
	ratio: string;
	isAspectRatioPortrait: boolean;
	cfg: number;
	clipSkip: number;
	promptNegative: string;
	prompt: string;
	isRequestingGeneration: boolean;
	activeImageIndex: number;
	sampler: string;
}

export type GenerationToolTextToImage = GenerationToolCommon;

export interface GenerationToolImageToImage extends GenerationToolCommon {
	transformation: number;
	transformationPrevValue: number;
	originalSourceImageWidth: number;
	originalSourceImageHeight: number;
	inPaint: CanvasStateTypes;
}

export type GenerationToolEnhance = {
	mode: keyof typeof generationToolModes;
	transformation: number;
	model: string;
	engine: string;
	sampler: string;
	detailsStrength: number;
	sharpness: string;
	scaleFactor: number;
	isResizeOn: boolean;
	resizeStrength: number;
	resizedWidth: number;
	resizedHeight: number;
	styles: Array<string>;
	prompt: string;
	isRequestingGeneration: boolean;
	sourceImage: {
		imageBase64: string;
		imageId: string;
		imageUrl: string;
		imageWidth: number;
		imageHeight: number;
	};
};

export type CommonSettingsView = {
	isGenerationContainerHidden: boolean;
	isNegativePromptExpanded: boolean;
};

export type EnhanceSettingsView = Pick<CommonSettingsView, 'isGenerationContainerHidden'>;

type OpenedProject = {
	projectTitle: string;
	isDiscord: boolean;
	generationsHistory: {
		[TEXT_TO_IMAGE]: Array<Generation>;
		[IMAGE_TO_IMAGE]: Array<Generation>;
		[TOOL_ENHANCE]: Array<Generation>;
	};
	currentGenerationTool: keyof typeof generationToolsKeys;
	generationTools: {
		[TEXT_TO_IMAGE]: GenerationToolTextToImage;
		[IMAGE_TO_IMAGE]: GenerationToolImageToImage;
		[TOOL_ENHANCE]: GenerationToolEnhance;
	};
	settingsViews: {
		[TEXT_TO_IMAGE]: CommonSettingsView;
		[IMAGE_TO_IMAGE]: CommonSettingsView;
		[TOOL_ENHANCE]: EnhanceSettingsView;
	};
};

type Slice = {
	currentProjectId: string;
	openedDrawer: keyof typeof drawersKeys | string;
	openedProjects: {
		[projectId: string]: OpenedProject;
	};
};

export const initialCanvasState: CanvasStateTypes = {
	isInPaintMode: false, // TODO should be isCanvasInitialized
	imageUrl: '',
	imageId: '',
	base64Image: '',
	isImageNsfw: true,
	mask: '',
	maskInvert: false,
	isMaskVisible: false,
	inPaintType: 'Refine',
	isDrawing: false,
	isCursorDrawing: false,
	drawingLines: [],
	sourceImageOrigin: '',
	brushColor: { r: 222, g: 4, b: 164 },
	brushSize: 50,
	brushOpacity: 0.7,
	tool: BRUSH,
	cursorPosition: { x: 0, y: 0 },
	isCanvasInitialized: false,
	initCanvasContainerDimensions: { width: 0, height: 0 },
	// CHECK
	// boundingBoxCoordinates: { x: 0, y: 0 },
	// boundingBoxDimensions: { width: 512, height: 512 },
	// boundingBoxPreviewFill: { r: 0, g: 0, b: 0, a: 0.5 },
	// boundingBoxScaleMethod: 'auto',
	colorPickerColor: { r: 90, g: 90, b: 255, a: 1 },
	isMaskEnabled: true,
	layer: 'base',
	maskColor: { r: 255, g: 90, b: 90, a: 1 },
	minimumStageScale: 1,
	scaledBoundingBoxDimensions: { width: 512, height: 512 },
	stageCoordinates: { x: 0, y: 0 },
	stageDimensions: { width: 0, height: 0 },
	stageScale: 1,
};

// TODO  move all default store values as consts on one place!!!
const newOpenedProject: OpenedProject = {
	projectTitle: '',
	isDiscord: false,
	generationsHistory: {
		[TEXT_TO_IMAGE]: [],
		[IMAGE_TO_IMAGE]: [],
		[TOOL_ENHANCE]: [],
	},
	currentGenerationTool: TEXT_TO_IMAGE,
	generationTools: {
		[TEXT_TO_IMAGE]: {
			mode: SIMPLE,
			model: DEFAULT_MODEL_TEXT_TO_IMAGE,
			styles: [],
			imageWidth: DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_TEXT_TO_IMAGE,
			imageHeight: DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_TEXT_TO_IMAGE,
			ratio: ASPECT_RATIO_ONE_TO_ONE,
			isAspectRatioPortrait: false,
			cfg: CGF_DEFAULT_VALUE,
			clipSkip: CLIP_SKIP_DEFAULT_VALUE,
			promptNegative: '',
			prompt: '',
			isRequestingGeneration: false,
			activeImageIndex: 0,
			sampler: '', // The default value comes from the BE (CMS)
		},
		[IMAGE_TO_IMAGE]: {
			mode: SIMPLE,
			model: DEFAULT_MODEL_IMAGE_TO_IMAGE,
			styles: [],
			imageWidth: DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_IMAGE_TO_IMAGE,
			imageHeight: DEFAULT_ASPECT_RATIO_IMAGE_DIMENSION_IMAGE_TO_IMAGE,
			originalSourceImageWidth: 0,
			originalSourceImageHeight: 0,
			ratio: ASPECT_RATIO_LOCKED,
			isAspectRatioPortrait: false,
			cfg: CGF_DEFAULT_VALUE,
			clipSkip: CLIP_SKIP_DEFAULT_VALUE,
			promptNegative: '',
			prompt: '',
			isRequestingGeneration: false,
			activeImageIndex: 0,
			sampler: '', // The default value comes from the BE (CMS)
			transformation: DEFAULT_TRANSFORMATION_VALUE,
			transformationPrevValue: DEFAULT_TRANSFORMATION_VALUE,
			inPaint: initialCanvasState,
		},
		[TOOL_ENHANCE]: {
			mode: SIMPLE,
			transformation: DEFAULT_CREATIVITY_VALUE,
			model: '', // The default is set after a successful EnhanceModels API response (the first item)
			engine: 'engine_1', // TODO_ENHANCE - change when an API is available
			sampler: '', // The default value comes from the BE (CMS)
			detailsStrength: 0, // 50%
			scaleFactor: 2,
			sharpness: 'med',
			isResizeOn: false,
			resizeStrength: 0,
			resizedWidth: 0,
			resizedHeight: 0,
			styles: [],
			prompt: '',
			isRequestingGeneration: false,
			sourceImage: {
				imageBase64: '',
				imageId: '',
				imageUrl: '',
				imageWidth: 0,
				imageHeight: 0,
			},
		},
	},
	settingsViews: {
		[TEXT_TO_IMAGE]: {
			isGenerationContainerHidden: false,
			isNegativePromptExpanded: true,
		},
		[IMAGE_TO_IMAGE]: {
			isGenerationContainerHidden: false,
			isNegativePromptExpanded: true,
		},
		[TOOL_ENHANCE]: {
			isGenerationContainerHidden: false,
		},
	},
};

const initialState: Slice = {
	currentProjectId: '',
	openedDrawer: '',
	openedProjects: {},
};

/**
 * Helper function. Provides easy access to the 'current' Project.
 * Returns the object of the 'current' Project.
 * ('current' === displayed on the screen)
 */
const currentProjectObj = (state: Slice): OpenedProject => {
	return state.openedProjects[state.currentProjectId];
};

/**
 * Helper function. Provides easy access to the 'current' Generation Tool.
 * Returns the object of the 'current' Generation Tool of the 'current' Project.
 * ('current' === displayed on the screen)
 */
const currentGenerationToolObj = (state: Slice) => {
	const { currentGenerationTool, generationTools } = currentProjectObj(state);

	return generationTools[currentGenerationTool];
};

/**
 * Helper function. Provides easy access to the 'current' Settings View.
 * Returns the object of the 'current' Settings View for the 'current' Generation Tool of the 'current' Project.
 * ('current' === displayed on the screen)
 */
const currentSettingsView = (state: Slice): CommonSettingsView | EnhanceSettingsView => {
	const { currentGenerationTool, settingsViews } = currentProjectObj(state);

	return settingsViews[currentGenerationTool];
};

export const sliceOpenedProjects = createSlice({
	name: 'sliceOpenedProjects',
	initialState,
	reducers: {
		setOpenedProject(state: Slice, action: PayloadAction<ProjectOpenedInit>) {
			const { projectId, projectTitle, isDiscord, currentGenerationTool } = action.payload;

			state.currentProjectId = projectId;
			state.openedProjects[projectId] = {
				...newOpenedProject,
				projectTitle,
				isDiscord,
				currentGenerationTool,
			};
		},

		setCurrentProjectId(state: Slice, action: PayloadAction<string>) {
			state.currentProjectId = action.payload;
		},

		clearCurrentProjectId(state: Slice) {
			state.currentProjectId = '';
		},

		openDrawerWithType(state: Slice, action: PayloadAction<keyof typeof drawersKeys>) {
			state.openedDrawer = action.payload;
		},

		closeDrawer(state: Slice) {
			state.openedDrawer = '';
		},

		// currentProject
		setGenerationTool(state: Slice, action: PayloadAction<keyof typeof generationToolsKeys>) {
			const currentProject = currentProjectObj(state);
			currentProject.currentGenerationTool = action.payload;
		},

		// currentProject
		updateCurrentProjectTitle(state: Slice, action: PayloadAction<string>) {
			const currentProject = currentProjectObj(state);
			currentProject.projectTitle = action.payload;
		},

		// project
		// Usage - generation started successfully
		setInitialGenerationHistoryItem(
			state: Slice,
			action: PayloadAction<{
				projectId: string;
				promptId: string;
				generationTool: keyof typeof generationToolsKeys;
			}>,
		) {
			const { projectId, promptId, generationTool } = action.payload;

			const project = state.openedProjects[projectId];

			if (project) {
				const historyItem: Generation = {
					promptId,
					isGenerating: true,
					generationData: emptyGenerationData,
					images: [],
				};

				project.generationsHistory[generationTool].unshift(historyItem);
			}
		},

		// project
		// Usage - navigate to Project from Projects page
		addGenerationHistoryItem(state: Slice, action: PayloadAction<GenerationData>) {
			const { projectId, promptId, type } = action.payload;

			const project = state.openedProjects[projectId];

			if (project) {
				const generationTool = generationToolFromGenerationType(type);

				const historyItem: Generation = {
					promptId,
					isGenerating: false,
					generationData: action.payload,
					images: [], // check 'addImagesToGenerationHistoryItem'
				};

				project.generationsHistory[generationTool].unshift(historyItem);
			}
		},

		// project
		// Usage - feed generationHistory item with prompt's generated images fetched by promptId
		addImagesToGenerationHistoryItem(state: Slice, action: PayloadAction<PromptImages>) {
			const { projectId, promptId, type, images } = action.payload;

			const project = state.openedProjects[projectId];

			if (project) {
				const generationTool = generationToolFromGenerationType(type);

				project.generationsHistory[generationTool].forEach((item: Generation) => {
					if (item.promptId === promptId) {
						// The images array must be available and empty, created on the previous step 'addGenerationHistoryItem'
						item.images = images;
					}
				});
			}
		},

		// project
		// Usage - on succsess Pusher response
		updateDataToGenerationHistoryItem(state: Slice, action: PayloadAction<GenerationData>) {
			const { projectId, promptId, type } = action.payload;

			const project = state.openedProjects[projectId];

			if (project) {
				const generationTool = generationToolFromGenerationType(type);

				project.generationsHistory[generationTool].forEach((item: Generation) => {
					if (item.promptId === promptId) {
						item.generationData = action.payload;
					}
				});
			}
		},

		// project
		setIsGeneratingToGenerationHistoryItem(
			state: Slice,
			action: PayloadAction<{
				projectId: string;
				promptId: string;
				generationTool: keyof typeof generationToolsKeys;
				isGenerating: boolean;
			}>,
		) {
			const { projectId, promptId, generationTool, isGenerating } = action.payload;

			const project = state.openedProjects[projectId];

			if (project) {
				project.generationsHistory[generationTool].forEach((item: Generation) => {
					if (item.promptId === promptId) {
						item.isGenerating = isGenerating;
					}
				});
			}
		},

		setGenerationDataToProject(
			state: Slice,
			action: PayloadAction<{
				data: GenerationData;
				sourceImageDimensions: { imageWidth: number; imageHeight: number };
			}>,
		) {
			const { data, sourceImageDimensions } = action.payload;
			const { projectId, type, sourceImageUrl, sourceImageId } = data;

			const project = state.openedProjects[projectId];

			if (project) {
				const generationTool = generationToolFromGenerationType(type);
				const handledData = handleDataForGenerationToolStore(generationTool, data);

				if (generationTool === TEXT_TO_IMAGE) {
					project.generationTools[TEXT_TO_IMAGE] = {
						...project.generationTools[TEXT_TO_IMAGE],
						...handledData,
					};
				}

				if (generationTool === IMAGE_TO_IMAGE) {
					project.generationTools[IMAGE_TO_IMAGE] = {
						...project.generationTools[IMAGE_TO_IMAGE],
						...handledData,
						originalSourceImageWidth: sourceImageDimensions.imageWidth,
						originalSourceImageHeight: sourceImageDimensions.imageHeight,
						inPaint: {
							...project.generationTools[IMAGE_TO_IMAGE].inPaint,
							imageId: sourceImageId,
							imageUrl: sourceImageUrl,
							// By default isImageNsfw = true (for safety reasons)
							// If the image was uploaded we have to have sourceImageUrl, and we do not have control is it NSFW
							isImageNsfw: false,
						},
					};
				}

				if (generationTool === TOOL_ENHANCE) {
					project.generationTools[TOOL_ENHANCE] = {
						...project.generationTools[TOOL_ENHANCE],
						...handledData,
						sourceImage: {
							...project.generationTools[TOOL_ENHANCE].sourceImage,
							imageUrl: sourceImageUrl,
							imageId: sourceImageId,
							imageWidth: sourceImageDimensions.imageWidth,
							imageHeight: sourceImageDimensions.imageHeight,
						},
					};
				}
			}
		},

		// generationTool
		setGeneratedImageAsSource(
			state: Slice,
			action: PayloadAction<{
				sourceImageId: string;
				isImageNsfw: boolean;
				sourceImageUrl: string;
				sourceImageUrlDimensions: { imageWidth: number; imageHeight: number };
				generationTool: string;
			}>,
		) {
			const {
				sourceImageId,
				isImageNsfw,
				sourceImageUrl,
				sourceImageUrlDimensions,
				generationTool,
			} = action.payload;

			const currentProject = currentProjectObj(state);

			if (generationTool === IMAGE_TO_IMAGE) {
				currentProject.generationTools[IMAGE_TO_IMAGE] = {
					...currentProject.generationTools[IMAGE_TO_IMAGE],
					originalSourceImageWidth: sourceImageUrlDimensions.imageWidth,
					originalSourceImageHeight: sourceImageUrlDimensions.imageHeight,
					inPaint: {
						...currentProject.generationTools[IMAGE_TO_IMAGE].inPaint,
						imageId: sourceImageId,
						imageUrl: sourceImageUrl,
						isImageNsfw,
					},
				};
			}

			if (generationTool === TOOL_ENHANCE) {
				currentProject.generationTools[TOOL_ENHANCE] = {
					...currentProject.generationTools[TOOL_ENHANCE],
					sourceImage: {
						...currentProject.generationTools[TOOL_ENHANCE].sourceImage,
						imageId: sourceImageId,
						imageUrl: sourceImageUrl,
						imageWidth: sourceImageUrlDimensions.imageWidth,
						imageHeight: sourceImageUrlDimensions.imageHeight,
					},
				};
			}
		},

		// Enhance
		setTransformSourceImageData: (
			state: Slice,
			action: PayloadAction<{
				imageId: string;
				imageUrl: string;
				base64Image: string;
				isImageNsfw: boolean;
				imageWidth: number;
				imageHeight: number;
				sourceImageOrigin: string;
			}>,
		) => {
			const {
				imageId,
				imageUrl,
				base64Image,
				isImageNsfw,
				imageWidth,
				imageHeight,
				sourceImageOrigin,
			} = action.payload;

			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE] = {
				...currentProject.generationTools[IMAGE_TO_IMAGE],
				imageWidth,
				imageHeight,
				originalSourceImageWidth: imageWidth,
				originalSourceImageHeight: imageHeight,
				ratio: ASPECT_RATIO_LOCKED,
				inPaint: {
					...currentProject.generationTools[IMAGE_TO_IMAGE].inPaint,
					imageId,
					imageUrl,
					base64Image,
					isImageNsfw,
					sourceImageOrigin,
				},
			};
		},

		// generationTool
		setMode(state: Slice, action: PayloadAction<keyof typeof generationToolModes>) {
			const currentTool = currentGenerationToolObj(state);

			currentTool.mode = action.payload;
		},

		// generationTool
		setPrompt(state: Slice, action: PayloadAction<string>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.prompt = action.payload;
		},

		// generationTool
		setNegativePrompt(state: Slice, action: PayloadAction<string>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.promptNegative = action.payload;
		},

		// generationTool
		setModel(state: Slice, action: PayloadAction<string>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.model = action.payload;
		},

		// generationTool
		setImageWidth(state: Slice, action: PayloadAction<number>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.imageWidth = action.payload;
		},

		// generationTool
		setImageHeight(state: Slice, action: PayloadAction<number>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.imageHeight = action.payload;
		},

		// generationTool
		setRatio(state: Slice, action: PayloadAction<string>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.ratio = action.payload;
		},

		// generationTool
		toggleIsAspectRatioPortrait(state: Slice) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			const { isAspectRatioPortrait, ratio, imageHeight, imageWidth } = currentTool;

			currentTool.isAspectRatioPortrait = !isAspectRatioPortrait;
			currentTool.ratio = reverseRatioValue(ratio);
			currentTool.imageWidth = imageHeight;
			currentTool.imageHeight = imageWidth;
		},

		// generationTool IMAGE_TO_IMAGE
		revertToSourceImageSize(state: Slice) {
			const currentProject = currentProjectObj(state);

			const { currentGenerationTool } = currentProject;

			if (currentGenerationTool === IMAGE_TO_IMAGE) {
				currentProject.generationTools[IMAGE_TO_IMAGE].imageWidth =
					currentProject.generationTools[IMAGE_TO_IMAGE].originalSourceImageWidth;

				currentProject.generationTools[IMAGE_TO_IMAGE].imageHeight =
					currentProject.generationTools[IMAGE_TO_IMAGE].originalSourceImageHeight;
			}
		},

		// generationTool
		setCfg(state: Slice, action: PayloadAction<number>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.cfg = action.payload;
		},

		// generationTool
		setClipSkip(state: Slice, action: PayloadAction<number>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.clipSkip = action.payload;
		},

		// generationTool - use only for TEXT_TO_IMAGE
		setGenerationToolTextToImageSettings(
			state: Slice,
			action: PayloadAction<TextToImageGenerationData>,
		) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			const {
				model,
				styles,
				imageWidth,
				imageHeight,
				ratio,
				promptNegative,
				prompt,
				cfg,
				clipSkip,
				sampler,
			} = action.payload;

			currentTool.model = model;
			currentTool.styles = styles;
			currentTool.imageWidth = imageWidth;
			currentTool.imageHeight = imageHeight;
			currentTool.ratio = ratio;
			currentTool.promptNegative = promptNegative;
			currentTool.prompt = prompt;
			currentTool.cfg = cfg;
			currentTool.clipSkip = clipSkip;
			currentTool.sampler = sampler;
			currentTool.isAspectRatioPortrait = handleIsAspectRatioPortrait(ratio);
		},

		// generationTool - use only for IMAGE_TO_IMAGE
		setGenerationToolImageToImageSettings(
			state: Slice,
			action: PayloadAction<ImageToImageGenerationData>,
		) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolImageToImage;

			const {
				model,
				styles,
				imageWidth,
				imageHeight,
				ratio,
				promptNegative,
				prompt,
				cfg,
				clipSkip,
				sampler,
				transformation,
			} = action.payload;

			currentTool.model = model;
			currentTool.styles = styles;
			currentTool.imageWidth = imageWidth;
			currentTool.imageHeight = imageHeight;
			currentTool.ratio = ratio;
			currentTool.promptNegative = promptNegative;
			currentTool.prompt = prompt;
			currentTool.cfg = cfg;
			currentTool.clipSkip = clipSkip;
			currentTool.sampler = sampler;
			currentTool.transformation = transformation;
			currentTool.isAspectRatioPortrait = handleIsAspectRatioPortrait(ratio);
		},

		// generationTool
		setSelectedStyles(state: Slice, action: PayloadAction<Array<string>>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.styles = action.payload;
		},

		// generationTool
		resetSelectedStyles(state: Slice) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.styles = [];
		},

		// generationTool
		setSampler(state: Slice, action: PayloadAction<string>) {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.sampler = action.payload;
		},

		// currentProject
		setDefaultSamplers(state: Slice, action: PayloadAction<Samplers>) {
			const { generationTools } = currentProjectObj(state);

			generationTools[TEXT_TO_IMAGE].sampler = action.payload[TEXT_TO_IMAGE].default;
			generationTools[IMAGE_TO_IMAGE].sampler = action.payload[IMAGE_TO_IMAGE].default;
			generationTools[TOOL_ENHANCE].sampler = action.payload[TOOL_ENHANCE].default;
		},

		// generationTool
		setIsRequestingGeneration(state: Slice, action: PayloadAction<MetaIsRequestingGeneration>) {
			const { projectId, generationTool, isRequestingGeneration } = action.payload;

			const project = state.openedProjects[projectId];

			if (project) {
				project.generationTools[generationTool].isRequestingGeneration =
					isRequestingGeneration;
				project.settingsViews[generationTool].isGenerationContainerHidden = false;
			}
		},

		// generationTool - IMAGE_TO_IMAGE
		setTransformation(state: Slice, action: PayloadAction<number>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].transformation = action.payload;
		},

		setTransformationPrevValue(state: Slice, action: PayloadAction<number>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].transformationPrevValue = action.payload;
		},

		// inPaint
		setInPaintDrawingLines(state: Slice, action: { payload: Array<any> }) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.drawingLines = action.payload;
		},

		// inPaint
		setInPaintIsDrawing(state: Slice, action: { payload: boolean }) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.isDrawing = action.payload;
		},

		// inPaint
		setInPaintIsCursorDrawing(state: Slice, action: { payload: boolean }) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.isDrawing = action.payload;
		},

		// inPaint
		setInPaintCursorPosition(state: Slice, action: PayloadAction<{ x: number; y: number }>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.cursorPosition = action.payload;
		},

		// inPaint
		setInPaintMask(state: Slice, action: PayloadAction<string>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.mask = action.payload;
		},

		// inPaint
		setInPaintType(state: Slice, action: { payload: string }) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.inPaintType = action.payload;
		},

		// inPaint
		toggleInPaintMaskVisible(state: Slice, action: { payload: boolean }) {
			const currentProject = currentProjectObj(state);
			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.isMaskVisible = action.payload;
		},

		// inPaint Mask Invert
		toggleInPaintMaskInvert(state: Slice, action: PayloadAction<boolean>) {
			const currentProject = currentProjectObj(state);
			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.maskInvert = action.payload;
		},

		// inPaint
		clearInPaintMask(state: Slice) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.mask = '';
		},

		// inPaint
		clearInPaintDrawingLines(state: Slice) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.drawingLines = [];
		},

		// inPaint
		setIsInPaintMode(state: Slice, action: PayloadAction<boolean>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.isInPaintMode = action.payload;
		},

		// inPaint
		setInPaintCanvasInitialized(state: Slice, action: PayloadAction<boolean>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.isCanvasInitialized =
				action.payload;
		},

		// inPaint
		setInPaintContainerCanvasDimension(
			state: Slice,
			action: PayloadAction<{ width: number; height: number }>,
		) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.initCanvasContainerDimensions =
				action.payload;
		},

		// inPaint
		resetInPaintContainerCanvasDimension(state: Slice) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.initCanvasContainerDimensions = {
				width: 0,
				height: 0,
			};
		},

		// inPaint
		setInPaintTool(state: Slice, action: PayloadAction<string>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.tool = action.payload;
		},

		// inPaint
		setInPaintBrushSize(state: Slice, action: PayloadAction<number>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.brushSize = action.payload;
		},

		// inPaint
		setInPaintBrushColor(state: Slice, action: PayloadAction<any>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[IMAGE_TO_IMAGE].inPaint.brushColor = action.payload;
		},

		// settingsViews
		toggleIsNegativePromptExpanded(state: Slice) {
			const currentGenerationView = currentSettingsView(state) as CommonSettingsView;

			currentGenerationView.isNegativePromptExpanded =
				!currentGenerationView.isNegativePromptExpanded;
		},

		// settingsViews
		setIsGenerationContainerHidden(state: Slice, action: PayloadAction<boolean>) {
			const currentProject = currentProjectObj(state);

			if (currentProject) {
				const currentGenerationView = currentSettingsView(state) as CommonSettingsView;

				currentGenerationView.isGenerationContainerHidden = action.payload;
			}
		},

		// project
		removeImageFromGenerationsHistory(
			state: Slice,
			action: PayloadAction<{
				imageId: string;
				projectId: string;
				type: (typeof generationTypes)[generationTypesKeys];
			}>,
		) {
			const { imageId, projectId, type } = action.payload;

			const project = state.openedProjects[projectId];
			const generationTool = generationToolFromGenerationType(type);

			if (project) {
				const generationsHistoryTool =
					state.openedProjects[projectId].generationsHistory[generationTool];

				const generationsHistoryToolMutatedItems: Array<Generation> = [];

				generationsHistoryTool.forEach((item: Generation) => {
					const mutatedImages = item.images.filter(
						(image: GenerationImage) => image.imageId !== imageId,
					);

					const mutatedItem = {
						...item,
						images: mutatedImages,
					};

					generationsHistoryToolMutatedItems.push(mutatedItem);
				});

				state.openedProjects[projectId].generationsHistory[generationTool] =
					generationsHistoryToolMutatedItems;
			}
		},

		// project
		mutateIsFavoriteIntoGenerationsHistory(
			state: Slice,
			action: PayloadAction<{
				imageId: string;
				projectId: string;
				type: (typeof generationTypes)[generationTypesKeys];
			}>,
		) {
			const { imageId, projectId, type } = action.payload;

			const project = state.openedProjects[projectId];
			const generationTool = generationToolFromGenerationType(type);

			if (project) {
				const generationsHistoryTool =
					state.openedProjects[projectId].generationsHistory[generationTool];

				const generationsHistoryToolMutatedItems: Array<Generation> = [];

				generationsHistoryTool.forEach((item: Generation) => {
					const mutatedImages = item.images.map((image: GenerationImage) => {
						return toggleIsImageFavorite(image, imageId);
					});

					const mutatedItem = {
						...item,
						images: mutatedImages,
					};

					generationsHistoryToolMutatedItems.push(mutatedItem);
				});

				state.openedProjects[projectId].generationsHistory[generationTool] =
					generationsHistoryToolMutatedItems;
			}
		},

		// generationTool
		setActiveImageIndex: (state: Slice, action: PayloadAction<number>) => {
			const currentTool = currentGenerationToolObj(state) as GenerationToolCommon;

			currentTool.activeImageIndex = action.payload;
		},

		// Enhance
		setGenerationToolEnhanceSettings(
			state: Slice,
			action: PayloadAction<EnhanceGenerationData>,
		) {
			const currentProject = currentProjectObj(state);

			const { model, engine, sampler, styles, prompt, transformation, sharpness } =
				action.payload;

			currentProject.generationTools[TOOL_ENHANCE].model = model;
			currentProject.generationTools[TOOL_ENHANCE].engine = engine;
			currentProject.generationTools[TOOL_ENHANCE].sampler = sampler;
			currentProject.generationTools[TOOL_ENHANCE].styles = styles;
			currentProject.generationTools[TOOL_ENHANCE].prompt = prompt;
			currentProject.generationTools[TOOL_ENHANCE].transformation = transformation;
			currentProject.generationTools[TOOL_ENHANCE].sharpness = sharpness;
		},

		// Enhance
		setDefaultEnhanceModel(state: Slice, action: PayloadAction<string>) {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].model = action.payload;
		},

		// Enhance
		setEnhanceCreativity: (state: Slice, action: PayloadAction<number>) => {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].transformation = action.payload;
		},

		// Enhance
		setEnhanceDetailsStrength: (state: Slice, action: PayloadAction<number>) => {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].detailsStrength = action.payload;
		},

		// Enhance
		setEnhanceResizeStrength: (state: Slice, action: PayloadAction<number>) => {
			const currentProject = currentProjectObj(state);
			const { sourceImage } = currentProject.generationTools[TOOL_ENHANCE];
			const aspectRatio = sourceImage.imageWidth / sourceImage.imageHeight;

			currentProject.generationTools[TOOL_ENHANCE].resizeStrength = action.payload;

			currentProject.generationTools[TOOL_ENHANCE].resizedWidth = action.payload;
			currentProject.generationTools[TOOL_ENHANCE].resizedHeight = Math.floor(
				action.payload / aspectRatio,
			);
		},

		// Enhance
		setEnhanceSharpness: (state: Slice, action: PayloadAction<string>) => {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].sharpness = action.payload;
		},

		// Enhance
		setEnhanceScalefactor: (state: Slice, action: PayloadAction<number>) => {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].scaleFactor = action.payload;
		},

		// Enhance
		toggleEnhanceIsResizeOn: (state: Slice) => {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].isResizeOn =
				!currentProject.generationTools[TOOL_ENHANCE].isResizeOn;
			// TODO_ENHANCE Reset the 'resizedWidth' and 'resizedHeight'
			// currentProject.generationTools[TOOL_ENHANCE].resizedWidth = ... // default === sourceImage.imageWidth;
			// currentProject.generationTools[TOOL_ENHANCE].resizedHeight = ... // default ===  sourceImage.imageHeight;
		},

		// Enhance
		setEnhanceEngine: (state: Slice, action: PayloadAction<string>) => {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].engine = action.payload;
		},

		// Enhance
		setEnhanceSourceImageData: (
			state: Slice,
			action: PayloadAction<{
				imageBase64: string;
				imageId: string;
				imageUrl: string;
				imageWidth: number;
				imageHeight: number;
			}>,
		) => {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].sourceImage = action.payload;

			// Set the initial (default) "Resize Width" inputs
			const { imageWidth, imageHeight } = action.payload;

			currentProject.generationTools[TOOL_ENHANCE].resizeStrength = imageWidth;
			currentProject.generationTools[TOOL_ENHANCE].resizedWidth = imageWidth;
			currentProject.generationTools[TOOL_ENHANCE].resizedHeight = imageHeight;
		},

		// Enhance
		setEnhanceModel: (state: Slice, action: PayloadAction<string>) => {
			const currentProject = currentProjectObj(state);

			currentProject.generationTools[TOOL_ENHANCE].model = action.payload;
		},

		// Enhance
		setEnhanceSettingsToDefault: (state: Slice) => {
			const currentProject = currentProjectObj(state);
			const { imageWidth, imageHeight } =
				currentProject.generationTools[TOOL_ENHANCE].sourceImage;

			currentProject.generationTools[TOOL_ENHANCE].transformation = DEFAULT_CREATIVITY_VALUE;
			currentProject.generationTools[TOOL_ENHANCE].scaleFactor = 2;
			currentProject.generationTools[TOOL_ENHANCE].sharpness = 'mid';
			currentProject.generationTools[TOOL_ENHANCE].model = ''; // useEffect in InputEnhanceModel will take care if empty string
			// TODO_ENHANCE
			// How are the "restore" behaviors for Simple and Advanced mode?!
			// Do we need two setters for both?!
			currentProject.generationTools[TOOL_ENHANCE].detailsStrength = 0;
			currentProject.generationTools[TOOL_ENHANCE].resizeStrength = imageWidth;
			currentProject.generationTools[TOOL_ENHANCE].resizedWidth = imageWidth;
			currentProject.generationTools[TOOL_ENHANCE].resizedHeight = imageHeight;
		},

		resetOpenedProjectsSlice: () => {
			return initialState;
		},
	},
});

// Actions
export const {
	setOpenedProject,
	setCurrentProjectId,
	clearCurrentProjectId,
	openDrawerWithType,
	closeDrawer,
	setGenerationTool,
	updateCurrentProjectTitle,
	setInitialGenerationHistoryItem,
	addGenerationHistoryItem,
	addImagesToGenerationHistoryItem,
	updateDataToGenerationHistoryItem,
	setIsGeneratingToGenerationHistoryItem,
	setGenerationDataToProject,
	setGeneratedImageAsSource,
	setTransformSourceImageData,
	setMode,
	setPrompt,
	setNegativePrompt,
	setModel,
	setImageWidth,
	setImageHeight,
	setRatio,
	toggleIsAspectRatioPortrait,
	revertToSourceImageSize,
	setCfg,
	setClipSkip,
	setGenerationToolTextToImageSettings,
	setGenerationToolImageToImageSettings,
	setSelectedStyles,
	resetSelectedStyles,
	setSampler,
	setDefaultSamplers,
	setIsRequestingGeneration,
	setTransformation,
	setTransformationPrevValue,
	// InPaint
	setInPaintMask,
	setInPaintDrawingLines,
	clearInPaintDrawingLines,
	setInPaintIsDrawing,
	setInPaintIsCursorDrawing,
	setInPaintCursorPosition,
	setInPaintBrushColor,
	setInPaintBrushSize,
	setInPaintCanvasInitialized,
	setInPaintContainerCanvasDimension,
	resetInPaintContainerCanvasDimension,
	setInPaintTool,
	setInPaintType,
	clearInPaintMask,
	setIsInPaintMode,
	toggleInPaintMaskVisible,
	toggleInPaintMaskInvert,
	// End InPaint
	toggleIsNegativePromptExpanded,
	setIsGenerationContainerHidden,
	removeImageFromGenerationsHistory,
	mutateIsFavoriteIntoGenerationsHistory,
	setActiveImageIndex,
	setGenerationToolEnhanceSettings,
	setDefaultEnhanceModel,
	setEnhanceCreativity,
	setEnhanceDetailsStrength,
	setEnhanceResizeStrength,
	setEnhanceSharpness,
	setEnhanceScalefactor,
	toggleEnhanceIsResizeOn,
	setEnhanceEngine,
	setEnhanceSourceImageData,
	setEnhanceModel,
	setEnhanceSettingsToDefault,
	resetOpenedProjectsSlice,
} = sliceOpenedProjects.actions;
