/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { announcementsKeys } from 'store/common/keys';
import commonUtils from '../common/utils';

import { ResponseFetchUser, ResponseUserSettings, User } from '../types/typesUser';

const { valueToString, valueToBoolean, valueToNumber } = commonUtils;
const { GENERAL, TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = announcementsKeys;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleFetchUserData = (response: ResponseFetchUser | any): User => {
	return {
		id: valueToNumber(response.id),
		name: valueToString(response.name),
		username: valueToString(response.username),
		email: valueToString(response.email),
		avatar: valueToString(response.avatar),
		description: valueToString(response.description),
		isNsfwEnabled: valueToBoolean(response.nsfw, true),
		settings: handleUserSettings(response.settings),
	};
};

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleUserSettings = (userSettings: ResponseUserSettings | null) => {
	return {
		announcements: {
			[GENERAL]: valueToBoolean(userSettings?.announcements.general, true),
			[TEXT_TO_IMAGE]: valueToBoolean(userSettings?.announcements.conjure, true),
			[IMAGE_TO_IMAGE]: valueToBoolean(userSettings?.announcements.transform, true),
			[TOOL_ENHANCE]: valueToBoolean(userSettings?.announcements.enhance, true),
			// TODO_NEXT
			// [TOOL_INPAINT]: valueToBoolean(userSettings?.announcements.inpaint),
		},
	};
};

export default handleFetchUserData;
