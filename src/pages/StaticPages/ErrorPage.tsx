/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import routesPaths from '../../routes/paths';

const { SIGN_IN } = routesPaths;

const styleSchema = {
	mainGrid: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		flexDirection: 'column',
		position: 'relative',
	},
	rootContainer: {
		textAlign: 'center',
		padding: '52px',
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

function ErrorPage() {
	function onClick() {
		location.href = SIGN_IN;
	}

	return (
		<Grid container component="main" sx={styleSchema.mainGrid}>
			<Paper elevation={0} sx={styleSchema.rootContainer}>
				<Box sx={styleSchema.formContainer}>
					<Typography variant="h4" component="h4">
						Something went wrong. Try clicking the refresh page button to reload the
						application.
					</Typography>
					<Typography component="p">
						<Button
							id="goToHomePage"
							variant="outlined"
							color="primary"
							sx={{ marginTop: 10 }}
							onClick={onClick}
						>
							Go To Homepage
						</Button>
					</Typography>
				</Box>
			</Paper>
		</Grid>
	);
}

export default ErrorPage;
