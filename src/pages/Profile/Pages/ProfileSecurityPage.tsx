/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, Typography } from '@mui/material';

import useSliceAuthentication from 'store/hooks/useSliceAuthentication';
import { showNotification } from 'store/storeSlices/sliceNotification';
import { useDeleteUserMutation, useChangeUserPasswordMutation } from 'store/apis/apiUser';
import { useLogoutMutation } from 'store/apis/apiAuthentication';

import { passRegex } from 'constants/regex';
import { MAX_PASS_LENGTH } from 'constants/default';
import strings from 'constants/strings';

import { ReactComponent as Check } from 'assets/img/icons/check.svg';
import Footer from 'components/Footer/Footer';
import ConfirmDialog from 'components/Dialogs/ConfirmDialog';
import CustomTextField from '../components/CustomTextField';

const styles = {
	mainContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%',
		borderLeft: '1px solid rgba(255, 255, 255, 0.16)',
	},
	gridContainer: {
		maxWidth: '420px',
		margin: '40px auto 0',
		position: 'relative',
	},
	iconContainer: {
		width: '80px',
		height: '80px',
		borderRadius: '50%',
		border: '1px solid',
		borderColor: 'background.surfaceLowest',
		bgcolor: 'background.surfaceSolid',
	},
	icon: {
		position: 'relative' as 'relative',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
};

