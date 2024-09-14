/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';
import { generationToolsKeys } from 'store/common/keys';

import strings from 'constants/strings';
import CostInfo from 'components/Common/CostInfo';
import BtnEnhance from 'components/ProjectSettings/Inputs/EnhanceTool/BtnEnhance';
import StyledUploadButtonContainer from '../../Common/DND/StyledUploadButtonContainer';

const { enhanceCost } = strings;
const { TOOL_ENHANCE } = generationToolsKeys;

const FooterSettingsEnhance: React.FC = () => {
	return (
		<Box>
			{/*
			<Box sx={{ margin: '12px 0' }}>
				<BtnUploadImage handleImageData={handleImageData} isDisabled={isGenerating} />
			</Box>
			*/}

			<StyledUploadButtonContainer
				typeGenerationTool={TOOL_ENHANCE}
				sx={{ margin: '12px 0' }}
			/>
			<BtnEnhance />
			<CostInfo message={enhanceCost} />
		</Box>
	);
};

export default FooterSettingsEnhance;
