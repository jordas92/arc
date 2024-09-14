/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { FormControlLabel, Typography, Switch } from '@mui/material';

import useSliceUser from 'store/hooks/useSliceUser';

import strings from 'constants/strings';

const StyledSwitch = styled(Switch)({
	'& .MuiSwitch-switchBase': {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	'& .MuiSwitch-switchBase.Mui-checked': {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
});

const { nsfwTutorialsSwitchLabel, enabled, disabled } = strings;

type Props = {
	checked: boolean;
	handleOnChange: Function;
};

const TutorialsNSFWToggle: React.FC<Props> = ({ checked, handleOnChange }) => {
	const { isNsfwEnabled } = useSliceUser();

	const conditionalLabel = () => {
		return (
			<Typography variant="h5" sx={{ lineHeight: 1.5 }}>
				{`${nsfwTutorialsSwitchLabel} `}
				<Typography
					variant="h5"
					component="span"
					sx={{
						color: `${checked ? 'success.main' : 'error.main'}`,
						display: 'inline-block',
						width: '55px',
					}}
				>
					{checked ? enabled : disabled}
				</Typography>
			</Typography>
		);
	};

	const conditionalContent = () => {
		if (!isNsfwEnabled) {
			return (
				<FormControlLabel
					control={
						<StyledSwitch
							checked={checked}
							onChange={(e) => handleOnChange(e)}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
					label={conditionalLabel()}
					labelPlacement="start"
				/>
			);
		}
		return null;
	};

	return <>{conditionalContent()}</>;
};

export default TutorialsNSFWToggle;
