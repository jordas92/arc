/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ResetPassword from 'components/Auth/ResetPassword';
import Logo from '../../assets/img/icons/logo.svg';

const styleSchema = {
	mainGrid: {
		width: '100%',
		height: '100vh',
		display: 'grid',
		girdTemplateRows: '20% 1fr',
		justifyItems: 'center',
		position: 'relative',
		// THEME_NEXT
		background: '#0E0D0F',
	},
	logo: {
		gridRow: '1',
		alignSelf: 'center',
	},
};

function ResetPasswordPage() {
	return (
		<Grid container sx={styleSchema.mainGrid}>
			<Box sx={styleSchema.logo}>
				<img src={Logo} alt="" />
			</Box>
			<ResetPassword />
		</Grid>
	);
}

export default ResetPasswordPage;
