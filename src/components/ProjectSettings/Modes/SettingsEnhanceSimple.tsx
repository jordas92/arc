/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, useTheme } from '@mui/material';

import StyledSettingsToolWrapper from 'components/StyledWrappers/StyledSettingsToolWrapper';
import InputStyles from 'components/Common/InputStyles';
import { sizeKeys } from 'constants/default';

import BtnRestoreDefaults from '../Inputs/EnhanceTool/BtnRestoreDefaults';
import InputCreativity from '../Inputs/EnhanceTool/InputCreativity';
import InputSharpnessSimple from '../Inputs/EnhanceTool/InputSharpnessSimple';
import InputScaleFactorSimple from '../Inputs/EnhanceTool/InputScaleFactorSimple';
import InputEnhanceModel from '../Inputs/EnhanceTool/InputEnhanceModel';
import InputPromptEnhance from '../Inputs/EnhanceTool/InputPromptEnhance';

const { L } = sizeKeys;

const SettingsEnhanceSimple: React.FC = () => {
	const theme = useTheme();

	return (
		<>
			<Box sx={{ marginBottom: '12px', textAlign: 'right' }}>
				<BtnRestoreDefaults />
			</Box>

			<InputCreativity sliderSize={L} valueContainerWidth="40px" />

			<StyledSettingsToolWrapper>
				<InputEnhanceModel />
			</StyledSettingsToolWrapper>

			<StyledSettingsToolWrapper>
				<InputSharpnessSimple />
			</StyledSettingsToolWrapper>

			<StyledSettingsToolWrapper margin="0">
				<InputScaleFactorSimple />
			</StyledSettingsToolWrapper>

			<Box
				sx={{
					margin: '24px 0',
					border: `1px solid ${theme.palette.background.surfaceLow}`,
				}}
			/>

			<StyledSettingsToolWrapper>
				<InputStyles />
			</StyledSettingsToolWrapper>

			<StyledSettingsToolWrapper margin="0 0 1px">
				<InputPromptEnhance />
			</StyledSettingsToolWrapper>
		</>
	);
};

export default SettingsEnhanceSimple;
