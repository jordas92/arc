/** Copyright (c) 2023-present Kristiyan Dimitrov */

import {
	ControlNetTools,
	ResponseControlNetTool,
	ResponseControlNetTools,
} from 'store/types/typesControlNet';
import { controlNetKeys } from 'store/common/keys';
import commonUtils from '../common/utils';

const { valueToString } = commonUtils;

const handleFetchControlNetToolsData = (
	response: ResponseControlNetTools | any,
): ControlNetTools => {
	const controlNetTools: ControlNetTools = {};

	const defaultPayload = {
		data: [],
	};

	// Takes care of the scenario when 'data' and 'meta' props are missing in the payload
	const { data: responseData = defaultPayload.data } = response;

	if (Array.isArray(responseData)) {
		responseData.forEach((item: ResponseControlNetTool) => {
			const key = item.key.toUpperCase();

			if (key in controlNetKeys) {
				controlNetTools[key] = {
					buttonTooltip: {
						title: valueToString(item.tooltip_title),
						description: valueToString(item.tooltip_description),
						thumbUrl: valueToString(item.thumb_url),
						videoUrl: valueToString(item.video_url),
					},
					drawer: {
						title: valueToString(item.name),
						tooltip: valueToString(item.tooltip),
						description: valueToString(item.description),
					},
					controlNetGenerationData: {
						sourceImageUrl: '',
						sourceImageBase64: '',
						preProcessedImageUrl: '',
						isSourceImageShown: false,
						isImagePreprocessed: false,
						influence: 1,
					},
					isImagesContainerExpanded: false,
				};
			}
		});
	}

	return controlNetTools;
};

export default handleFetchControlNetToolsData;
