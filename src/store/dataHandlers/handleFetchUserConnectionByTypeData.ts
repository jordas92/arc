/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import { ResponseConnection, Connection } from '../types/typesUser';

const { valueToString } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchUserConnectionByTypeData = (response: ResponseConnection | any): Connection => {
	return {
		connectionId: valueToString(response?.connection_id),
		connectionName: valueToString(response?.connection_name),
	};
};

export default handleFetchUserConnectionByTypeData;
