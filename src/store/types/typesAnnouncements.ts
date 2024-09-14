/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { announcementsKeys } from 'store/common/keys';
import { ResponsePaginationData } from './typesCommon';

const { GENERAL, TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = announcementsKeys;

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseAnnouncement = {
	id: string | null;
	title: string | null;
	image: string | null;
	summary: string | null;
};

export type ResponseFetchAnnouncements = {
	data: Array<ResponseAnnouncement>;
	meta: ResponsePaginationData;
};

export type Announcement = {
	id: string;
	title: string;
	imageUrl: string;
	summary: string;
};

export type Announcements = {
	items: Announcement[];
	nextPage: string;
};

export type FetchAnnouncementsType = {
	[GENERAL]: string;
	[TEXT_TO_IMAGE]: string;
	[IMAGE_TO_IMAGE]: string;
	[TOOL_ENHANCE]: string;
	// TODO_NEXT
	// [INPAINT]: string;
};
