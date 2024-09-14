/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ASPECT_RATIO_OFF, ASPECT_RATIO_LOCKED, ASPECT_RATIO_ONE_TO_ONE } from 'constants/default';

/**
 * Transform ratio label into dimensions for ratio tooltip visualization
 * @param ratioLabel string
 * @returns object
 */
export const ratioPreviewDimensions = (ratio: string) => {
	const boxSide = 20;

	const ratios = ratio.split(':').map(Number);
	const ratioW = ratios[0];
	const ratioH = ratios[1];

	const width = boxSide * (ratioW / ratioH);
	const height = boxSide;

	return { width, height };
};

/**
 * Returns provided string as reversed
 * e.g. form '2:3' to '3:2'
 * @returns string
 */
export const reverseRatioValue = (ratio: string) => {
	const irreversibleValues = [ASPECT_RATIO_OFF, ASPECT_RATIO_LOCKED, ASPECT_RATIO_ONE_TO_ONE];

	if (irreversibleValues.indexOf(ratio) === -1) {
		const values = ratio.split(':');

		if (values[0] && values[1]) {
			return `${values[1]}:${values[0]}`;
		}
	}

	return ratio;
};

export const handleApectRatio = (ratio: string, defaultValue?: string): string => {
	const defaultVal = defaultValue || '';
	const values = ratio.split(':');

	const width = Number(values[0]);
	const height = Number(values[1]);

	if (!width || !height || isNaN(width) || isNaN(height)) {
		return defaultVal;
	}

	return ratio;
};

export const handleIsAspectRatioPortrait = (ratio: string, defaultValue?: boolean): boolean => {
	const defaultVal = defaultValue || false;
	const values = ratio.split(':');

	const width = Number(values[0]);
	const height = Number(values[1]);

	if (width && height) {
		return width < height;
	}

	return defaultVal;
};

export const retrieveAspectRatioNumber = (ratio: string): number => {
	const values = ratio.split(':');

	const width = Number(values[0]);
	const height = Number(values[1]);

	return width / height;
};
