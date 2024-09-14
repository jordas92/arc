/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Button, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setEnhanceSettingsToDefault } from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';

const { restoreDefaults } = strings;

const BtnRestoreDefaults: React.FC = () => {
	const dispatch = useStoreDispatch();

	const handleOnClick = () => {
		dispatch(setEnhanceSettingsToDefault());
	};

	return (
		<Button
			variant="basic"
			onClick={handleOnClick}
			disableRipple
			sx={{ padding: '0', margin: '0 4px' }}
		>
			<Typography variant="h6">{restoreDefaults}</Typography>
		</Button>
	);
};

export default BtnRestoreDefaults;
