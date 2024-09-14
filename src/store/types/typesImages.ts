/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationTypes, previewModalOriginKeys, myLibraryPageKeys } from '../common/keys';
import { ResponsePaginationData } from './typesCommon';

type generationTypesKeys = keyof typeof generationTypes;
export type OriginFetchImage = keyof typeof previewModalOriginKeys | keyof typeof myLibraryPageKeys;

export type ImageItem = {
	imageId: string;
	promptId: string;
	imageUrl: string;
	thumbUrl: string;
	isImageNsfw: boolean;
	isImageExternal?: boolean;
	imagePage: string;
	isFavorite: boolean;
};

export type GeneratedImageAsSource = {
	imageUrl: string;
	isImageNsfw: boolean;
};

export interface ImageItems {
	items: Array<ImageItem>;
	pagesTotal: number;
	currentFetchedPage: number;
	itemsTotal: number;
}

export interface ArgsImageMutation {
	imageId: string;
	imagePage: string;
	projectId: string;
	type: (typeof generationTypes)[generationTypesKeys];
	origin: keyof typeof previewModalOriginKeys;
}

export type ArgsFetchImages = {
	origin: OriginFetchImage;
	page: number;
	itemsPerPage: number;
	searchValue: string;
	projectId?: string;
};

export interface ArgsUpdateIsFavorite extends ArgsImageMutation {
	isFavorite: boolean;
}

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchImagesItem = {
	id: string | null; // imageId
	project_id: string | null;
	prompt_id: string | null;
	url: string | null;
	thumb_url: string | null;
	nsfw: boolean | null;
	favorite: boolean | null;
	type: (typeof generationTypes)[generationTypesKeys] | null;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchImages = {
	data: Array<ResponseFetchImagesItem>;
	meta: ResponsePaginationData;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchPublicImagesItem = {
	url: string | null;
};
