/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { announcementsKeys } from 'store/common/keys';

import { Wallet } from './typesUserWallets';

const { GENERAL, TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = announcementsKeys;

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	avatar: string;
	description: string;
	isNsfwEnabled: boolean;
	settings: { announcements: UserAnnoucements };
}

export interface SliceUser extends User {
	wallets: Array<Wallet>;
	creditsBalance: number;
	creditsRedeem: number;
	imagesLeft: number;

	discordId: string; // User Connection by type - connection_id
	discordName: string; // User Connection by type - connection_name
}

// GENERAL should always be shown after successful login
// OTHERs should be seen only once per login and if 'don't show' option is false
export type UserAnnoucements = {
	[GENERAL]: boolean;
	[TEXT_TO_IMAGE]: boolean;
	[IMAGE_TO_IMAGE]: boolean;
	[TOOL_ENHANCE]: boolean;
};

export type Connection = {
	connectionId: string;
	connectionName: string;
};

/**
 * Expected API response type. Only props related to the FE are included.
 */
export type ResponseFetchUser = {
	id: number | null;
	name: string | null;
	username: string | null;
	email: string | null;
	avatar: string | null;
	description: string | null;
	nsfw: boolean | null;
	settings: ResponseUserSettings | null;
};

export type ResponseUpdateUser = ResponseFetchUser;

export type ResponseUserSettings = {
	announcements: ResponseUserSettingsAnnouncements;
};

export type ResponseUserSettingsAnnouncements = {
	general?: boolean;
	conjure?: boolean;
	transform?: boolean;
	enhance?: boolean;
	inpaint?: boolean;
};

export type ResponseConnection = {
	connection_id: string | null;
	connection_name: string | null;
};

export type RequestUpdateUser = {
	name: string;
	email: string;
	description: string;
};

export type RequestUpdateUserPassword = {
	password: string;
	new_password: string;
	new_password_confirmation: string;
};

export type RequestUpdateUserSettings = {
	announcements?: RequestUserSettingsAnnouncements;
};

export type RequestUserSettingsAnnouncements = {
	general?: boolean;
	conjure?: boolean;
	transform?: boolean;
	enhance?: boolean;
	inpaint?: boolean;
};

export type RequestUpdateUserAvatar = {
	file: File;
};

export type RequestUpdateUserNsfw = {
	nsfw: boolean;
};

export type RequestCreateConnection = { type: string };
