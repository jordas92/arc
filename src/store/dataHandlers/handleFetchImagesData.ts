/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from 'store/common/utils';

import {
	ImageItem,
	ImageItems,
	GeneratedImageAsSource,
	ResponseFetchImages,
	ResponseFetchImagesItem,
	ResponseFetchPublicImagesItem,
} from 'store/types/typesImages';

const { valueToString, valueToNumber, valueToBoolean, handleThumbValue } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchImagesData = (response: ResponseFetchImages | any): ImageItems => {
	const items: ImageItem[] = [];
	const defaultPayload = {
		data: [],
		meta: {},
	};

	// Takes care of the scenario when 'data' and 'meta' props are missing in the payload
	const { data: responseData = defaultPayload.data, meta: responseMeta = defaultPayload.meta } =
		response;

	const pagesTotal = valueToNumber(responseMeta?.last_page);
	const currentFetchedPage = valueToNumber(responseMeta?.current_page);
	const itemsTotal = valueToNumber(responseMeta?.total);

	if (Array.isArray(responseData)) {
		responseData.forEach((item: ResponseFetchImagesItem) => {
			items.push({
				imageId: valueToString(item?.id),
				promptId: valueToString(item?.prompt_id),
				imageUrl: valueToString(item?.url),
				thumbUrl: handleThumbValue(item?.thumb_url, item?.url),
				isImageNsfw: valueToBoolean(item?.nsfw, true),
				imagePage: valueToString(currentFetchedPage),
				isFavorite: valueToBoolean(item?.favorite),
			});
		});
	}

	return { items, pagesTotal, currentFetchedPage, itemsTotal };
};

export const handleFetchImageData = (
	response: ResponseFetchImagesItem | any,
): GeneratedImageAsSource => {
	return {
		imageUrl: valueToString(response?.url),
		isImageNsfw: valueToBoolean(response?.nsfw, true),
	};
};

export const handleFetchPublicImageData = (
	response: ResponseFetchPublicImagesItem | any,
): string => {
	return valueToString(response?.url);
};
