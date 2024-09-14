/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

const { valueToString } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleCreateConnectionData = (response: string | any): string => {
	return valueToString(response);
};

export default handleCreateConnectionData;
