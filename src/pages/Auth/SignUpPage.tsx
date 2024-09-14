/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useSignUpMutation } from 'store/apis/apiAuthentication';
import { cacheKeys } from 'store/apis/common';

import SignUp from 'components/Auth/SignUp';
import bg from 'assets/img/login.jpeg';
import logo from 'assets/img/icons/logo.svg';
import SignUpMessage from 'components/Auth/SignUpMessage';

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

const { sharedSignUpMutation } = cacheKeys;

const SignUpPage: React.FC = () => {
	const [, { isSuccess: signUpIsSuccess }] = useSignUpMutation({
		fixedCacheKey: sharedSignUpMutation,
	});

	const conditionaContent = () => {
		if (signUpIsSuccess) {
			return <SignUpMessage />;
		}

		return <SignUp />;
	};

	return (
		<Box sx={styles.box}>
			<Grid container sx={styles.mainGrid}>
				<Grid item lg={4} xs={12}>
					<Grid item xs>
						<Box sx={styles.logo}>
							<img src={logo} alt="" loading="lazy" />
						</Box>
						{conditionaContent()}
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default SignUpPage;
