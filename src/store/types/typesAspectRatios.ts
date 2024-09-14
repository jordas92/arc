/** Copyright (c) 2023-present Kristiyan Dimitrov */

export type ResponseAspectRatiosItem = {
	ar: string | null; // e.g. "16:9"
	width: number | null;
	height: number | null;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchAspectRatios = {
	standard: Array<ResponseAspectRatiosItem>;
	sdxl: Array<ResponseAspectRatiosItem>;
};

export type AspectRatio = {
	ar: string;
	width: number;
	height: number;
};

export type AspectRatios = {
	standard: {
		landscape: Array<AspectRatio>;
		portrait: Array<AspectRatio>;
	};
	sdxl: {
		landscape: Array<AspectRatio>;
		portrait: Array<AspectRatio>;
	};
};
