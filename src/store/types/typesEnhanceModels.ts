/** Copyright (c) 2023-present Kristiyan Dimitrov */

export type ResponseEnhanceModel = {
	key: string | null;
	name: string | null;
	tooltip: string | null;
	sharpening: string | null;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseEnhanceModels = Array<ResponseEnhanceModel>;

export type EnhanceModel = {
	key: string;
	value: string;
	tooltip: string;
	sharpening: string;
};

export type EnhanceModels = Array<EnhanceModel>;
