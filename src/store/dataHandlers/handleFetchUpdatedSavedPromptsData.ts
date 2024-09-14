/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { ResponseUpdatedSavedPrompt, SavedPrompt } from '../types/typesSavedPrompts';
import commonUtils from '../common/utils';

const { valueToString } = commonUtils;

const handleFetchUpdatedSavedPromptsData = (
	response: ResponseUpdatedSavedPrompt | any,
): SavedPrompt => {
	return {
		id: valueToString(response?.id),
		title: valueToString(response?.title),
		prompt: valueToString(response?.prompt),
	};
};

export default handleFetchUpdatedSavedPromptsData;
