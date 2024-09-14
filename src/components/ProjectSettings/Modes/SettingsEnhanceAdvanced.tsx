/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, useTheme } from '@mui/material';

import strings from 'constants/strings';
import StyledSettingsToolWrapper from 'components/StyledWrappers/StyledSettingsToolWrapper';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import InputStyles from 'components/Common/InputStyles';
import InputSampler from 'components/Common/InputSampler';

import BtnRestoreDefaults from '../Inputs/EnhanceTool/BtnRestoreDefaults';
import InputCreativity from '../Inputs/EnhanceTool/InputCreativity';
import InputScaleFactorAdvanced from '../Inputs/EnhanceTool/InputScaleFactorAdvanced';
import InputPromptEnhance from '../Inputs/EnhanceTool/InputPromptEnhance';
import InputEngine from '../Inputs/EnhanceTool/InputEngine';
import InputDetails from '../Inputs/EnhanceTool/InputDetails';

const { enhancements } = strings;

const SettingsEnhanceAdvanced: React.FC = () => {
	const theme = useTheme();

	return (
		<>
			<StyledSettingsToolWrapper>
				<InputEngine />
			</StyledSettingsToolWrapper>

			<StyledSettingsToolWrapper margin="0 0 24px">
				<InputSampler />
			</StyledSettingsToolWrapper>

			<Box
				sx={{
					display: ' flex',
					justifyContent: 'space-between',
					margin: '0 0 8px',
				}}
			>
				<LabelSettingInput label={enhancements} margin="0" />
				<BtnRestoreDefaults />
			</Box>

			<StyledSettingsToolWrapper>
				<InputDetails />
				<InputCreativity />
			</StyledSettingsToolWrapper>

			<StyledSettingsToolWrapper>
				<InputScaleFactorAdvanced />
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

export default SettingsEnhanceAdvanced;
