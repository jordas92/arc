/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { FetchAnnouncementsType } from 'store/types/typesAnnouncements';
import strings from './strings';

const {
	wrongUserNameOrPassword,
	InvalidRequestText,
	UnauthorizedText,
	ForbiddenText,
	ResourceNotFoundText,
	ServiceUnavailable,
	gatewayTimeout,
	invalidCredentials,
	somethingWentWrong,
} = strings;

export const generationToolsKeys = {
	TEXT_TO_IMAGE: 'TEXT_TO_IMAGE',
	IMAGE_TO_IMAGE: 'IMAGE_TO_IMAGE',
	TOOL_ENHANCE: 'TOOL_ENHANCE',
} as const;

export const generationTypes = {
	CONJURE: 'Conjure',
	TRANSFORM: 'Transform',
	INPAINT: 'Inpaint',
	UPSCALE: 'Upscale',
	ENHANCE: 'Enhance',
} as const;

export const consumerTypes = {
	CONSUMER_WEB: 'Web',
	CONSUMER_DISCORD: 'Discord',
} as const;

export const generationToolModes = {
	SIMPLE: 'SIMPLE',
	ADVANCED: 'ADVANCED',
} as const;

export const generationToolsCases = {
	TEXT_TO_IMAGE_and_SIMPLE: `${generationToolsKeys.TEXT_TO_IMAGE}_and_${generationToolModes.SIMPLE}`,
	TEXT_TO_IMAGE_and_ADVANCED: `${generationToolsKeys.TEXT_TO_IMAGE}_and_${generationToolModes.ADVANCED}`,
	IMAGE_TO_IMAGE_and_SIMPLE: `${generationToolsKeys.IMAGE_TO_IMAGE}_and_${generationToolModes.SIMPLE}`,
	IMAGE_TO_IMAGE_and_ADVANCED: `${generationToolsKeys.IMAGE_TO_IMAGE}_and_${generationToolModes.ADVANCED}`,
	ENHANCE_and_SIMPLE: `${generationToolsKeys.TOOL_ENHANCE}_and_${generationToolModes.SIMPLE}`,
	ENHANCE_and_ADVANCED: `${generationToolsKeys.TOOL_ENHANCE}_and_${generationToolModes.ADVANCED}`,
} as const;

export const notificationSeverity = {
	warning: 'warning',
	info: 'info',
	error: 'error',
	success: 'success',
} as const;

export const notificationErrorMessages = {
	INVALID_REQUEST: InvalidRequestText,
	NOT_AUTHORIZED: UnauthorizedText,
	FORBIDDEN: ForbiddenText,
	RESOURCE_NOT_FOUND: ResourceNotFoundText,
	SERVICE_UNAVAILABLE: ServiceUnavailable,
	GATEWAY_TIMEOUT: gatewayTimeout,
	WRONG_USERNAME_OR_PASSWORD: wrongUserNameOrPassword,
	INVALID_CREDENTIALS: invalidCredentials,
	SOMETHING_WENT_WRONG: somethingWentWrong,
} as const;

export const modalsKeys = {
	CREDITS: 'CREDITS',
	SHARE: 'SHARE',
	PROJECT_DELETE: 'PROJECT_DELETE',
	PROJECT_EDIT_TITLE: 'PROJECT_EDIT_TITLE',
	IMAGE_PREVIEW: 'IMAGE_PREVIEW',
	PROMPT_SAVE: 'PROMPT_SAVE',
	PROMPT_EDIT: 'PROMPT_EDIT',
	DELETE_USER: 'DELETE_USER',
	EDIT_SAVED_PROMPT: 'EDIT_SAVED_PROMPT',
	SAVE_PROMPT: 'SAVE_PROMPT',
	ANNOUNCEMENTS: 'ANNOUNCEMENTS',
	VIDEO: 'VIDEO',
	UPLOAD_IMAGE_ERROR: 'UPLOAD_IMAGE_ERROR',
	UPLOAD_IMAGE_ERROR_X: 'UPLOAD_IMAGE_ERROR_X',
	DETAIL_MODAL: 'DETAIL_MODAL',
	EXPAND_INPAINT: 'EXPAND_INPAINT',
} as const;

