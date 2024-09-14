/** Copyright (c) 2023-present Kristiyan Dimitrov */

export type ControlNetToolButtonTooltip = {
	title: string;
	description: string;
	thumbUrl: string;
	videoUrl: string;
};

export type ControlNetToolDrawer = {
	title: string;
	tooltip: string;
	description: string;
};

export type ControlNetGenerationData = {
	sourceImageUrl: string;
	sourceImageBase64: string;
	preProcessedImageUrl: string;
	isSourceImageShown: boolean;
	isImagePreprocessed: boolean;
	influence: number;
};

export type ControlNetTool = {
	buttonTooltip: ControlNetToolButtonTooltip;
	drawer: ControlNetToolDrawer;
	controlNetGenerationData: ControlNetGenerationData;
	isImagesContainerExpanded: boolean;
};

export type ControlNetTools = {
	[key: string]: ControlNetTool;
};

export type ResponseControlNetTool = {
	key: string;
	name: string | null;
	tooltip: string | null;
	description: string | null;
	tooltip_title: string | null;
	tooltip_description: string | null;
	thumb_url: string | null;
	video_url: string | null;
};

export type ResponseControlNetTools = {
	data: ResponseControlNetTool[];
};
