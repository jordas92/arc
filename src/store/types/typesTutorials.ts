/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponsePaginationData } from './typesCommon';

export type ResponseTutorialsTag = {
	id: number | null;
	name: string | null;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchTutorialsItem = {
	id: string | null;
	title: string | null;
	duration: number | null; // seconds
	thumb_url: string | null;
	url: string | null;
	is_nsfw: boolean | null;
	tags: Array<ResponseTutorialsTag>;
};

export type ResponseFetchTutorials = {
	data: Array<ResponseFetchTutorialsItem>;
	meta: ResponsePaginationData;
};

export type TutorialsTag = {
	id: number;
	name: string;
};

export type TutorialItem = {
	id: string;
	title: string;
	duration: number; // seconds
	thumbUrl: string;
	tutorialUrl: string;
	isNsfw: boolean;
	tags: Array<TutorialsTag>;
};

export type Tutorials = {
	items: TutorialItem[];
	pagesTotal: number;
	currentFetchedPage: number;
	itemsTotal: number;
};
