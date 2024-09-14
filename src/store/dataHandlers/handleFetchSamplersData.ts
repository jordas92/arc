/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationToolsKeys, generationTypes } from 'store/common/keys';
import { ResponseSamplers, ResponseSampler, Samplers } from 'store/types/typesSamplers';

import commonUtils from '../common/utils';

const { valueToString } = commonUtils;
const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { CONJURE, TRANSFORM, ENHANCE } = generationTypes;

type generationTypesKeys = keyof typeof generationTypes;

const handleFetchSamplersData = (response: ResponseSamplers | any): Samplers => {
	const samplers: Samplers = {
		[TEXT_TO_IMAGE]: {
			items: [],
			default: '',
		},
		[IMAGE_TO_IMAGE]: {
			items: [],
			default: '',
		},
		[TOOL_ENHANCE]: {
			items: [],
			default: '',
		},
	};

	if (Array.isArray(response)) {
		response.forEach((item: ResponseSampler) => {
			const availability = Array.isArray(item.availability) ? item.availability : [];
			const defaultValue = valueToString(item.default);
			const id = valueToString(item.id);
			const key = valueToString(item.key);
			const value = valueToString(item.title);

			const generationsKeys = [
				{ backendKey: CONJURE, frontendKey: TEXT_TO_IMAGE },
				{ backendKey: TRANSFORM, frontendKey: IMAGE_TO_IMAGE },
				{ backendKey: ENHANCE, frontendKey: TOOL_ENHANCE },
			];

			generationsKeys.forEach(
				(tool: {
					backendKey: (typeof generationTypes)[generationTypesKeys];
					frontendKey: keyof typeof generationToolsKeys;
				}) => {
					if (availability.find((item) => item === tool.backendKey)) {
						samplers[tool.frontendKey].items.push({
							id,
							key,
							value,
						});

						if (!samplers[tool.frontendKey].default) {
							samplers[tool.frontendKey].default =
								defaultValue === tool.backendKey ? key : '';
						}
					}
				},
			);
		});
	}

	return samplers;
};

export default handleFetchSamplersData;
