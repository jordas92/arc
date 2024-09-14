/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { generationTypes, consumerTypes } from '../common/keys';
import commonUtils from '../common/utils';
import strings from '../common/strings';

import {
	Project,
	Projects,
	ProjectOpenedInit,
	ResponseFetchProjects,
	ResponseFetchProjectsProject,
	ResponseFetchProject,
} from '../types/typesProjects';

const {
	valueToString,
	valueToBoolean,
	handleNextPageValue,
	handleLastEditedValue,
	handleThumbValue,
	generationToolFromGenerationType,
} = commonUtils;

const { lastEdited, notAvailable } = strings;
const { CONJURE } = generationTypes;
const { CONSUMER_DISCORD } = consumerTypes;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchProjectsData = (response: ResponseFetchProjects | any): Projects => {
	const items: Project[] = [];

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
		responseData.map((item: ResponseFetchProjectsProject) => {
			return items.push({
				projectId: valueToString(item?.id),
				projectTitle: valueToString(item?.title),
				projectLastEdited: item?.updated_at
					? handleLastEditedValue(item?.updated_at)
					: `${lastEdited} ${notAvailable}`,
				imageUrl: valueToString(item?.leading_image?.url),
				thumbUrl: handleThumbValue(
					item?.leading_image?.thumb_url,
					item?.leading_image?.url,
				),
				isNsfw: valueToBoolean(item?.leading_image?.nsfw, true),
				promptId: valueToString(item?.leading_image?.prompt_id),
				generationType: valueToString(item?.leading_image?.type, CONJURE),
				isDiscord: item?.consumer === CONSUMER_DISCORD,
			});
		});
	}

	const nextPage = handleNextPageValue(responseMeta);

	return { items, nextPage };
};

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
export const handleFetchProjectData = (response: ResponseFetchProject | any): ProjectOpenedInit => {
	return {
		projectId: valueToString(response?.id),
		projectTitle: valueToString(response?.title),
		isDiscord: response?.consumer === CONSUMER_DISCORD,
		currentGenerationTool: generationToolFromGenerationType(
			valueToString(response?.leading_image?.type, CONJURE),
		),
	};
};
