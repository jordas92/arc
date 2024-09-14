/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import {
	Announcement,
	Announcements,
	ResponseAnnouncement,
	ResponseFetchAnnouncements,
} from '../types/typesAnnouncements';

const { valueToString, handleNextPageValue } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchAnnouncementsData = (
	response: ResponseFetchAnnouncements | any,
): Announcements => {
	const items: Announcement[] = [];

	const defaultPayload = {
		data: [],
		meta: {
			current_page: null,
			last_page: null,
		},
	};

	// Takes care of the scenario when 'data' prop is missing in the payload
	const { data: responseData = defaultPayload.data, meta: responseMeta = defaultPayload.meta } =
		response;

	if (Array.isArray(responseData)) {
		responseData.forEach((item: ResponseAnnouncement) => {
			items.push({
				id: valueToString(item?.id),
				title: valueToString(item?.title),
				imageUrl: valueToString(item?.image),
				summary: valueToString(item?.summary),
			});
		});
	}

	const nextPage = handleNextPageValue(responseMeta);

	return { items, nextPage };
};

export default handleFetchAnnouncementsData;
