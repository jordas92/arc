/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Button, Tooltip } from '@mui/material';

import strings from 'constants/strings';

const { surpriseMeButtonLabel, comingSoon } = strings;

const ButtonSurpriseMe: React.FC = () => {
	return (
		<Tooltip title={comingSoon} placement="top" arrow>
			<Box>
				<Button variant="flat" fullWidth disabled>
					{surpriseMeButtonLabel}
				</Button>
			</Box>
		</Tooltip>
	);
};

export default ButtonSurpriseMe;
