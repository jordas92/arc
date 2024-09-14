/** Copyright (c) 2023-present Kristiyan Dimitrov */

import commonUtils from '../common/utils';

import { ResponseCreateProject } from '../types/typesProjects';

const { valueToString } = commonUtils;

/**
 * Handles the API response. Returns data ready for safe use within the Components
 * @param response The API response
 */
const handleCreateProjectData = (response: ResponseCreateProject | any): string => {
	return valueToString(response?.id);
};

export default handleCreateProjectData;
