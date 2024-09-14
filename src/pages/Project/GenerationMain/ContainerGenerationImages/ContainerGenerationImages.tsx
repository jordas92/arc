/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Typography } from '@mui/material';

import { Generation } from 'store/types/typesPrompts';
import { generationToolsKeys } from 'store/common/keys';

import strings from 'constants/strings';
import StyledContainerGeneration from 'components/StyledWrappers/StyledContainerGeneration';
import ListView from './ListView/ListView';

type Props = {
	currentGeneration: Generation;
	currentActiveImageIndex: number;
	currentGenerationTool: keyof typeof generationToolsKeys;
};

const { noImages } = strings;

const ContainerGenerationImages: React.FC<Props> = ({
	currentGeneration,
	currentActiveImageIndex,
	currentGenerationTool,
}) => {
	const conditionalContent = () => {
		if (currentGeneration.images.length === 0 && !currentGeneration.isGenerating) {
			return (
				<StyledContainerGeneration hasPadding>
					<Box />
					<Typography variant="h3">{noImages}</Typography>
					<Box />
				</StyledContainerGeneration>
			);
		}

		if (currentGeneration.images.length > 0) {
			return (
				<ListView
					currentGeneration={currentGeneration}
					currentActiveImageIndex={currentActiveImageIndex}
					currentGenerationTool={currentGenerationTool}
				/>
			);
		}

		return null;
	};

	return <>{conditionalContent()}</>;
};

export default ContainerGenerationImages;
