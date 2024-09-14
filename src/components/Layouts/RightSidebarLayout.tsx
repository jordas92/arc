/** Copyright (c) 2023-present Kristiyan Dimitrov */
/* eslint-disable camelcase */

import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

import useCurrentGenerationToolAndMode from 'hooks/useCurrentGenerationToolAndMode';
import { generationToolsCases } from 'store/common/keys';

import { APP_HEADER_HEIGHT } from 'constants/default';

import SettingsConfigurationModeSwitch from '../ProjectSettings/SettingsConfigurationModeSwitch';
import SettingsFooter from '../ProjectSettings/SettingsFooter/SettingsFooter';
import SettingsHeader from '../ProjectSettings/SettingsHeader';
import StyledControlsContainer from '../StyledWrappers/StyledControlsContainer';

const StyledBox = styled(Box)(({ theme }) => ({
	width: '370px',
	padding: '16px 24px',
	height: `calc(100vh - ${APP_HEADER_HEIGHT})`,
	overflowY: 'auto',
	borderLeft: `1px solid ${theme.palette.background.surfaceHighest}`,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
}));

const {
	TEXT_TO_IMAGE_and_SIMPLE,
	TEXT_TO_IMAGE_and_ADVANCED,
	IMAGE_TO_IMAGE_and_SIMPLE,
	IMAGE_TO_IMAGE_and_ADVANCED,
	ENHANCE_and_SIMPLE,
	ENHANCE_and_ADVANCED,
} = generationToolsCases;

const RightSidebarLayout: React.FC = () => {
	const currentGenerationToolAndMode = useCurrentGenerationToolAndMode();

	const conditionalContentHeight = () => {
		switch (currentGenerationToolAndMode) {
			case TEXT_TO_IMAGE_and_SIMPLE:
				return '100%';

			case ENHANCE_and_SIMPLE:
			case ENHANCE_and_ADVANCED:
				return 'calc(100% - 160px)';

			default:
				return 'calc(100% - 95px)';
		}
	};

	const conditionalControlsContainerHeight = () => {
		switch (currentGenerationToolAndMode) {
			case TEXT_TO_IMAGE_and_ADVANCED:
			case IMAGE_TO_IMAGE_and_SIMPLE:
			case IMAGE_TO_IMAGE_and_ADVANCED:
				return 'calc(100% - 60px)';

			default:
				return 'calc(100% - 45px)';
		}
	};

	return (
		<StyledBox>
			<Box sx={{ height: conditionalContentHeight() }}>
				<SettingsHeader />
				<StyledControlsContainer height={conditionalControlsContainerHeight()}>
					<SettingsConfigurationModeSwitch />
				</StyledControlsContainer>
			</Box>

			<SettingsFooter />
		</StyledBox>
	);
};

export default RightSidebarLayout;
