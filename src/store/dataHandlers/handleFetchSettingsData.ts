/** Copyright (c) 2023-present Kristiyan Dimitrov */

import {
	ResponseFetchAspectRatios,
	ResponseAspectRatiosItem,
	AspectRatios,
	AspectRatio,
} from 'store/types/typesAspectRatios';
import commonUtils from 'store/common/utils';
import { handleApectRatio, reverseRatioValue } from 'utils/aspectRatioUtils';

const { valueToString, valueToNumber } = commonUtils;

const handleAspectRatios = (responseAspectRatios: Array<ResponseAspectRatiosItem>) => {
	const aspectRatios = {
		landscape: [] as Array<AspectRatio>,
		portrait: [] as Array<AspectRatio>,
	};

	if (Array.isArray(responseAspectRatios)) {
		responseAspectRatios.forEach((item: ResponseAspectRatiosItem) => {
			const ar = handleApectRatio(valueToString(item?.ar));
			const width = valueToNumber(item?.width);
			const height = valueToNumber(item?.height);

			if (ar && width && height) {
				// With the assumption that all AR will be provided from the admin panel as landscape! (e.g. '16:9')
				aspectRatios.landscape.push({
					ar,
					width,
					height,
				});

				aspectRatios.portrait.push({
					ar: reverseRatioValue(ar),
					width: height,
					height: width,
				});
			} else {
				console.error('handleAspectRatios - invalid Aspect Ratio item received');
			}
		});
	}

	return aspectRatios;
};

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchAspectRatiosData = (
	response: ResponseFetchAspectRatios | any,
): AspectRatios => {
	const defaultPayload = {
		standard: {
			landscape: [],
			portrait: [],
		},
		sdxl: {
			landscape: [],
			portrait: [],
		},
	};

	// Takes care of the scenario when 'standard' and 'sdxl' props are missing in the payload
	const {
		standard: responseStandard = defaultPayload.standard,
		sdxl: responseSdxl = defaultPayload.sdxl,
	} = response;

	return {
		standard: handleAspectRatios(responseStandard),
		sdxl: handleAspectRatios(responseSdxl),
	};
};
