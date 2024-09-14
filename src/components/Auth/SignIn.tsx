/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormHelperText,
	Grid,
	IconButton,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';

import { useSignInMutation, useFetchAuthUserQuery } from 'store/apis/apiAuthentication';
import { useLazyFetchConnectionByTypeQuery } from 'store/apis/apiUser';

import { showNotification } from 'store/storeSlices/sliceNotification';
import { consumerTypes, notificationErrorMessages, notificationSeverity } from 'store/common/keys';

import { ReactComponent as DiscordCustomIcon } from 'assets/img/icons/DiscordLogo.svg';
import { emailRegex, passRegex } from 'constants/regex';
import { MAX_PASS_LENGTH } from 'constants/default';
import strings from 'constants/strings';

import routesPaths from 'routes/paths';

import { isValidEmail } from 'utils/misc';
import { connectUserToDiscordUrl } from 'utils/commonUtils';

const { warning } = notificationSeverity;
const { INVALID_CREDENTIALS } = notificationErrorMessages;
const { SIGNUP, MY_PROJECTS, FORGOT_PASSWORD } = routesPaths;
const { CONSUMER_DISCORD } = consumerTypes;

const styles = {
	rootContainer: {
		textAlign: 'center',
		gridRow: '2',
		margin: '15px',
	},
	formContainer: {
		// THEME_NEXT
		background: '#0E0D0F',
		borderRadius: '16px',
		padding: 4,
		maxWidth: '470px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '0 auto',
		boxShadow: 'none',
	},
	label: {
		fontSize: '20px',
	},
	textField: {
		marginBottom: 0,

		// THEME_NEXT
		'& .MuiInputLabel-root': {
			fontStyle: 'normal',
			fontWeight: 400,
			fontSize: '12px',
			lineHeight: '24px',
			letterSpacing: '0.15px',
			// THEME_NEXT
			color: 'rgba(255, 255, 255, 0.6)',
			height: '56px',

			'&.Mui-focused': {
				// THEME_NEXT
				color: 'rgba(255, 255, 255, 0.6)',
				fontWeight: 400,
				fontSize: '12px',
			},
		},

		'& .MuiOutlinedInput-root': {
			borderRadius: '8px',
			// THEME_NEXT
			background: 'rgba(159, 162, 171, 0.08)',
			border: 'none',
		},

		'& .MuiFilledInput-root': {
			borderRadius: '8px',
			// THEME_NEXT
			background: 'rgba(159, 162, 171, 0.08)',
			border: 'none',
		},

		'& .MuiFilledInput-input': {
			paddingTop: '12px',
			height: '32px',
		},

		'& .MuiFilledInput-root::after': {
			border: 'transparent',
		},

		'& .MuiFilledInput-root::before': {
			border: 'transparent',
		},

		'& .MuiFilledInput-root:hover:not(.Mui-disabled, .Mui-error)::before': {
			border: 'transparent',
		},
	},
	textColor: {
		// THEME_NEXT
		color: 'rgba(255,255,255,0.6)',
	},
	submitButtons: {
		mt: 2.5,
		mb: 3.5,
		height: '56px',
		textTransform: 'none',
		borderRadius: '25px',
		boxShadow: 'none',
		// THEME_NEXT
		color: 'rgba(255, 255, 255, 0.48)',
		fontWeight: 'normal',
		fontSize: '18px',
		// THEME_NEXT
		backgroundColor: 'rgba(159, 162, 171, 0.08)',
		'&:hover': {
			// THEME_NEXT
			backgroundColor: 'rgba(155, 159, 170, 0.12)',
			boxShadow: 'none',
		},
	},
	discordButton: {
		// THEME_NEXT
		background: '#1C1938',
		borderRadius: '25px',
		height: '56px',
		textTransform: 'none',
		boxShadow: 'none',
		// THEME_NEXT
		color: 'rgba(255, 255, 255, 0.48)',
		fontWeight: 'normal',
		fontSize: '18px',
		// THEME_NEXT
		backgroundColor: 'rgba(159, 162, 171, 0.08)',
		'&:hover': {
			// THEME_NEXT
			backgroundColor: 'rgba(155, 159, 170, 0.12)',
			boxShadow: 'none',
		},
	},
	discordIcon: {
		marginRight: '10px',
		borderRadius: '4px',
	},
	logo: {
		width: '100px',
	},
	clickableText: {
		marginLeft: '3px',
		marginTop: '-1px',
	},
	clickableTextSignUp: {
		marginLeft: '3px',
		fontWeight: '600',
	},
	helperTextError: {
		// THEME_NEXT
		color: '#ef5350',
		position: 'absolute',
		marginTop: '-6px',
		marginLeft: '14px',
	},
	helperTextBottomText: {
		fontSize: '16px',
	},
};

