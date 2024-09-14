/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';

import strings from 'constants/strings';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';

import InputRatioSimple from './InputRatioSimple';
import BtnSwapRatioSimple from './BtnSwapRatioSimple';

const StyledTitleButtonGroup = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	marginBottom: '16px', // THEME_NEXT
}));

const RatioSimple: React.FC = () => {
	return (
		<>
			<StyledTitleButtonGroup>
				<Typography variant="h5">{strings.ratioAndModels}</Typography>
			</StyledTitleButtonGroup>
			<StyledContainerTools sx={{ padding: '0' }}>
				<Box display="flex" justifyContent="space-between">
					<InputRatioSimple />
					<BtnSwapRatioSimple />
				</Box>
			</StyledContainerTools>
		</>
	);
};

export default RatioSimple;
