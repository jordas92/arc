/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import StyledSettingsToolWrapper from 'components/StyledWrappers/StyledSettingsToolWrapper';
import InputModels from 'components/Common/InputModels';

import NegativePrompt from '../Inputs/NegativePrompt';
import SavedPrompts from '../SavedPrompts/SavedPrompts';
import ImageSize from '../ImageSize/ImageSize';
import ParametersContainer from '../Parameters/ParametersContainer';

const SettingsImageToImageAdvanced: React.FC = () => {
	return (
		<Box>
			<StyledSettingsToolWrapper>
				<InputModels />
			</StyledSettingsToolWrapper>

			<StyledSettingsToolWrapper>
				<SavedPrompts />
			</StyledSettingsToolWrapper>

			<StyledSettingsToolWrapper margin="0 0 24px">
				<ImageSize />
			</StyledSettingsToolWrapper>

			<StyledSettingsToolWrapper>
				<ParametersContainer />
			</StyledSettingsToolWrapper>

			<NegativePrompt />
		</Box>
	);
};

export default SettingsImageToImageAdvanced;
