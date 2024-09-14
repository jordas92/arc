/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Typography } from '@mui/material';

import strings from 'constants/strings';
import SubNavigationLibrary from 'components/Navigation/SubNavigationLibrary';

import MyLibrarySearch from './MyLibrarySearch';

type Props = {
	searchPlaceHolder?: string;
	handleSearchParamQuery?: Function;
};

const { myLibrary } = strings;

const MyLibraryHeader: React.FC<Props> = ({ searchPlaceHolder, handleSearchParamQuery }) => {
	// Will display the Search component if 'handleSearchParamQuery' is provided
	const hasSearch = !!handleSearchParamQuery;

	return (
		<Box display="flex" justifyContent="space-between" p="12px 0" alignItems="center">
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant="h2" sx={{ marginRight: '24px' }}>
					{myLibrary}
				</Typography>
				<SubNavigationLibrary />
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', height: '90px' }}>
				{hasSearch && (
					<Box sx={{ width: '400px', margin: '0  0 0 24px' }}>
						<MyLibrarySearch
							searchPlaceHolder={searchPlaceHolder}
							handleSearchParamQuery={handleSearchParamQuery}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default MyLibraryHeader;
