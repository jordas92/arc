/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import routesPaths from '../../routes/paths';
import Logo from '../../assets/img/icons/logo.svg';

const { SIGN_IN } = routesPaths;

const styleSchema = {
	mainGrid: {
		height: '100vh',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'column',
		position: 'relative',
		// THEME_NEXT
		background: '#0E0D0F',
	},
	rootContainer: {
		textAlign: 'center',
		// THEME_NEXT
		background: '#1f1f22',
		border: '1px solid #2e2e32',
		borderRadius: '16px',
	},
	formContainer: {
		my: 4,
		mx: 4,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '8px',
	},
};

function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<Grid container component="main" sx={styleSchema.mainGrid}>
			<Box>
				<img src={Logo} alt="" loading="lazy" />
			</Box>

			<Paper elevation={0} sx={styleSchema.rootContainer}>
				<Box sx={styleSchema.formContainer}>
					<Typography variant="h1" component="h1">
						404
					</Typography>
					<Typography variant="h4" component="h4">
						Oops! This Page Could Not Be Found.
					</Typography>
					<Typography component="p">
						<Button
							id="goToHomePage"
							variant="outlined"
							color="primary"
							sx={{ marginTop: 10 }}
							onClick={() => navigate(SIGN_IN)}
						>
							Go To Homepage
						</Button>
					</Typography>
				</Box>
			</Paper>
		</Grid>
	);
}

export default NotFoundPage;
