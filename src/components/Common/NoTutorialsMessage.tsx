/** Copyright (c) 2023-present Kristiyan Dimitrov */
import React from 'react';
import { Box, Typography } from '@mui/material';

import { APP_HEADER_HEIGHT } from 'constants/default';

type Props = {
	message: string;
};

const NoTutorialsMessage: React.FC<Props> = ({ message }) => {
	return (
		<Box sx={{ height: `calc(100vh - ${APP_HEADER_HEIGHT})` }}>
			<Typography variant="body1" sx={{ textAlign: 'center', marginTop: '24px' }}>
				{message}
			</Typography>
		</Box>
	);
};

export default NoTutorialsMessage;
