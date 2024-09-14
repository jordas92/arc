/** Copyright (c) 2023-present Kristiyan Dimitrov */

import * as React from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Link, Paper, Typography } from '@mui/material';
import routesPaths from '../../routes/paths';
import strings from '../../constants/strings';

interface Props {
	isSuccess: boolean;
}

const { SIGN_IN } = routesPaths;

const styleSchema = {
	rootContainer: {
		textAlign: 'center',
		marginTop: '15px',
		gridRow: '2',
		margin: '15px',
	},
	formContainer: {
		// THEME_NEXT
		border: '1px solid rgba(155, 159, 170, 0.24)',
		background: '#0E0D0F',
		borderRadius: '16px',
		padding: 4,
		width: '470px',
		maxWidth: '470px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	successIcon: {
		fontSize: '70px',
		color: 'green',
	},
	clickableText: {
		marginLeft: '3px',
		mt: 4,
	},
};

const EmailMessage = memo(({ isSuccess }: Props) => {
	const navigate = useNavigate();

	function handleGoBackButton() {
		navigate(SIGN_IN);
	}

	return (
		<Box sx={styleSchema.rootContainer}>
			<Paper sx={styleSchema.formContainer}>
				{isSuccess ? (
					<CheckCircleOutlineIcon
						fontSize="large"
						sx={{
							fontSize: '70px',
							color: isSuccess ? 'green' : 'red',
						}}
					/>
				) : (
					<HighlightOffIcon
						fontSize="large"
						sx={{
							fontSize: '70px',
							color: isSuccess ? 'green' : 'red',
						}}
					/>
				)}

				<Typography component="h1" variant="h5" mt={3}>
					{isSuccess ? strings.emailSentText : strings.emailNotFoundText}
				</Typography>
				<Typography component="h2" variant="caption" mt={1}>
					{isSuccess
						? 'An email with further instructions was sent to your inbox.'
						: "The email you entered doesn't exist. Please go back and re-enter."}
				</Typography>
				<Link
					sx={styleSchema.clickableText}
					component="button"
					variant="body2"
					fontSize="inherit"
					onClick={handleGoBackButton}
				>
					{strings.goBackText}
				</Link>
			</Paper>
		</Box>
	);
});

export default EmailMessage;
