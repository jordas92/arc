/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';

import routesPaths from '../../../routes/paths';
import logo from '../../../assets/img/icons/logo.svg';

const { MY_PROJECTS } = routesPaths;

const ButtonLogo: React.FC = () => {
	const navigate = useNavigate();

	const handleOnClick = () => {
		navigate(MY_PROJECTS);
	};

	return (
		<IconButton onClick={handleOnClick} aria-label="Arcana logo" disableRipple>
			<img src={logo} alt="logo" height="30" />
		</IconButton>
	);
};

export default ButtonLogo;
