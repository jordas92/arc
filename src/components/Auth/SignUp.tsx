/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Box,
	Button,
	FormHelperText,
	Grid,
	IconButton,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';

import { useSignUpMutation } from 'store/apis/apiAuthentication';
import { showNotification } from 'store/storeSlices/sliceNotification';
import { cacheKeys } from 'store/apis/common';

import { ReactComponent as DiscordCustomIcon } from 'assets/img/icons/DiscordLogo.svg';
import { emailRegex, passRegex } from 'constants/regex';
import { MAX_PASS_LENGTH } from 'constants/default';
import strings from 'constants/strings';

import routesPaths from 'routes/paths';

import { isValidEmail } from 'utils/misc';
import { connectUserToDiscordUrl } from 'utils/commonUtils';

const { SIGN_IN, TERMS_OF_SERVICE, PRIVACY_POLICY } = routesPaths;
const { sharedSignUpMutation } = cacheKeys;

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
		maxWidth: '470px',
		padding: 4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '0 auto',
		boxShadow: 'none',
	},
	label: {
		fontSize: '20px',
	},
	boxForm: {
		mt: 1,
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
	clickableText: {
		marginLeft: '3px',
		fontWeight: '600',
	},
	logo: {
		width: '100px',
	},
	helperTextError: {
		// THEME_NEXT
		color: '#ef5350',
		position: 'absolute',
		marginTop: '-6px',
		marginLeft: '14px',
	},
	helperTextSignUpHere: {
		fontSize: '16px',
	},
	helperTextSign: {
		fontSize: '36px',
	},
	helperTextBottomText: {
		marginTop: '15px',
		fontSize: '16px',
	},
	helperText: {
		fontSize: '16px',
	},
};

const SignUp: React.FC = () => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();

	const [signUp, { isSuccess: signUpIsSuccess }] = useSignUpMutation({
		fixedCacheKey: sharedSignUpMutation,
	});

	const [isPasswordVisible, setIsPasswordVisible] = useState({
		password: false,
		password2: false,
	});

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.required(strings.pleaseEnterEmail)
			.matches(emailRegex, strings.pleaseEnterValidEmail),
		password: Yup.string()
			.required(strings.pleaseEnterPass)
			.matches(passRegex, strings.matchPasswordString)
			.min(MAX_PASS_LENGTH, strings.passMustBeLonger),
		password2: Yup.string()
			.required(strings.pleaseEnterPass)
			.matches(passRegex, strings.matchPasswordString)
			.min(MAX_PASS_LENGTH, strings.passMustBeLonger),
	});

	function handleInputData(state) {
		const { email, password, password2 } = state;
		const body: any = {
			email: email.trim(),
			password: password.trim(),
			password_confirmation: password2.trim(),
		};

		signUp(body);
	}

	function onConfirm(values: any) {
		const { email, password, password2 } = values;
		if (isValidEmail(email) && password.length >= 6 && password === password2) {
			handleInputData(values);
		} else {
			dispatch(
				showNotification({
					message:
						"Oops! It seems like there's a mismatch between the password and confirmation " +
						'password you entered. Please make sure they are identical.',
					severity: 'warning',
				}),
			);
		}
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			password2: '',
		},
		validationSchema,
		onSubmit: onConfirm,
	});

	function handleSignInLink(e: React.MouseEvent) {
		e.preventDefault();
		navigate(SIGN_IN);
	}

	function handleDiscord(e: React.MouseEvent) {
		e.preventDefault();
		window.open(connectUserToDiscordUrl(), '_parent');
	}

	function handleLink(path) {
		if (path === TERMS_OF_SERVICE) {
			window.open('https://www.arcanalabs.ai/terms-of-service', '_blank');
		} else {
			window.open('https://www.arcanalabs.ai/privacy-policy', '_blank');
		}
	}

	const handleShowPassword = (passwordName: string) => {
		setIsPasswordVisible((prevState: any) => ({
			...prevState,
			[passwordName]: !prevState[passwordName],
		}));
	};

	return (
		<Box sx={styles.rootContainer}>
			<Paper component="div" sx={styles.formContainer}>
				<Typography component="h1" mb={0} sx={styles.label}>
					{strings.signUpText}
				</Typography>

				<Typography sx={styles.helperTextSignUpHere} variant="caption">
					{strings.orText}
					<Link
						sx={styles.clickableText}
						component="button"
						variant="body2"
						fontSize="inherit"
						underline="none"
						onClick={handleSignInLink}
					>
						{strings.signInHereText}
					</Link>
				</Typography>

				<Box component="form" onSubmit={formik.handleSubmit} sx={styles.boxForm}>
					<TextField
						variant="filled"
						margin="normal"
						value={formik.values.email || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.email && Boolean(formik.errors.email)}
						fullWidth
						id="email"
						placeholder={strings.enterYourEmailAddressText}
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
						margin="normal"
						value={formik.values.password || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password && Boolean(formik.errors.password)}
						fullWidth
						name="password"
						placeholder={strings.passwordText}
						type={isPasswordVisible.password ? 'text' : 'password'}
						id="password"
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<IconButton
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
						sx={styles.textField}
					/>
					<FormHelperText sx={styles.helperTextError}>
						{formik.touched.password && formik.errors.password}
					</FormHelperText>

					<TextField
						variant="filled"
						margin="normal"
						value={formik.values.password2 || ''}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						error={formik.touched.password2 && Boolean(formik.errors.password2)}
						fullWidth
						name="password2"
						placeholder={strings.repeatPassText}
						type={isPasswordVisible.password2 ? 'text' : 'password'}
						id="password2"
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<IconButton
									onClick={() => handleShowPassword('password2')}
									edge="end"
								>
									{isPasswordVisible.password2 ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							),
						}}
						InputLabelProps={{ shrink: true }}
						sx={styles.textField}
					/>
					<FormHelperText sx={styles.helperTextError}>
						{formik.touched.password2 && formik.errors.password2}
					</FormHelperText>

					<Button type="submit" fullWidth variant="contained" sx={styles.submitButtons}>
						{strings.continueText}
					</Button>
					<Button
						type="button"
						fullWidth
						variant="contained"
						sx={styles.discordButton}
						disabled={signUpIsSuccess}
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

				<Typography sx={styles.helperTextBottomText} component="h2" variant="caption">
					{strings.byClickingContinueYouAgreeText}
				</Typography>

				<Typography sx={styles.helperText} component="h2" variant="caption">
					<Link
						color="text.primary"
						sx={styles.clickableText}
						component="button"
						variant="body2"
						fontSize="inherit"
						underline="none"
						onClick={() => handleLink(TERMS_OF_SERVICE)}
					>
						{strings.termsOfService}
					</Link>
					&nbsp;and&nbsp;
					<Link
						color="text.primary"
						sx={styles.clickableText}
						component="button"
						variant="body2"
						fontSize="inherit"
						underline="none"
						onClick={() => handleLink(PRIVACY_POLICY)}
					>
						{strings.privacyPolicy}
					</Link>
				</Typography>
			</Paper>
		</Box>
	);
};

export default SignUp;
