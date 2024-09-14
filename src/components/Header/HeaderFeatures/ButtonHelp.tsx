/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Button, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import routesPaths from '../../../routes/paths';
import strings from '../../../constants/strings';

const { HELP } = routesPaths;
const { help } = strings;

// THEME_NEXT create button variant
const StyledButton = styled(Button)(({ theme }) => ({
	color: theme.palette.text.active,
	fontSize: '14px',
	fontWeight: 'normal',
	textTransform: 'none',

	svg: {
		width: '16px',
		height: '16px',
		margin: '0 5px 0 0',
		path: {
			fill: theme.palette.text.active,
			transition: '0.3s',
		},
	},

	'&:hover': {
		color: theme.palette.text.hover,
		backgroundColor: 'unset',
		svg: {
			path: {
				fill: theme.palette.text.hover,
			},
		},
	},
}));

const ButtonHelp: React.FC = () => {
	const navigate = useNavigate();

	const handleOnClick = () => {
		navigate(HELP);
	};

	return (
		<StyledButton onClick={handleOnClick} disableRipple>
			<HelpOutlineIcon />
			<Typography variant="headerLink">{help}</Typography>
		</StyledButton>
	);
};

export default ButtonHelp;