const ProfileSecurityPage: React.FC = () => {
	const dispatch = useDispatch<any>();
	const { jwt } = useSliceAuthentication();
	const [logout] = useLogoutMutation();

	const [changeUserPassword, { isLoading: updateUserLoading }] = useChangeUserPasswordMutation();
	const [deleteUser, { isLoading: deleteUserLoading, isSuccess: isSuccessRemoveUser }] =
		useDeleteUserMutation();

	const [isPasswordVisible, setIsPasswordVisible] = useState({
		currentPassword: false,
		password: false,
		password2: false,
	});

	const [isModalButtonLoading, setIsModalButtonLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (isSuccessRemoveUser) {
			setIsOpen(false);
			dispatch(
				showNotification({
					message: strings.removedArcanaAccount,
					severity: 'success',
				}),
			);
			logout(jwt);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessRemoveUser]);

	const handleOpen = () => {
		setIsOpen(true);
		setIsModalButtonLoading(false);
	};

	const handleClose = () => {
		setIsOpen(false);
		setIsModalButtonLoading(false);
	};

	const handleConfirmation = () => {
		setIsModalButtonLoading(true);
		deleteUser();
	};

	const validationSchema = yup.object().shape({
		currentPassword: yup
			.string()
			.required(strings.pleaseEnterPass)
			.matches(passRegex, strings.matchPasswordString)
			.min(MAX_PASS_LENGTH, strings.passMustBeLonger),
		password: yup
			.string()
			.required(strings.pleaseEnterPass)
			.matches(passRegex, strings.matchPasswordString)
			.min(MAX_PASS_LENGTH, strings.passMustBeLonger),
		password2: yup
			.string()
			.required(strings.pleaseEnterPass)
			.oneOf([yup.ref('password')], strings.passMustMatch)
			.matches(passRegex, strings.matchPasswordString)
			.min(MAX_PASS_LENGTH, strings.passMustBeLonger),
	});

	const onConfirm = (values: any) => {
		const { password, password2, currentPassword } = values;
		if (password !== password2) {
			dispatch(
				showNotification({
					message: strings.newPassDontMatch,
					severity: 'warning',
				}),
			);
		} else if (currentPassword === password || currentPassword === password2) {
			dispatch(
				showNotification({
					message: strings.currentPassCannotBeSame,
					severity: 'warning',
				}),
			);
		} else {
			changeUserPassword({
				password: currentPassword.trim(),
				new_password: password.trim(),
				new_password_confirmation: password2.trim(),
			});
		}
	};

	const formik = useFormik({
		initialValues: {
			currentPassword: '',
			password: '',
			password2: '',
		},
		validationSchema,
		onSubmit: onConfirm,
	});

	const handleClickShowPassword = (passwordName: string) => {
		setIsPasswordVisible((prevState: any) => ({
			...prevState,
			[passwordName]: !prevState[passwordName],
		}));
	};

	return (
		<Box sx={styles.mainContainer}>
			<Box sx={styles.gridContainer}>
				<Grid container sx={{ marginBottom: '40px' }} alignItems="center">
					<Grid>
						<Box sx={styles.iconContainer}>
							<Check style={styles.icon} />
						</Box>
					</Grid>
					<Grid sx={{ paddingLeft: '24px' }}>
						<Typography variant="h1">{strings.changePassText}</Typography>
					</Grid>
				</Grid>
				<Grid container>
					<Box component="form" onSubmit={formik.handleSubmit}>
						<CustomTextField
							margin="normal"
							field={formik.getFieldProps('currentPassword')}
							form={formik}
							fullWidth
							id="currentPassword"
							label={strings.currentPassword}
							name="currentPassword"
							type={isPasswordVisible.currentPassword ? 'text' : 'password'}
							autoComplete="Current password"
							variant="outlined"
							InputProps={{
								endAdornment: (
									<IconButton
										onClick={() => handleClickShowPassword('currentPassword')}
										edge="end"
									>
										{isPasswordVisible.currentPassword ? (
											<Visibility />
										) : (
											<VisibilityOff />
										)}
									</IconButton>
								),
							}}
						/>

						<CustomTextField
							margin="normal"
							field={formik.getFieldProps('password')}
							form={formik}
							fullWidth
							id="password"
							label={strings.newPassword}
							name="password"
							type={isPasswordVisible.password ? 'text' : 'password'}
							autoComplete="current-password"
							variant="outlined"
							InputProps={{
								endAdornment: (
									<IconButton
										onClick={() => handleClickShowPassword('password')}
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
						/>

						<CustomTextField
							margin="normal"
							field={formik.getFieldProps('password2')}
							form={formik}
							fullWidth
							id="password2"
							label={strings.repeatPassword}
							name="password2"
							type={isPasswordVisible.password2 ? 'text' : 'password'}
							autoComplete="current-password"
							variant="outlined"
							InputProps={{
								endAdornment: (
									<IconButton
										onClick={() => handleClickShowPassword('password2')}
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
						/>

						<Button
							variant="primary"
							type="submit"
							disabled={updateUserLoading}
							fullWidth
							sx={{ padding: '15px 25px' }}
						>
							{strings.updatePassword}
						</Button>
					</Box>
				</Grid>

				<Divider
					variant="middle"
					sx={{
						mt: 8,
						mb: 4,
						color: 'background.surfaceHighest',
					}}
				/>
				<Grid container spacing={0} alignItems="center" justifyContent="flex-end">
					<Grid item xs={4}>
						<Button
							variant="basic"
							fullWidth
							sx={{
								textTransform: 'capitalize',
								color: 'error.main',
								fontSize: '14px',
								fontWeight: 'bold',
							}}
							onClick={handleOpen}
							disabled={deleteUserLoading}
						>
							{strings.deleteProfile}
						</Button>
					</Grid>
				</Grid>

				{isOpen && (
					<ConfirmDialog
						open={isOpen}
						contentAlign="center"
						contentFontSize="16px"
						onClose={handleClose}
						onCloseIcon={handleClose}
						confirmCallback={handleConfirmation}
						isYesButtonLoading={isModalButtonLoading}
						title={strings.confirmDeleteProfileTitle}
						content={strings.confirmDeleteProfileContent}
						yesButtonText={strings.confirmDeleteProfileYesBtn}
						noButtonText={strings.confirmDeleteProfileNoBtn}
						isDestructive
					/>
				)}
			</Box>
			<Footer />
		</Box>
	);
};

export default ProfileSecurityPage;