export const drawersKeys = {
	PROJECT_DRAWER_LIBRARY: 'PROJECT_DRAWER_LIBRARY',
	PROJECT_DRAWER_HISTORY: 'PROJECT_DRAWER_HISTORY',
	PROJECT_DRAWER_FAVORITES: 'PROJECT_DRAWER_FAVORITES',
} as const;

// TODO_NEXT Rename to IMAGES_...
export const keysSliceImages = {
	ALL_IMAGES: 'ALL_IMAGES',
	DISCORD_IMAGES: 'DISCORD_IMAGES',
	FAVORITE_ALL_IMAGES: 'FAVORITE_ALL_IMAGES',
	FAVORITE_PROJECT_IMAGES: 'FAVORITE_PROJECT_IMAGES',
} as const;

export const previewModalOriginKeys = {
	ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL: 'ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL',
	ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD: 'ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD',
	ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES: 'ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES',
	ORIGIN_PROJECT_DRAWER_LIBRARY_ALL: 'ORIGIN_PROJECT_DRAWER_LIBRARY_ALL',
	ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD: 'ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD',
	ORIGIN_PROJECT_DRAWER_HISTORY: 'ORIGIN_PROJECT_DRAWER_HISTORY',
	ORIGIN_PROJECT_DRAWER_FAVORITES_ALL: 'ORIGIN_PROJECT_DRAWER_FAVORITES_ALL',
	ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT: 'ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT',
	ORIGIN_PROJECT_MODEL_DETAILED: 'ORIGIN_PROJECT_MODEL_DETAILED',
	ORIGIN_PROJECT_CONTAINER_GENERATION: 'ORIGIN_PROJECT_CONTAINER_GENERATION',
	ORIGIN_HOMEPAGE_TAB_DISCOVER: 'ORIGIN_HOMEPAGE_TAB_DISCOVER',
} as const;

// Usage: To identify the origin of a particular image that feeds the Inpaint Tool.
export const sourceImageOriginKeys = {
	ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE: 'ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE',
	ORIGIN_SOURCE_IMAGE_UPLOAD: 'ORIGIN_SOURCE_IMAGE_UPLOAD',
	// TODO_NEXT - The following are not wired up, because are not covered by business requirements
	// ORIGIN_SOURCE_IMAGE_PROJECT_DRAWER: 'ORIGIN_SOURCE_IMAGE_PROJECT_DRAWER',
	// ORIGIN_SOURCE_IMAGE_TAB_DISCOVER: 'ORIGIN_SOURCE_IMAGE_TAB_DISCOVER',
	// ORIGIN_SOURCE_IMAGE_TAB_LIBRARY: 'ORIGIN_SOURCE_IMAGE_TAB_LIBRARY',
	// ...
} as const;

export const JWT = 'JWT';

export const myLibraryPageKeys = {
	ALL_IMAGES: 'ALL_IMAGES',
	FAVORITES: 'FAVORITES',
	DISCORD: 'DISCORD',
} as const;

export const announcementsKeys = {
	...generationToolsKeys,
	GENERAL: 'GENERAL',
} as const;

export const announcementsFetchKeys: FetchAnnouncementsType = {
	GENERAL: 'general',
	TEXT_TO_IMAGE: 'conjure',
	IMAGE_TO_IMAGE: 'transform',
	TOOL_ENHANCE: 'enhance',
} as const;

export const controlNetKeys = {
	POSE: 'POSE',
	SCRIBBLE: 'SCRIBBLE',
	REFERENCE: 'REFERENCE',
	XRAY: 'XRAY',
} as const;
