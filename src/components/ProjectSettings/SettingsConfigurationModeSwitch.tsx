/** Copyright (c) 2023-present Kristiyan Dimitrov */
/* eslint-disable camelcase */

import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

import { generationToolsCases } from 'store/common/keys';

import strings from 'constants/strings';
import useCurrentGenerationToolAndMode from 'hooks/useCurrentGenerationToolAndMode';
import StyledSettingsToolWrapper from 'components/StyledWrappers/StyledSettingsToolWrapper';
import LabelSettingInput from 'components/Common/LabelSettingInput';

import SettingsTextToImageAdvanced from './Modes/SettingsTextToImageAdvanced';
import SettingsImageToImageAdvanced from './Modes/SettingsImageToImageAdvanced';
import SettingsEnhanceSimple from './Modes/SettingsEnhanceSimple';
import SettingsEnhanceAdvanced from './Modes/SettingsEnhanceAdvanced';
import SavedPrompts from './SavedPrompts/SavedPrompts';
import RatioSimple from './Inputs/RatioSimple/RatioSimple';
import ModelBoxList from './Inputs/ModelBoxList';

const {
	TEXT_TO_IMAGE_and_SIMPLE,
	TEXT_TO_IMAGE_and_ADVANCED,
	IMAGE_TO_IMAGE_and_SIMPLE,
	IMAGE_TO_IMAGE_and_ADVANCED,
	ENHANCE_and_SIMPLE,
	ENHANCE_and_ADVANCED,
} = generationToolsCases;

type CustomProps = {
	maxHeight?: string;
};

const ScrollableWrapper = styled(Box, {
	shouldForwardProp: (prop: string) => !['maxHeight'].includes(prop),
})<CustomProps>(({ maxHeight }) => ({
	maxHeight: maxHeight || '100%',
	overflowY: 'auto',
	overflowX: 'hidden',
}));

const SettingsConfigurationModeSwitch: React.FC = () => {
	const currentGenerationToolAndMode = useCurrentGenerationToolAndMode();

	const conditionalContent = () => {
		switch (currentGenerationToolAndMode) {
			case TEXT_TO_IMAGE_and_SIMPLE:
				return (
					<>
						<StyledSettingsToolWrapper>
							<SavedPrompts />
						</StyledSettingsToolWrapper>

						<StyledSettingsToolWrapper>
							<RatioSimple />
						</StyledSettingsToolWrapper>

						<ScrollableWrapper maxHeight="calc(100% - 150px)">
							<ModelBoxList />
						</ScrollableWrapper>
					</>
				);

			case TEXT_TO_IMAGE_and_ADVANCED:
				return (
					<ScrollableWrapper>
						<SettingsTextToImageAdvanced />
					</ScrollableWrapper>
				);

			case IMAGE_TO_IMAGE_and_SIMPLE:
				return (
					<>
						<StyledSettingsToolWrapper>
							<SavedPrompts />
						</StyledSettingsToolWrapper>

						<LabelSettingInput label={strings.labelSimpleModels} />

						<ScrollableWrapper maxHeight="calc(100% - 85px)">
							<ModelBoxList />
						</ScrollableWrapper>
					</>
				);

			case IMAGE_TO_IMAGE_and_ADVANCED:
				return (
					<ScrollableWrapper>
						<SettingsImageToImageAdvanced />
					</ScrollableWrapper>
				);

			case ENHANCE_and_SIMPLE:
				return (
					<ScrollableWrapper>
						<SettingsEnhanceSimple />
					</ScrollableWrapper>
				);

			case ENHANCE_and_ADVANCED:
				return (
					<ScrollableWrapper>
						<SettingsEnhanceAdvanced />
					</ScrollableWrapper>
				);

			default:
				return null;
		}
	};

	return <>{conditionalContent()}</>;
};

export default SettingsConfigurationModeSwitch;
