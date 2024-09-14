/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';
import { handleFetchedPrompt } from './handleFetchPromptsData';

import { ResponseGenerate, GenerateHandledResponse } from '../types/typesGeneration';

const { valueToString, generationToolFromGenerationType } = commonUtils;

/**
 * Handles the Pusher response. Returns data ready for feeding the Store
 * @param response The Pusher (the generate action) response
 */
const handleGenerateResponse = (response: ResponseGenerate): GenerateHandledResponse => {
	if (response.error) {
		return {
			generationData: null,
			generationError: {
				projectId: valueToString(response.project_id),
				generationTool: generationToolFromGenerationType(response.type),
				promptId: valueToString(response.prompt_id),
				errorMessage:
					valueToString(response.error) || 'The generation of an image has failed!',
			},
		};
	}

	return {
		generationError: null,
		generationData: handleFetchedPrompt(response),
	};
};

export default handleGenerateResponse;
