/** Copyright (c) 2023-present Kristiyan Dimitrov */

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Logo from '../../assets/img/icons/logo.svg';
import ForgotPassword from '../../components/Auth/ForgotPassword';

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

function ForgotPasswordPage() {
	return (
		<Grid container sx={styleSchema.mainGrid}>
			<Box sx={styleSchema.logo}>
				<img src={Logo} alt="" />
			</Box>
			<ForgotPassword />
		</Grid>
	);
}

export default ForgotPasswordPage;
