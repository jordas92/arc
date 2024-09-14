/** Copyright (c) 2023-present Kristiyan Dimitrov */

import {
	MAX_PIXEL_COUNT_NON_SDXL_MODELS,
	MAX_PIXEL_COUNT_SDXL_MODELS,
	MAX_PIXEL_COUNT_TRANSFORM_FROM_ENHANCE,
	MAX_PIXEL_IN_PAINT_STATE,
} from 'constants/default';
import strings from 'constants/strings';
import routesPaths from 'routes/paths';
import { sourceImageOriginKeys } from 'store/common/keys';

const { ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE } = sourceImageOriginKeys;
const { USER_CONNECT_TO_DISCORD } = routesPaths;

/**
 * Retrieves origin from the current page URL
 * * e.g. "https://abc.xyz.com/any/some" returns: "https://abc.xyz.com"
 */
export const getOriginFromUrl = (): string => {
	const { origin } = window.location;

	return origin || '';
};

/**
 * Returns the URL 'origin' for APIs calls, based on NODE_ENV.
 * For local development, it will return your .env variable.
 * For production build, it will use the same .env variable set form the BE.
 */
export const getApiOrigin = (): string => {
	return process.env.REACT_APP_API_URL || 'Check_Your_Env_Variables';
};

/**
 * Retrieves key value from the browser Local Storage
 */
export const getItemFromLocalStorage = (key: string): string => {
	return window.localStorage.getItem(key) || '';
};

/**
 * Adds a key-value pair to the browser Local Storage
 */
export const setItemToLocalStorage = (key: string, value: string): void => {
	window.localStorage.setItem(key, value);
};

/**
 * Copy the text to the clipboard
 */
export const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text);
};

/**
 * Validate image dimensions according to the selected model
 *
 * Maximum total dimensions (height+width) maximums:
 * - SD1.5 Models (Photo, 3d cartoon, etc) Pixel Count: 1600
 * - SDXL Models Pixel Count: 2048
 *
 * @returns object
 */
export const validateImageDimensions = (width: number, height: number, modelType: string) => {
	const { imageDimensionConstraintSDXL, imageDimensionConstraintNonSDXL } = strings;

	let isLimitExceeded = false;
	let validationMessage = '';

	if (modelType && modelType.includes('_sdxl')) {
		if (width + height > MAX_PIXEL_COUNT_SDXL_MODELS) {
			isLimitExceeded = true;
			validationMessage = imageDimensionConstraintSDXL;
		}
	} else if (width + height > MAX_PIXEL_COUNT_NON_SDXL_MODELS) {
		isLimitExceeded = true;
		validationMessage = imageDimensionConstraintNonSDXL;
	}

	return {
		isLimitExceeded,
		validationMessage,
	};
};

export const validateImageSource = (
	width: number,
	height: number,
	sourceImageOrigin: keyof typeof sourceImageOriginKeys | string = '',
) => {
	let isLimitExceeded = false;
	let message = '';

	// Image height + width cannot exceed 2600 pixels. Your image was {x} pixels.
	if (width + height > MAX_PIXEL_IN_PAINT_STATE) {
		isLimitExceeded = true;
		message = `${strings.inPaintConjureConstraint}Your image was ${width}x${height} pixels.`;
	}

	if (
		sourceImageOrigin === ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE &&
		width + height > MAX_PIXEL_COUNT_TRANSFORM_FROM_ENHANCE
	) {
		isLimitExceeded = true;
		// eslint-disable-next-line max-len
		message = `Whoops! Image height + width cannot exceed ${MAX_PIXEL_COUNT_TRANSFORM_FROM_ENHANCE} pixels. Please adjust output size within the Advanced tab.`;
	}

	return {
		isLimitExceeded,
		message,
	};
};

/**
 * Converts and format time duration in seconds to hh:mm:ss
 * @param duration number
 * @returns string
 */
export const formatDuration = (duration: number) => {
	const hours = Math.floor(duration / 3600);
	const minutes = Math.floor((duration % 3600) / 60);
	const seconds = Math.floor(duration % 60);

	let formattedDuration = '';

	if (hours > 0) {
		formattedDuration += hours < 10 ? `0${hours}:` : `${hours}:`;
	}

	formattedDuration += minutes < 10 ? `0${minutes}` : minutes;
	formattedDuration += `:${seconds < 10 ? `0${seconds}` : seconds}`;

	return formattedDuration;
};

/**
 * Checks if any object within an array contains a specific projectId, skipping the first item.
 *
 * @param {Object[]} projects - The array of project objects to search through.
 * @param {string} projectId - The projectId to search for within the array of projects.
 * @returns {boolean} Returns true if the projectId
 * is found within any of the objects in the array (except the first item), otherwise returns false.
 */
export const containsProjectIdSkipFirst = (projects, projectId) => {
	// Skip the first item by slicing the array from index 1
	return projects.some((project) => project.projectId === projectId);
};

/**
 * Checks if any object within an array contains a specific projectId and has a date within the last 5 seconds.
 * @param {Object[]} projects - The array of project objects to search through.
 * @param {string} projectId - The projectId to search for within the array of projects.
 * @returns {boolean} Returns false if the projectId is found within any
 * of the objects in the array and the date is within the last 5 seconds, otherwise returns true.
 */
export const containsProjectIdAndRecentDate = (projects, projectId) => {
	// Find the project with the given projectId
	const project = projects.find((project) => project.projectId === projectId);

	// If no project found with the given projectId, return false
	if (!project) {
		console.log('No project found with projectId:', projectId);
		return false;
	}

	const timezoneOffset = new Date().getTimezoneOffset() / 60; // in hours
	const eventTime = new Date(project.date).getTime(); // in milliseconds
	const nowTime = new Date().setHours(new Date().getHours() + timezoneOffset); // in milliseconds
	const timeDiff = nowTime - eventTime; // in milliseconds

	// Check if 5 seconds have passed since the project's date
	const fiveSecondsInMillis = 5000;
	if (timeDiff >= fiveSecondsInMillis) {
		// console.log('5 seconds have passed since', project.date);
		return true;
	}
	// console.log('5 seconds have not passed since', project.date);
	return false;
};

/**
 * Returns the URL for connecting the user with Discord
 */
export const connectUserToDiscordUrl = () => {
	const origin = getApiOrigin();

	return `${origin}${USER_CONNECT_TO_DISCORD}`;
};
