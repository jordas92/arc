/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Skeleton } from '@mui/material';

import StyledContainerGeneration from 'components/StyledWrappers/StyledContainerGeneration';

const ContainerGenerationLoading: React.FC = () => {
	return (
		<StyledContainerGeneration hasPadding>
			<Skeleton variant="rounded" width="100%" height="70%" />
			<Box sx={{ display: 'flex' }}>
				<Skeleton sx={{ margin: '2px' }} variant="rounded" width="70px" height="70px" />
				<Skeleton sx={{ margin: '2px' }} variant="rounded" width="70px" height="70px" />
				<Skeleton sx={{ margin: '2px' }} variant="rounded" width="70px" height="70px" />
				<Skeleton sx={{ margin: '2px' }} variant="rounded" width="70px" height="70px" />
			</Box>
		</StyledContainerGeneration>
	);
};

export default ContainerGenerationLoading;
