/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationToolsKeys, generationTypes, consumerTypes } from '../common/keys';

import { ResponsePaginationData } from './typesCommon';
import { Generation } from './typesPrompts';

type generationTypesKeys = keyof typeof generationTypes;
type consumerTypesKeys = keyof typeof consumerTypes;

// const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;

export type Project = {
	projectId: string;
	projectTitle: string;
	projectLastEdited: string;
	imageUrl: string;
	thumbUrl: string;
	isNsfw: boolean;
	promptId: string;
	generationType: (typeof generationTypes)[generationTypesKeys] | string;
	isDiscord: boolean;
};

export type ProjectOpenedInit = {
	projectId: string;
	projectTitle: string;
	isDiscord: boolean;
	currentGenerationTool: keyof typeof generationToolsKeys;
};

export type PusherGenerationData = {
	projectId: string;
	projectTitle: string;
	isDiscord: boolean;
	currentProjectPrompt: Generation | null;
	settings: any | null;
};

type ResponseFetchProjectsLeadingImage = {
	id: string | null;
	nsfw: boolean | number | null;
	url: string | null;
	thumb_url: string | null;
	prompt_id: string | null;
	type: (typeof generationTypes)[generationTypesKeys] | null;
};

type ResponseFetchProjectLeadingImage = {
	type: (typeof generationTypes)[generationTypesKeys] | null;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchProjectsProject = {
	id: string | null;
	title: string | null;
	updated_at: string | null;
	leading_image: ResponseFetchProjectsLeadingImage | null;
	consumer: (typeof consumerTypes)[consumerTypesKeys] | null;
};

export type ResponseFetchProject = {
	id: string | null;
	title: string | null;
	leading_image: ResponseFetchProjectLeadingImage | null;
	consumer: (typeof consumerTypes)[consumerTypesKeys] | null;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchProjects = {
	data: Array<ResponseFetchProjectsProject>;
	meta: ResponsePaginationData;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseCreateProject = {
	id: string | null;
};

/**
 * items: Use for finding an item by key(id)
 *
 *
 * nextPage: Use for conditional triggering for "Fetch more projects" request
 */
export type Projects = {
	items: Project[];
	nextPage: string;
};
