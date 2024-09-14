/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponsePaginationData } from './typesCommon';
import { ResponseFetchImagesItem, ImageItem } from './typesImages';

export type ResponseFetchDiscoverImagesItemUser = {
	avatar: string | null;
	name: string | null;
};

export interface ResponseFetchDiscoverImagesItem extends ResponseFetchImagesItem {
	user: ResponseFetchDiscoverImagesItemUser;
}

export type ResponseFetchDiscoverImages = {
	data: Array<ResponseFetchDiscoverImagesItem>;
	meta: ResponsePaginationData;
};

export type ImageItemUser = {
	avatar: string;
	name: string;
};

export interface DiscoverImageItem extends ImageItem {
	user: ImageItemUser;
}

export type DiscoverImagesItems = {
	origin: string;
	items: Array<DiscoverImageItem>;
	pagesTotal: number;
	currentFetchedPage: number;
	itemsTotal: number;
};
