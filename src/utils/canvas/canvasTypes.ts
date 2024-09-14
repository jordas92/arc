/** Copyright (c) 2024-present Kristiyan Dimitrov */

import { IRect, Vector2d } from 'konva/lib/types';
import { sourceImageOriginKeys } from 'store/common/keys';

export const LAYER_NAMES_DICT = [
	{ key: 'Base', value: 'base' },
	{ key: 'Mask', value: 'mask' },
];

export const LAYER_NAMES = ['base', 'mask'] as const;

export type CanvasLayer = (typeof LAYER_NAMES)[number];

export const BOUNDING_BOX_SCALES_DICT = [
	{ key: 'Auto', value: 'auto' },
	{ key: 'Manual', value: 'manual' },
	{ key: 'None', value: 'none' },
];

export const BOUNDING_BOX_SCALES = ['none', 'auto', 'manual'] as const;

export type BoundingBoxScale = (typeof BOUNDING_BOX_SCALES)[number];

export type CanvasDrawingTool = 'BRUSH' | 'ERASER';

export type CanvasTool = CanvasDrawingTool | 'move' | 'colorPicker';

export type Dimensions = {
	width: number;
	height: number;
};

export type CanvasImage = {
	kind: 'image';
	layer: 'base';
	x: number;
	y: number;
	width: number;
	height: number;
	image: any;
};

export type CanvasMaskLine = {
	layer: 'mask';
	kind: 'line';
	tool: CanvasDrawingTool;
	strokeWidth: number;
	points: number[];
	clip?: IRect;
};

export type CanvasBaseLine = {
	layer: 'base';
	color?: any;
	kind: 'line';
	tool: CanvasDrawingTool;
	strokeWidth: number;
	points: number[];
	clip?: IRect;
};

export type CanvasFillRect = {
	kind: 'fillRect';
	layer: 'base';
	x: number;
	y: number;
	width: number;
	height: number;
	color: any;
};

export type CanvasEraseRect = {
	kind: 'eraseRect';
	layer: 'base';
	x: number;
	y: number;
	width: number;
	height: number;
};

export type CanvasObject =
	| CanvasImage
	| CanvasBaseLine
	| CanvasMaskLine
	| CanvasFillRect
	| CanvasEraseRect;

export type CanvasLayerState = {
	objects: CanvasObject[];
	stagingArea: {
		images: CanvasImage[];
		selectedImageIndex: number;
		sessionId?: string;
		boundingBox?: IRect;
	};
};

// export type CanvasSession = {
// 	sessionId: string;
// 	boundingBox: IRect;
// };

// type guards
export const isCanvasMaskLine = (obj: CanvasObject): obj is CanvasMaskLine =>
	obj.kind === 'line' && obj.layer === 'mask';

export const isCanvasBaseLine = (obj: CanvasObject): obj is CanvasBaseLine =>
	obj.kind === 'line' && obj.layer === 'base';

export const isCanvasBaseImage = (obj: CanvasObject): obj is CanvasImage =>
	obj.kind === 'image' && obj.layer === 'base';

export const isCanvasFillRect = (obj: CanvasObject): obj is CanvasFillRect =>
	obj.kind === 'fillRect' && obj.layer === 'base';

export const isCanvasEraseRect = (obj: CanvasObject): obj is CanvasEraseRect =>
	obj.kind === 'eraseRect' && obj.layer === 'base';

export const isCanvasAnyLine = (obj: CanvasObject): obj is CanvasMaskLine | CanvasBaseLine =>
	obj.kind === 'line';

export interface CanvasStateTypes {
	isInPaintMode: boolean;
	imageUrl: string;
	imageId: string;
	base64Image: string;
	isImageNsfw: boolean;
	mask: string;
	inPaintType: string;
	maskInvert: boolean;
	isMaskVisible: boolean;
	isDrawing: boolean;
	isCursorDrawing: boolean;
	drawingLines: Array<any>;
	sourceImageOrigin: keyof typeof sourceImageOriginKeys | string;
	tool: string;
	brushColor: any;
	brushOpacity: number;
	brushSize: number;
	cursorPosition: Vector2d;
	isCanvasInitialized: boolean;
	initCanvasContainerDimensions: Dimensions;
	// CHECK
	stageCoordinates?: Vector2d | null;
	stageDimensions?: Dimensions;
	stageScale?: number;
	boundingBoxCoordinates?: Vector2d;
	boundingBoxDimensions?: Dimensions;
	boundingBoxScaleMethod?: BoundingBoxScale;
	colorPickerColor?: any; // colorPickerColor: RgbaColor;
	layer?: string;
	// layerState: CanvasLayerState;
	// intermediateImage?: Image;
	isMaskEnabled?: boolean;
	isMovingStage?: boolean;
	isTransformingBoundingBox?: boolean;
	maskColor?: any; // maskColor: RgbaColor;
	minimumStageScale?: number;
	scaledBoundingBoxDimensions?: Dimensions;
}
