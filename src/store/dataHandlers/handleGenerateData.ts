/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

const { valueToString } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe usage
 * @param response The API response
 */
const handleGenerateData = (response: { prompt_id: string } | any): { promptId: string } => {
	return {
		promptId: valueToString(response?.prompt_id),
	};
};

export default handleGenerateData;
