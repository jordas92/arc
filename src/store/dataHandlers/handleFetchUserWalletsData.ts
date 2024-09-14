/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponseWallets, ResponseWallet, Wallets } from 'store/types/typesUserWallets';
import commonUtils from '../common/utils';

const { valueToNumber, valueToString } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchUserWalletsData = (response: ResponseWallets | any): Wallets => {
	const items: Wallets = [];

	if (Array.isArray(response)) {
		response.forEach((item: ResponseWallet) => {
			items.push({
				walletId: valueToNumber(item?.id),
				type: valueToString(item?.type),
				balance: valueToNumber(item?.balance),
			});
		});
	}

	return items;
};

export default handleFetchUserWalletsData;
