/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import { Avatar, Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import {
	useUpdateUserAvatarMutation,
	useUpdateUserMutation,
	useCreateConnectionMutation,
	useDeleteConnectionMutation,
} from 'store/apis/apiUser';
import { showNotification } from 'store/storeSlices/sliceNotification';
import { consumerTypes } from 'store/common/keys';

import { ReactComponent as LinkIcon } from 'assets/img/icons/linkDiscord.svg';
import { ReactComponent as UnlinkIcon } from 'assets/img/icons/unlinkDiscord.svg';
import { ReactComponent as UploadIcon } from 'assets/img/icons/upload.svg';
import { isValidEmail } from 'utils/misc';
import { validateImage } from 'utils/imageUtils';
import { emailRegex } from 'constants/regex';
import strings from 'constants/strings';
import { UPLOAD_MAX_SIZE_MB, uploadImageAllowedTypes, uploadImageStatus } from 'constants/default';

import Footer from 'components/Footer/Footer';

import CustomTextField from '../components/CustomTextField';
import CustomTextareaField from '../components/CustomTextareaField';
import NSFWSwitch from '../components/NSFWSwitch';

const { SUCCESS_UPLOAD, ERROR_UPLOAD_FILE_TYPE } = uploadImageStatus;
const { CONSUMER_DISCORD } = consumerTypes;

const styles = {
	mainContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%',
		borderLeft: '1px solid',
		borderColor: 'background.surfaceHigh',
	},
	gridContainer: {
		maxWidth: '570px',
		margin: '40px auto',
	},
	gridItem: {
		marginTop: '75px',
	},
	discordContainer: {
		pb: 2,
		alignItems: 'center',
		marginTop: '16px',
	},
	recommended: {
		// THEME_NEXT
		background:
			'linear-gradient(97deg, #0091BE -30.78%, #de04a4 16.31%, #FF26B5 50.66%, #470073 102.78%)',
		borderRadius: '4px',
		py: '1px',
		px: '5px',
		mx: 2,
		fontSize: '12px',
	},
	displayName: {
		width: '100%',
		fontStyle: 'normal',
		fontWeight: 400,
		fontSize: '18px',
		lineHeight: '24px',
		// THEME_NEXT
		background: 'rgba(159, 162, 171, 0.08)',
		borderRadius: '6px',
		padding: '15px 25px',
		textTransform: 'none',
		transition: 'background 0.3s ease',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		color: 'text.active',
	},
	avatarStyle: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0 auto 16px',
		width: '7.5rem',
		height: '7.5rem',
	},
};

function stringToColor(string: string) {
	let hash = 0;
	let i;
	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}
	let color = '#';
	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}
	return color;
}

function stringAvatar(name: string) {
	return {
		sx: { ...styles.avatarStyle, ...{ background: stringToColor(name) } },
		children: `${name.split(' ')[0][0]}`,
	};
}

const { profilePageTitle, discord } = strings;