const SignIn: React.FC = () => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();

	const [signIn, { isLoading: signInIsLoading, data: signInData, isSuccess: signInIsSuccess }] =
		useSignInMutation();

	// Will trigger fetch only if signIn is successful
	const { isSuccess: isSuccessFetchAuthUser } = useFetchAuthUserQuery(signInData, {
		skip: !signInIsSuccess,
	});
	const [fetchConnectionByType] = useLazyFetchConnectionByTypeQuery();

	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	useEffect(() => {
		if (isSuccessFetchAuthUser) {
			fetchConnectionByType(CONSUMER_DISCORD);
			navigate(MY_PROJECTS);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessFetchAuthUser]);

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required(strings.pleaseEnterEmail)
			.matches(emailRegex, strings.pleaseEnterValidEmail),
		password: Yup.string()
			.required(strings.pleaseEnterPass)
			.matches(passRegex, strings.matchPasswordString)
			.min(MAX_PASS_LENGTH, strings.passMustBeLonger),
	});

	const onConfirm = (values: any) => {
		const { email, password, rememberMe } = values;
		if (isValidEmail(email.trim()) && password.trim().length >= 6) {
			signIn({ email, password, remember: rememberMe });
		} else {
			dispatch(
				showNotification({
					message: INVALID_CREDENTIALS,
					severity: warning,
				}),
			);
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		validationSchema,
		onSubmit: onConfirm,
	});

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.keyCode === 13) {
			e.preventDefault();
			formik
				.submitForm()
				.then((r) => r)
				.catch((e) => console.error(e));
			e.stopPropagation();
		}
	};

	const handleClickShowPassword = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	const handleSignUpLink = (e: React.MouseEvent) => {
		e.preventDefault();
		navigate(SIGNUP);
	};

	const handleForgotPass = (e: React.MouseEvent) => {
		e.preventDefault();
		navigate(FORGOT_PASSWORD);
	};

	const handleMouseDownPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
	};

	const handleDiscord = (e: React.MouseEvent) => {
		e.preventDefault();
		window.open(connectUserToDiscordUrl(), '_parent');
	};

	return (
		<Box sx={styles.rootContainer}>
			<Paper sx={styles.formContainer}>
				<Typography component="h1" mb={0} sx={styles.label}>
					{strings.signInText}
				</Typography>
				<Typography sx={styles.helperTextBottomText} component="h2" variant="caption">
					{strings.orText}
					<Link
						sx={styles.clickableTextSignUp}
						component="button"
						variant="body2"
						fontSize="inherit"
						underline="none"
						onClick={handleSignUpLink}
					>
						{strings.signUpHereText}
					</Link>
				</Typography>

				<Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
					<TextField
						variant="filled"
						aria-label="username"
						margin="normal"
						value={formik.values.email || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						onKeyDown={handleKeyDown}
						fullWidth
						id="email"
						placeholder={strings.emailAddress}
						name="email"
						autoComplete="email"
						InputLabelProps={{ shrink: true }}
						sx={styles.textField}
					/>
					<FormHelperText sx={styles.helperTextError}>
						{formik.touched.email && formik.errors.email}
					</FormHelperText>

					<TextField
						variant="filled"
						aria-label="pass"
						margin="normal"
						value={formik.values.password || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						fullWidth
						name="password"
						placeholder={strings.passwordText}
						onKeyDown={handleKeyDown}
						type={isPasswordVisible ? 'text' : 'password'}
						id="password"
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label="toggle-sing-password-visibility"
									onClick={handleClickShowPassword}
									onMouseDown={(e: any) => handleMouseDownPassword(e)}
									edge="end"
								>
									{isPasswordVisible ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							),
						}}
						InputLabelProps={{ shrink: true }}
						sx={styles.textField}
					/>
					<FormHelperText sx={styles.helperTextError}>
						{formik.touched.password && formik.errors.password}
					</FormHelperText>

					<Grid
						container
						direction="row"
						spacing={2}
						alignItems="center"
						justifyContent="space-between"
						marginTop="5px"
					>
						<Grid item>
							<FormControlLabel
								label={
									<Typography sx={styles.textColor}>
										{strings.rememberMeText}
									</Typography>
								}
								control={
									<Checkbox
										id="rememberMe"
										name="rememberMe"
										value="remember"
										color="primary"
										onChange={formik.handleChange}
									/>
								}
							/>
						</Grid>
						<Grid item>
							<Link
								component="button"
								variant="body2"
								fontSize="inherit"
								underline="none"
								onClick={handleForgotPass}
								sx={styles.textColor}
							>
								{strings.forgotPassQuestionText}
							</Link>
						</Grid>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={styles.submitButtons}
						disabled={signInIsLoading}
					>
						{strings.signInText}
					</Button>

					<Button
						type="button"
						fullWidth
						variant="contained"
						sx={styles.discordButton}
						onClick={handleDiscord}
					>
						<Grid
							container
							direction="row"
							spacing={0}
							alignItems="center"
							justifyContent="center"
						>
							<DiscordCustomIcon style={styles.discordIcon} />{' '}
							{strings.continueWithDiscordText}
						</Grid>
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default SignIn;
