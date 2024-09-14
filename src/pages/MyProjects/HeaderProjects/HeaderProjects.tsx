/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Typography } from '@mui/material';

import strings from '../../../constants/strings';

const { myProjects } = strings;

const HeaderProjects: React.FC = () => {
	return (
		<Box display="flex" justifyContent="space-between" p="44px 0 24px">
			<Typography variant="h2">{myProjects}</Typography>
			{/* FUTURE FEATURE */}
			{/* <SearchBar /> */}
		</Box>
	);
};

export default HeaderProjects;
