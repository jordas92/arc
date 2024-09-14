/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { CircularProgress } from '@mui/material';

import { generationToolsKeys } from 'store/common/keys';

import strings from 'constants/strings';

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE } = generationToolsKeys;

const {
	generateFromTextBtnLabel,
	generateFromImageBtnLabel,
	generating,
	generateImages,
	providePrompt,
	inPaint,
} = strings;

const buttonLabel = (currentGenerationTool: string, currentIsInPaintMode: boolean) => {
	if (currentGenerationTool === TEXT_TO_IMAGE) {
		return generateFromTextBtnLabel;
	}

	if (currentGenerationTool === IMAGE_TO_IMAGE) {
		return currentIsInPaintMode ? inPaint : generateFromImageBtnLabel;
	}

	return '';
};

export const conditionalBtnContent = (
	currentGenerationTool: string,
	currentIsInPaintMode: boolean,
	currentIsRequestingGeneration: boolean,
	currentPrompt: string,
) => {
	if (currentIsRequestingGeneration) {
		return {
			btnContent: (
				<>
					{buttonLabel(currentGenerationTool, currentIsInPaintMode)}
					<CircularProgress
						size={18}
						thickness={5}
						disableShrink
						sx={{ position: 'absolute', top: '13px', color: 'white' }}
					/>
				</>
			),
			tooltip: generating,
		};
	}

	if (currentGenerationTool === TEXT_TO_IMAGE) {
		return {
			btnContent: buttonLabel(currentGenerationTool, currentIsInPaintMode),
			tooltip: currentPrompt ? generateImages : providePrompt,
		};
	}

	if (currentGenerationTool === IMAGE_TO_IMAGE) {
		return {
			btnContent: buttonLabel(currentGenerationTool, currentIsInPaintMode),
			tooltip: currentPrompt ? generateImages : providePrompt,
		};
	}

	return {
		btnContent: '',
		tooltip: '',
	};
};
