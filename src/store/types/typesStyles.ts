/** Copyright (c) 2023-present Kristiyan Dimitrov */

export type ResponseStyle = {
	key: string | null;
	name: string | null;
	sdxl_only: boolean | null;
};

/**
 * Expected API response type from 'fetchStyles'.
 * Only props related to the FE are included.
 */
export type ResponseStyles = Array<ResponseStyle>;

export type Style = {
	key: string;
	name: string;
	isSdxlOnly: boolean;
};

export type Styles = Array<Style>;
