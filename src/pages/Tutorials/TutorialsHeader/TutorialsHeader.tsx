/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Typography } from '@mui/material';

import strings from 'constants/strings';
import TutorialsSearch from './TutorialsSearch';
import TutorialsNSFWToggle from './TutorialsNSFWToggle';

type Props = {
	isNsfw: boolean;
	handleOnChangeNSFWSwitch: Function;
	initialValue?: string;
	searchPlaceHolder?: string;
	handleSearchParamQuery?: Function;
};

const { tutorials } = strings;

const TutorialsHeader: React.FC<Props> = ({
	isNsfw,
	handleOnChangeNSFWSwitch,
	initialValue = '',
	searchPlaceHolder,
	handleSearchParamQuery,
}) => {
	// Will display the Search component if 'handleSearchParamQuery' is provided
	const hasSearch = !!handleSearchParamQuery;

	return (
		<Box display="flex" justifyContent="space-between" p="12px 0" alignItems="center">
			<Typography variant="h2">{tutorials}</Typography>
			<Box sx={{ display: 'flex', alignItems: 'center', height: '90px' }}>
				<TutorialsNSFWToggle checked={isNsfw} handleOnChange={handleOnChangeNSFWSwitch} />
				{hasSearch && (
					<Box sx={{ width: '400px', margin: '0 0 0 24px' }}>
						<TutorialsSearch
							searchPlaceHolder={searchPlaceHolder}
							handleSearchParamQuery={handleSearchParamQuery}
							isNsfw={isNsfw}
							initialValue={initialValue}
						/>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default TutorialsHeader;
