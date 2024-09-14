/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import {
	Product,
	Products,
	ResponseProduct,
	ResponseProducts,
	ResponseCheckout,
	CheckoutOptions,
} from '../types/typesProducts';

const { valueToString, valueToNumber, sortProductsAscendingly } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchProductsData = (response: ResponseProducts | any): Products => {
	const products: Array<Product> = [];

	if (Array.isArray(response)) {
		response.forEach((item: ResponseProduct) => {
			products.push({
				id: valueToNumber(item?.id),
				name: valueToString(item?.name),
				credits: valueToNumber(item?.quantity),
				price: valueToNumber(item?.price).toFixed(2),
			});
		});
	}

	return sortProductsAscendingly(products);
};

export const handleFetchCheckoutData = (response: ResponseCheckout | any): CheckoutOptions => {
	return response;
};
