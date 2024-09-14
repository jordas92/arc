/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { uploadImageStatus } from 'constants/default';
import { previewModalOriginKeys, announcementsKeys, modalsKeys } from '../common/keys';

export type DataModalProjectDelete = {
	projectId: string;
};

export type DataModalShare = {
	imageUrl: string;
};

export type DataModalDetail = {
	model: string;
	modelKey: string;
};

// TODO_NEXT wire it up
// Check apiProjects 'updateProject' and create a common type
export type DataModalProjectEditTitle = {
	projectId: string;
	newProjectTitle: string;
};

// TODO_NEXT wire it up
// Check apiSavedPrompts 'savePrompt' and create a common type
export type DataModalPromptSave = {
	prompt: string;
};

// TODO_NEXT wire it up
// Check apiSavedPrompts 'updateSavedPropmt' and create a common type
export type DataModalPrompEdit = {
	id: string;
	title: string;
};

export type ImagePreviewItem = {
	imageId: string;
	promptId: string;
	imageUrl: string;
	isImageNsfw: boolean;
	isImageExternal?: boolean;
	imagePage: string;
	isFavorite: boolean;
};

export type DataModalImagePreview = {
	imageId: string;
	items: Array<ImagePreviewItem>;
	origin: keyof typeof previewModalOriginKeys;
};

export type DataModalEditSavedPrompt = {
	id: string;
	title: string;
	prompt: string;
};

export type DataModalSavePrompt = {
	prompt: string;
};

export type DataModalVideo = {
	videoUrl: string;
};

export type DataModalUploadImageError = {
	uploadStatus: keyof typeof uploadImageStatus;
};

export type DataModalAnnouncements = {
	type: keyof typeof announcementsKeys;
};

export type DataModal =
	| DataModalProjectDelete
	| DataModalProjectEditTitle
	| DataModalPromptSave
	| DataModalPrompEdit
	| DataModalImagePreview
	| DataModalVideo
	| DataModalAnnouncements;

export type Modal = {
	type: keyof typeof modalsKeys | '';
	// CREDITS and DELETE_USER do not need the 'data' prop
	data?: DataModal | {};
};
