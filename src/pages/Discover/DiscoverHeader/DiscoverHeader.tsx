/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Typography } from '@mui/material';

import strings from 'constants/strings';
import TutorialsSearch from './DiscoverSearch';

type Props = {
	searchPlaceHolder?: string;
	handleSearchParamQuery?: Function;
};

const { discoverTitle } = strings;

const DiscoverHeader: React.FC<Props> = ({ searchPlaceHolder, handleSearchParamQuery }) => {
	// Will display the Search component if 'handleSearchParamQuery' is provided
	const hasSearch = !!handleSearchParamQuery;

	return (
		<Box display="flex" justifyContent="space-between" p="12px 0" alignItems="center">
			<Typography variant="h2">{discoverTitle}</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', height: '90px' }}>
				{hasSearch && (
					<Box sx={{ width: '400px', margin: '0 0 0 24px' }}>
						<TutorialsSearch
							searchPlaceHolder={searchPlaceHolder}
							handleSearchParamQuery={handleSearchParamQuery}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default DiscoverHeader;
