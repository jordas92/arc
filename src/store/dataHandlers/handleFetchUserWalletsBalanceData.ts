/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponseWalletsBalance, WalletsBalance } from '../types/typesUserWallets';
import commonUtils from '../common/utils';

const { valueToNumber } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchUserWalletsBalanceData = (
	response: ResponseWalletsBalance | any,
): WalletsBalance => {
	return {
		creditsBalance: valueToNumber(response?.balance),
		creditsRedeem: valueToNumber(response?.redeemable),
	};
};

export default handleFetchUserWalletsBalanceData;
