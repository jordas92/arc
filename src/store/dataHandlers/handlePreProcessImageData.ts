/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import { ResponsePreProcessImageData } from '../types/typesPreProcessImage';

const { valueToString } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handlePreProcessImageData = (response: ResponsePreProcessImageData | any): string => {
	// Takes care of the scenario when 'data' prop is missing in the payload
	const { data: responseData } = response;

	return valueToString(responseData.images[0]);
};

export default handlePreProcessImageData;