const ProfileSettingsPage: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { discordId, discordName, avatar, name, email, description } = useSliceUser();

	const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation();
	const [updateUserAvatar] = useUpdateUserAvatarMutation();
	const [createConnection, { isSuccess: isSuccessCreateConnection, data: createConnectionData }] =
		useCreateConnectionMutation();
	const [deleteConnection] = useDeleteConnectionMutation();

	useEffect(() => {
		setAvatar(avatar);
	}, [avatar]);

	useEffect(() => {
		if (isSuccessCreateConnection && createConnectionData) {
			window.open(createConnectionData, '_parent');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessCreateConnection]);

	const [newAvatar, setAvatar] = useState<any>();
	const inputImage = useRef<any>(null);

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target as HTMLInputElement;
		const { uploadStatus } = validateImage(files, UPLOAD_MAX_SIZE_MB);
		if (files && uploadStatus === SUCCESS_UPLOAD) {
			const file = files[0];
			updateUserAvatar({ file });
		} else {
			dispatch(
				showNotification({
					message:
						uploadStatus === ERROR_UPLOAD_FILE_TYPE
							? strings.uploadImageDifferentTypeAvatar
							: strings.uploadImageFileSizeAvatar,
					severity: 'warning',
				}),
			);
		}
	};

	const handleUploadClick = () => {
		if (inputImage && inputImage.current) {
			inputImage.current.click();
		}
	};

	const handleLinkDiscordClick = () => {
		if (!discordId) {
			createConnection({ type: CONSUMER_DISCORD });
		}
	};

	const handleUnlinkDiscordClick = () => {
		if (discordId) {
			deleteConnection(CONSUMER_DISCORD);
		}
	};

	const onConfirm = (values: any) => {
		const { name, email, description } = values;
		if (isValidEmail(email.trim())) {
			updateUser({
				name: name.trim(),
				email: email.trim(),
				description: description.trim().length > 0 ? description.trim() : null,
			});
		} else {
			dispatch(
				showNotification({
					message: strings.pleaseEnterValidEmail,
					severity: 'warning',
				}),
			);
		}
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.required(strings.nameIsRequired)
			.min(2, strings.theMinLengthName)
			.max(40, strings.theMaxLengthName),
		email: Yup.string()
			.required(strings.pleaseEnterEmail)
			.matches(emailRegex, strings.pleaseEnterValidEmail),
		description: Yup.string().max(250, strings.theMaxLengthDescription),
	});

	const formik = useFormik({
		initialValues: {
			name: name || '',
			email: email || '',
			description: description || '',
		},
		validationSchema,
		onSubmit: onConfirm,
	});

	return (
		<Box sx={styles.mainContainer}>
			<Grid container sx={styles.gridContainer}>
				<Grid item xs={12}>
					<Typography variant="h1">{profilePageTitle}</Typography>
				</Grid>
				<Grid item xs={12} sx={styles.gridItem}>
					<Grid container>
						<Grid item sx={{ width: '180px' }}>
							{newAvatar || avatar ? (
								<Avatar
									alt={name}
									src={avatar || newAvatar}
									sx={styles.avatarStyle}
								/>
							) : (
								<Avatar {...stringAvatar(name)} />
							)}

							<Box>
								<input
									type="file"
									onChange={handleImageChange}
									accept={uploadImageAllowedTypes.join(', ')}
									ref={inputImage}
									style={{
										display: 'none',
									}}
								/>

								<Button variant="basicWithBorder" onClick={handleUploadClick}>
									<UploadIcon />
									<Typography
										sx={{ marginLeft: '15px' }}
										variant="profileButton"
										component="span"
									>
										{strings.uploadImage}
									</Typography>
								</Button>
							</Box>
						</Grid>

						<Grid item xs sx={{ paddingLeft: '45px' }}>
							<Box component="form" onSubmit={formik.handleSubmit}>
								<CustomTextField
									aria-label="Name"
									margin="normal"
									field={formik.getFieldProps('name')}
									form={formik}
									value={formik.values.name}
									onChange={formik.handleChange}
									fullWidth
									id="name"
									label={strings.name}
									name="name"
									autoComplete="Name"
									variant="outlined"
								/>

								<CustomTextField
									aria-label="Email Address"
									margin="normal"
									field={formik.getFieldProps('email')}
									form={formik}
									value={formik.values.email}
									onChange={formik.handleChange}
									fullWidth
									id="email"
									label={strings.emailAddress}
									name="email"
									autoComplete="Email Address"
									variant="outlined"
								/>

								<CustomTextareaField
									aria-label="description"
									margin="normal"
									field={formik.getFieldProps('description')}
									form={formik}
									fullWidth
									id="description"
									label={strings.tellUsAboutYourself}
									name="description"
									variant="outlined"
								/>
								<Button
									variant="primary"
									type="submit"
									disabled={updateUserLoading}
									fullWidth
									sx={{ padding: '15px 25px' }}
								>
									{strings.saveChanges}
								</Button>
							</Box>

							<Grid container sx={styles.discordContainer}>
								<Typography variant="h3">{discord}</Typography>
								{!discordId && (
									<Grid item sx={styles.recommended}>
										{strings.recommended}
									</Grid>
								)}
							</Grid>

							{discordId ? (
								<Grid container sx={{ justifyContent: 'space-between' }}>
									<Grid item xs={7}>
										<Box sx={styles.displayName}>
											<Typography variant="h4" textAlign="left">
												{discordName}
											</Typography>
										</Box>
									</Grid>
									<Grid item xs={4}>
										<Button
											fullWidth
											variant="flat"
											onClick={() => handleUnlinkDiscordClick()}
											startIcon={<UnlinkIcon />}
											sx={{
												color: '#ffffff',
												svg: {
													scale: '0.8',
												},
											}}
										>
											{strings.unlink}
										</Button>
									</Grid>
								</Grid>
							) : (
								<Button
									fullWidth
									variant="flat"
									onClick={() => handleLinkDiscordClick()}
									startIcon={<LinkIcon />}
									sx={{
										padding: '15px 25px',
										svg: {
											scale: '0.8',
										},
									}}
								>
									<Typography variant="h5">{strings.linkDiscord}</Typography>
								</Button>
							)}

							<Divider
								sx={{
									marginTop: '20px',
									marginBottom: '20px',
									color: 'background.surfaceHighest',
								}}
							/>
							<NSFWSwitch />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Footer />
		</Box>
	);
};

export default ProfileSettingsPage;
