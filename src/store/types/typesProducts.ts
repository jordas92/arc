/** Copyright (c) 2023-present Kristiyan Dimitrov */

export type ResponseProduct = {
	id: string | null;
	name: string | null;
	description: string | null;
	features: string | null;
	product_id: string | null;
	price: number | null;
	quantity: number | null;
};

/**
 * Expected API response type from 'fetchProducts'.
 * Only props related to the FE are included.
 */
export type ResponseProducts = Array<ResponseProduct>;

export type Product = {
	id: number;
	credits: number;
	price: string;
	name: string;
};

export type Products = Array<Product>;

export type CheckoutOptions = {
	customer: any | null;
	settings: any | null;
	items: any | null;
};

export type ResponseCheckout = CheckoutOptions;
