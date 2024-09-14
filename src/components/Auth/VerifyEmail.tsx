/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Typography } from '@mui/material';

import useSliceAuthentication from 'store/hooks/useSliceAuthentication';

import routesPaths from 'routes/paths';
import strings from 'constants/strings';

const StyledBox = styled(Box)({
	textAlign: 'center',
	margin: '15px',
	gridRow: '2',
});

const StyledContent = styled(Box)(({ theme }) => ({
	border: '1px solid',
	borderColor: theme.palette.background.surfaceHighest,
	background: '#0E0D0F',
	borderRadius: '16px',
	padding: '40px',
	maxWidth: '470px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}));

const {
	signUpSuccessfulText,
	signUpFailedText,
	emailVerificationSuccessText,
	emailVerificationFailedText,
} = strings;

const VerifyEmail = () => {
	const { isEmailVerified } = useSliceAuthentication();
	const navigate = useNavigate();

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			navigate(routesPaths.SIGN_IN);
		}, 6000);
		return () => {
			clearTimeout(timeoutId);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<StyledBox>
			<StyledContent>
				{isEmailVerified ? (
					<CheckCircleOutlineIcon
						sx={{ fontSize: '70px', marginBottom: '20px', color: 'success.main' }}
					/>
				) : (
					<HighlightOffIcon
						sx={{ fontSize: '70px', marginBottom: '20px', color: 'error.main' }}
					/>
				)}
				<Typography component="h1" variant="h1">
					{isEmailVerified ? signUpSuccessfulText : signUpFailedText}
				</Typography>
				<Typography component="h4" variant="h4" mt={1}>
					{isEmailVerified ? emailVerificationSuccessText : emailVerificationFailedText}
				</Typography>
			</StyledContent>
		</StyledBox>
	);
};

export default VerifyEmail;
