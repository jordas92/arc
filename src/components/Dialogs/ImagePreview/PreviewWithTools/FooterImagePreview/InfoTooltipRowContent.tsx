/** Copyright (c) 2023-present Kristiyan Dimitrov */
import React from 'react';
import { Box, Typography } from '@mui/material';

type Props = {
	label: string;
	value: string | number;
};

const InfoTooltipRowContent: React.FC<Props> = ({ label, value }) => {
	return (
		<Typography variant="h6">
			<Box component="span" sx={{ fontWeight: 'bold', marginRight: '5px' }}>
				{label}
			</Box>
			<Box component="span">{value}</Box>
		</Typography>
	);
};

export default InfoTooltipRowContent;
