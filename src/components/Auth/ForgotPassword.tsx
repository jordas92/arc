/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, Link, Paper, TextField, Typography } from '@mui/material';
import EmailMessage from './EmailMessage';
import routesPaths from '../../routes/paths';
import { emailRegex } from '../../constants/regex';
import { isValidEmail } from '../../utils/misc';
import useStoreDispatch from '../../store/hooks/useStoreDispatch';
import { showNotification } from '../../store/storeSlices/sliceNotification';
import { useForgottenPasswordMutation } from '../../store/apis/apiAuthentication';
import strings from '../../constants/strings';

const { SIGN_IN } = routesPaths;

const styleSchema = {
	rootContainer: {
		textAlign: 'center',
		gridRow: '2',
		margin: '15px',
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
	},
	formButtons: {
		mt: 2,
		// mb: 2,
		height: '55px',
		textTransform: 'none',
	},
	clickableText: {
		marginLeft: '3px',
	},
	helperTextError: {
		color: '#ef5350',
		position: 'absolute',
		marginTop: '-6px',
		marginLeft: '14px',
	},
};

const ForgotPassword: React.FC = () => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();

	const [
		forgottenPassword,
		{
			isLoading: isForgottenPassLoading,
			data: forgottenPassData,
			isSuccess: isForgottenPasswordSuccess,
		},
	] = useForgottenPasswordMutation();

	useEffect(() => {
		if (isForgottenPasswordSuccess) {
			navigate(routesPaths.SIGN_IN);
			dispatch(
				showNotification({
					message: forgottenPassData.message,
					severity: 'success',
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isForgottenPasswordSuccess]);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required(strings.pleaseEnterEmail)
			.matches(emailRegex, strings.pleaseEnterValidEmail),
	});

	function onConfirm(values: any) {
		const { email } = values;
		if (isValidEmail(email.trim())) {
			forgottenPassword({ email: values.email });
		} else {
			dispatch(
				showNotification({
					message: strings.pleaseEnterValidEmail,
					severity: 'warning',
				}),
			);
		}
	}

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema,
		onSubmit: onConfirm,
	});

	function handleLoginLink(e: any) {
		e.preventDefault();
		navigate(SIGN_IN);
	}

	if (isForgottenPasswordSuccess) {
		return <EmailMessage isSuccess={isForgottenPasswordSuccess} />;
	}

	return (
		<Box sx={styleSchema.rootContainer}>
			<Paper sx={styleSchema.formContainer}>
				<Typography component="h1" variant="h5">
					{strings.resetPassText}
				</Typography>
				<Typography component="h2" variant="body1">
					{strings.orReturnToText}
					<Link
						sx={styleSchema.clickableText}
						component="button"
						variant="body2"
						fontSize="inherit"
						underline="none"
						onClick={handleLoginLink}
					>
						{strings.loginLowerCaseText}
					</Link>
				</Typography>

				<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						fullWidth
						id="email"
						label={strings.emailAddress}
						name="email"
						autoComplete="email"
						InputLabelProps={{ shrink: true }}
					/>
					<FormHelperText sx={styleSchema.helperTextError}>
						{formik.touched.email && formik.errors.email}
					</FormHelperText>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={styleSchema.formButtons}
						disabled={isForgottenPassLoading}
					>
						{strings.sendPassResetLinkText}
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default ForgotPassword;
