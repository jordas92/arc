/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import {
	TutorialItem,
	Tutorials,
	ResponseFetchTutorials,
	ResponseFetchTutorialsItem,
} from '../types/typesTutorials';

const { valueToString, valueToNumber, valueToBoolean, handleTutorialsTags } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchTurotialsData = (response: ResponseFetchTutorials | any): Tutorials => {
	const items: TutorialItem[] = [];

	const defaultPayload = {
		data: [],
		meta: {},
	};

	// Takes care of the scenario when 'data' and 'meta' props are missing in the payload
	const { data: responseData = defaultPayload.data, meta: responseMeta = defaultPayload.meta } =
		response;

	const pagesTotal = valueToNumber(responseMeta.last_page);
	const currentFetchedPage = valueToNumber(responseMeta.current_page);
	const itemsTotal = valueToNumber(responseMeta.total);

	if (Array.isArray(responseData)) {
		responseData.map((item: ResponseFetchTutorialsItem) => {
			return items.push({
				id: valueToString(item?.id),
				title: valueToString(item?.title),
				duration: valueToNumber(item?.duration),
				thumbUrl: valueToString(item?.thumb_url),
				tutorialUrl: valueToString(item?.url),
				isNsfw: valueToBoolean(item?.is_nsfw),
				tags: handleTutorialsTags(item?.tags),
			});
		});
	}

	return { items, pagesTotal, currentFetchedPage, itemsTotal };
};

export default handleFetchTurotialsData;
