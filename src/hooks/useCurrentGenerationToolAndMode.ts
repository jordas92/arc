/** Copyright (c) 2023-present Kristiyan Dimitrov */
/* eslint-disable camelcase */

import {
	generationToolModes,
	generationToolsCases,
	generationToolsKeys,
} from '../store/common/keys';
import useSliceOpenedProjects from '../store/hooks/useSliceOpenedProjects';

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { SIMPLE, ADVANCED } = generationToolModes;
const {
	TEXT_TO_IMAGE_and_SIMPLE,
	TEXT_TO_IMAGE_and_ADVANCED,
	IMAGE_TO_IMAGE_and_SIMPLE,
	IMAGE_TO_IMAGE_and_ADVANCED,
	ENHANCE_and_SIMPLE,
	ENHANCE_and_ADVANCED,
} = generationToolsCases;

const useCurrentGenerationToolAndMode = () => {
	const { currentGenerationTool, currentMode } = useSliceOpenedProjects();

	const createCaseStatement = () => {
		// TEXT_TO_IMAGE (Conjure)
		if (currentGenerationTool === TEXT_TO_IMAGE && currentMode === SIMPLE) {
			return TEXT_TO_IMAGE_and_SIMPLE;
		}

		if (currentGenerationTool === TEXT_TO_IMAGE && currentMode === ADVANCED) {
			return TEXT_TO_IMAGE_and_ADVANCED;
		}

		// IMAGE_TO_IMAGE (Transform)
		if (currentGenerationTool === IMAGE_TO_IMAGE && currentMode === SIMPLE) {
			return IMAGE_TO_IMAGE_and_SIMPLE;
		}

		if (currentGenerationTool === IMAGE_TO_IMAGE && currentMode === ADVANCED) {
			return IMAGE_TO_IMAGE_and_ADVANCED;
		}

		// TOOL_ENHANCE (Enhance)
		if (currentGenerationTool === TOOL_ENHANCE && currentMode === SIMPLE) {
			return ENHANCE_and_SIMPLE;
		}

		if (currentGenerationTool === TOOL_ENHANCE && currentMode === ADVANCED) {
			return ENHANCE_and_ADVANCED;
		}

		return '';
	};

	return createCaseStatement();
};

export default useCurrentGenerationToolAndMode;
