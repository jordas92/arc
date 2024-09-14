/** Copyright (c) 2024-present Kristiyan Dimitrov */

import commonUtils from 'store/common/utils';

import { ModelMetaItems, ResponseModelItems } from '../types/typesModels';
import handleImages from './utils/handleImages';

const { valueToNumber } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchMoreMetaModelsData = (
	response: ResponseModelItems | any,
): ModelMetaItems | any => {
	// const data: ResponseModelMetaNext[] = [];
	const defaultPayload = {
		data: [],
		meta: {},
		currentFetchedPage: 0,
	};

	// Takes care of the scenario when 'data' and 'meta' props are missing in the payload
	const { data: responseData = defaultPayload.data, meta: responseMeta = defaultPayload.meta } =
		response;

	const pagesTotal = valueToNumber(responseMeta?.last_page);
	const currentFetchedPage = valueToNumber(responseMeta?.current_page);
	const itemsTotal = valueToNumber(responseMeta?.total);

	return {
		data: handleImages(responseData),
		pagesTotal,
		currentFetchedPage,
		itemsTotal,
	};
};
