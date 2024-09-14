/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import {
	ResponseEnhanceModels,
	ResponseEnhanceModel,
	EnhanceModels,
	EnhanceModel,
} from '../types/typesEnhanceModels';

const { valueToString } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchEnhanceModelsData = (response: ResponseEnhanceModels | any): EnhanceModels => {
	const enhanceModels: Array<EnhanceModel> = [];

	if (Array.isArray(response)) {
		response.forEach((item: ResponseEnhanceModel) => {
			enhanceModels.push({
				key: valueToString(item?.key),
				value: valueToString(item?.name),
				tooltip: valueToString(item?.tooltip),
				sharpening: valueToString(item?.sharpening),
			});
		});
	}

	return enhanceModels;
};

export default handleFetchEnhanceModelsData;
