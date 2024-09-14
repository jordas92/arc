/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SignIn from '../../components/Auth/SignIn';
import bg from '../../assets/img/login.jpeg';
import logo from '../../assets/img/icons/logo.svg';

const styles = {
	box: {
		display: 'flex',
		minHeight: 'calc(100vh + 0px)',
		// THEME_NEXT
		background: 'rgb(14, 13, 15)',
	},
	mainGrid: {
		width: '100%',
		// THEME_NEXT
		backgroundColor: '#0E0D0F',
		backgroundImage: `url(${bg})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'contain',
		backgroundPosition: 'right center',
		alignItems: 'center',
		flexWrap: 'nowrap',
		justifyContent: 'flex-start',
		'@media (max-width: 1200px)': {
			backgroundSize: 'cover',
			backgroundPosition: 'center',
		},
	},
	logo: {
		textAlign: 'center',
	},
};

function SignInPage() {
	return (
		<Box sx={styles.box}>
			<Grid container sx={styles.mainGrid}>
				<Grid item lg={4} xs={12}>
					<Grid item xs>
						<Box sx={styles.logo}>
							<img src={logo} alt="" loading="lazy" />
						</Box>
						<SignIn />
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
}

export default SignInPage;
