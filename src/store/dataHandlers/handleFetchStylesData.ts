/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponseStyles, ResponseStyle, Styles } from 'store/types/typesStyles';
import commonUtils from '../common/utils';

const { valueToString, valueToBoolean } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchStylesData = (response: ResponseStyles | any): Styles => {
	const items: Styles = [];

	if (Array.isArray(response)) {
		response.forEach((item: ResponseStyle) => {
			items.push({
				key: valueToString(item?.key),
				name: valueToString(item?.name),
				isSdxlOnly: valueToBoolean(item?.sdxl_only),
			});
		});
	}

	return items;
};

export default handleFetchStylesData;
