/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import {
	ResponseFetchSavedPrompts,
	ResponseSavedPrompt,
	SavedPrompt,
	SavedPrompts,
} from '../types/typesSavedPrompts';

const { valueToString, handleNextPageValue } = commonUtils;

const handleFetchSavedPromptsData = (response: ResponseFetchSavedPrompts | any): SavedPrompts => {
	const items: SavedPrompt[] = [];

	const defaultPayload = {
		data: [],
		meta: {
			current_page: null,
			last_page: null,
		},
	};

	// Takes care of the scenario when 'data' and 'meta' props are missing in the payload
	const { data: responseData = defaultPayload.data, meta: responseMeta = defaultPayload.meta } =
		response;

	if (Array.isArray(responseData)) {
		responseData.forEach((item: ResponseSavedPrompt) => {
			const id = valueToString(item?.id);
			const title = valueToString(item?.title);
			const prompt = valueToString(item?.prompt, 'N/A');

			if (id && title && prompt) {
				items.push({
					id,
					title,
					prompt,
				});
			}
		});
	}

	const nextPage = handleNextPageValue(responseMeta);

	return { items, nextPage };
};

export default handleFetchSavedPromptsData;
