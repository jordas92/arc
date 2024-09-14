/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponsePaginationData } from './typesCommon';

export type SavedPrompt = {
	id: string;
	title: string;
	prompt: string;
};

export type ResponseSavedPrompt = {
	id: string | null;
	prompt: string | null;
	title: string | null;
};

/**
 * Expected API response type 'updateSavedPrompt'.
 * Only props related to the FE are included.
 */
export type ResponseUpdatedSavedPrompt = {
	id: string | null;
	prompt: string | null;
	title: string | null;
};

/**
 * Expected API response type 'fetchSavedPrompts'.
 * Only props related to the FE are included.
 */
export type ResponseFetchSavedPrompts = {
	data: Array<ResponseSavedPrompt>;
	meta: ResponsePaginationData;
};

/**
 * items: Use for displaying a list of items
 *
 * nextPage: Use for "Show More" button behavior (action and visibility)
 */
export type SavedPrompts = {
	items: Array<SavedPrompt>;
	nextPage: string;
};
