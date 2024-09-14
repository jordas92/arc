/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Typography } from '@mui/material';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import strings from 'constants/strings';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import SliderValueContainerBasic from 'components/Common/SliderValueContainerBasic';

const { labelWidth, enhanceMaxImageSize } = strings;

const InputCreativity: React.FC = () => {
	const { currentEnhanceResizedWidth, currentEnhanceResizedHeight } = useSliceOpenedProjects();

	return (
		<Box display="flex" justifyContent="space-between" alignItems="flex-start">
			<Box>
				<LabelSettingInput label={labelWidth} margin="0" />
				<Typography variant="body3" color="text.textLowest">
					{enhanceMaxImageSize}
				</Typography>
			</Box>
			<Box display="flex" alignItems="center">
				<SliderValueContainerBasic value={currentEnhanceResizedWidth} width="60px" />
				<Typography
					variant="h5"
					color="text.active"
					component="span"
					sx={{ padding: '0 8px' }}
				>
					x
				</Typography>
				<SliderValueContainerBasic
					value={currentEnhanceResizedHeight}
					width="60px"
					color="text.disabled"
				/>
			</Box>
		</Box>
	);
};

export default InputCreativity;
