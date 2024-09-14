/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';

import strings from 'constants/strings';

import { ReactComponent as CloseIcon } from 'assets/img/icons/closeIcon.svg';

const StyledBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	bottom: '-35px',
	right: '0',
}));

const StyledButton = styled(Button)(({ theme }) => ({
	padding: '0',
	margin: '0 4px',

	svg: {
		path: {
			stroke: theme.palette.text.active,
			transition: '0.3s',
		},
	},

	'&:hover': {
		svg: {
			path: {
				stroke: theme.palette.text.hover,
			},
		},
	},
}));

const { doNotShow } = strings;

type Props = {
	handleOnClick: Function;
	disabled: boolean;
};

const BtnHideDialog: React.FC<Props> = ({ handleOnClick, disabled }) => {
	return (
		<StyledBox>
			<StyledButton
				variant="basic"
				disabled={disabled}
				onClick={() => handleOnClick()}
				disableRipple
			>
				<CloseIcon />
				<Typography
					variant="body3"
					component="span"
					sx={{ lineHeight: 1, marginLeft: '6px' }}
				>
					{doNotShow}
				</Typography>
			</StyledButton>
		</StyledBox>
	);
};

export default BtnHideDialog;
