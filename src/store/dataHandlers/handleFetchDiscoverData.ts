/** Copyright (c) 2023-present Kristiyan Dimitrov */

import userAvatar from 'assets/img/discover_user_avatar.jpg';
import commonUtils from '../common/utils';

import {
	DiscoverImagesItems,
	DiscoverImageItem,
	ResponseFetchDiscoverImages,
	ResponseFetchDiscoverImagesItem,
} from '../types/typesDiscover';

const { valueToString, valueToNumber, valueToBoolean, handleThumbValue } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchDiscoverData = (
	response: ResponseFetchDiscoverImages | any,
): DiscoverImagesItems => {
	const items: DiscoverImageItem[] = [];

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
		responseData.forEach((item: ResponseFetchDiscoverImagesItem) => {
			items.push({
				imageId: valueToString(item?.id),
				promptId: valueToString(item?.prompt_id),
				imageUrl: valueToString(item.url),
				thumbUrl: handleThumbValue(item.thumb_url, item.url),
				isImageNsfw: valueToBoolean(item.nsfw, true),
				imagePage: valueToString(currentFetchedPage),
				isFavorite: valueToBoolean(item?.favorite),
				user: {
					// avatar: valueToString(item.user?.avatar),
					// name: valueToString(item.user?.name),
					// The business wants these values to be hard-coded for now!
					avatar: userAvatar,
					name: 'The Conjuror',
				},
			});
		});
	}

	return { origin, items, pagesTotal, currentFetchedPage, itemsTotal };
};

export default handleFetchDiscoverData;
