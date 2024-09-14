/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Box,
	Button,
	FormHelperText,
	IconButton,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { passRegex } from '../../constants/regex';
import useStoreDispatch from '../../store/hooks/useStoreDispatch';
import { showNotification } from '../../store/storeSlices/sliceNotification';
import { useResetPasswordMutation } from '../../store/apis/apiAuthentication';
import { MAX_PASS_LENGTH } from '../../constants/default';
import strings from '../../constants/strings';
import routesPaths from '../../routes/paths';

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

const ResetPassword: React.FC = () => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const [
		resetPassword,
		{
			isLoading: isResetPasswordLoading,
			data: resetPassData,
			isSuccess: isResetPasswordSuccess,
		},
	] = useResetPasswordMutation();

	useEffect(() => {
		if (isResetPasswordSuccess) {
			dispatch(
				showNotification({
					message: resetPassData.message,
					severity: 'success',
				}),
			);
			navigate(routesPaths.SIGN_IN);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isResetPasswordSuccess]);

	const [isPasswordVisible, setIsPasswordVisible] = useState({
		password: false,
		confirmPass: false,
	});

	const validationSchema = Yup.object().shape({
		password: Yup.string()
			.required(strings.pleaseEnterPass)
			.matches(passRegex, strings.matchPasswordString)
			.min(MAX_PASS_LENGTH, strings.passMustBeLonger),
		confirmPass: Yup.string()
			.required(strings.pleaseEnterPass)
			.matches(passRegex, strings.matchPasswordString)
			.min(MAX_PASS_LENGTH, strings.passMustBeLonger),
	});

	function onConfirm(values: any) {
		const { password, confirmPass } = values;
		if (password !== confirmPass) {
			dispatch(
				showNotification({
					message: strings.newPassDontMatch,
					severity: 'warning',
				}),
			);
		} else {
			const getToken = searchParams.get('token');
			const getEmail = searchParams.get('email');
			if (getToken !== null && getEmail !== null) {
				resetPassword({
					token: getToken,
					email: getEmail,
					password,
					password_confirmation: confirmPass,
				});
			}
		}
	}

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPass: '',
		},
		validationSchema,
		onSubmit: onConfirm,
	});

	const handleShowPassword = (passwordName: string) => {
		setIsPasswordVisible((prevState: any) => ({
			...prevState,
			[passwordName]: !prevState[passwordName],
		}));
	};

	return (
		<Box sx={styleSchema.rootContainer}>
			<Paper sx={styleSchema.formContainer}>
				<Typography component="h1" variant="h5">
					Reset password
				</Typography>
				<Typography component="h2" variant="body1">
					Please enter your new password
				</Typography>

				<Box component="form" onSubmit={formik.handleSubmit}>
					<TextField
						margin="normal"
						value={formik.values.password}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						fullWidth
						name="password"
						label="New password"
						type={isPasswordVisible.password ? 'text' : 'password'}
						id="password"
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label="toggle-reset-password-visibility"
									onClick={() => handleShowPassword('password')}
									edge="end"
								>
									{isPasswordVisible.password ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							),
						}}
						InputLabelProps={{ shrink: true }}
					/>
					<FormHelperText sx={styleSchema.helperTextError}>
						{formik.touched.password && formik.errors.password}
					</FormHelperText>
					<TextField
						margin="normal"
						value={formik.values.confirmPass}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.confirmPass && Boolean(formik.errors.confirmPass)}
						fullWidth
						name="confirmPass"
						label="Repeat new password"
						type={isPasswordVisible.confirmPass ? 'text' : 'password'}
						id="confirmPass"
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label="toggle-reset-confirm-password-visibility"
									onClick={() => handleShowPassword('confirmPass')}
									edge="end"
								>
									{isPasswordVisible.confirmPass ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							),
						}}
						InputLabelProps={{ shrink: true }}
					/>
					<FormHelperText sx={styleSchema.helperTextError}>
						{formik.touched.confirmPass && formik.errors.confirmPass}
					</FormHelperText>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={styleSchema.formButtons}
						disabled={isResetPasswordLoading}
					>
						Continue
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default ResetPassword;
