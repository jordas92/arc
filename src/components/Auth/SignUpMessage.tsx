/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Paper, Typography } from '@mui/material';

import { useSignUpMutation } from 'store/apis/apiAuthentication';
import { cacheKeys } from 'store/apis/common';

import routesPaths from 'routes/paths';
import strings from 'constants/strings';

const { SIGN_IN } = routesPaths;
const { signUpSuccessfulText, signUpMessage } = strings;
const { sharedSignUpMutation } = cacheKeys;

const styleSchema = {
	rootContainer: {
		textAlign: 'center',
		margin: '15px',
		gridRow: '2',
	},
	formContainer: {
		// THEME_NEXT
		border: '1px solid rgba(155, 159, 170, 0.24)',
		background: '#0E0D0F',
		borderRadius: '16px',
		padding: 4,
		maxWidth: '470px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		my: 20,
		mx: 'auto',
	},
	iconStyle: {
		fontSize: '70px',
		color: 'green',
	},
	title: {
		fontSize: '32px',
	},
	description: {
		fontSize: '16px',
	},
};

const SignUpMessage: React.FC = () => {
	const navigate = useNavigate();

	const [, { reset: resetSignUpMutation }] = useSignUpMutation({
		fixedCacheKey: sharedSignUpMutation,
	});

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			resetSignUpMutation();
			navigate(SIGN_IN);
		}, 5000);

		return () => {
			clearTimeout(timeoutId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box sx={styleSchema.rootContainer}>
			<Paper sx={styleSchema.formContainer}>
				<CheckCircleOutlineIcon fontSize="large" sx={styleSchema.iconStyle} />

				<Typography component="h1" sx={styleSchema.title}>
					{signUpSuccessfulText}
				</Typography>

				<Typography component="h2" mt={1} sx={styleSchema.description}>
					{signUpMessage}
				</Typography>
			</Paper>
		</Box>
	);
};

export default SignUpMessage;
