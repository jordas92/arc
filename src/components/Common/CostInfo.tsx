/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import { ReactComponent as IconCost } from 'assets/img/icons/cost.svg';

type Props = {
	message: string | ReactNode;
};

const CostInfo: React.FC<Props> = ({ message }) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', marginTop: '14px' }}>
			<IconCost />
			<Typography variant="body3" sx={{ marginLeft: '6px', letterSpacing: '0.3px' }}>
				{message}
			</Typography>
		</Box>
	);
};

export default CostInfo;
