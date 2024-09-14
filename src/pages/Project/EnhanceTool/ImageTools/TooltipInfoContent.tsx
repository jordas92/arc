/** Copyright (c) 2023-present Kristiyan Dimitrov */
import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	padding: '6px',
	margin: '0 8px 8px 0',
	borderRadius: '55px',
	border: '1px solid',
	borderColor: theme.palette.background.surfaceHighest,
}));

type Props = {
	label: string;
	value: string | number;
};

const TooltipInfoContent: React.FC<Props> = ({ label, value }) => {
	return (
		<StyledBox>
			<Typography
				variant="h6"
				component="span"
				sx={{ marginRight: '4px', color: 'text.secondary' }}
			>
				{label}
			</Typography>
			<Typography variant="h6" component="span" sx={{ textTransform: 'capitalize' }}>
				{value}
			</Typography>
		</StyledBox>
	);
};

export default TooltipInfoContent;
