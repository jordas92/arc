/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';

import { ReactComponent as ArcanaLogo } from 'assets/img/icons/logo.svg';
import { ReactComponent as DiscordCustomIcon } from 'assets/img/icons/DiscordLogoWhite.svg';
import { ReactComponent as DeviceIcon } from 'assets/img/icons/device-icon.svg';
import mobileImage from 'assets/img/mobile_image.png';

import strings from 'constants/strings';

const styles = {
	container: {
		position: 'relative',
		height: '100vh',
		padding: '30px 24px 18px',
		overflowY: 'auto',
		'@media (max-width: 768px)': {
			padding: '30px 15px 18px',
		},
	},
	firstPart: {
		width: '100%',
		textAlign: 'center',
	},
	logo: {
		width: '100px',
		height: 'auto',
		marginBottom: '22px',
	},
	imageContainer: {
		height: '348px',
		borderRadius: '12px',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		'@media (max-width: 768px)': {
			backgroundSize: '115%',
		},
	},
	overlayIcon: {
		marginTop: '-26px',
	},
	itemContainer: {
		maxWidth: '380px',
		width: '100%',
		margin: '0 auto',
	},
	title: {
		fontSize: '26px',
		fontWeight: 600,
		margin: '2px auto 24px',
	},
	text: {
		margin: '2px auto 12px',
		color: 'text.secondary',
	},
	discordButton: {
		height: '64px',
		marginBottom: '24px',
	},
	discordIcon: {
		marginRight: '12px',
	},
	webVersionButton: {
		height: '56px',
		color: 'text.primary',
	},
};

const { mobileViewText1, mobileViewText2, continueToDiscord, goToWebVersion } = strings;

const discordChannelURL = process.env.REACT_APP_DISCORD_CHANNEL_URL || '';

const MobileViewScreen = ({ onGoToWebVersion }) => {
	const dispatch = useStoreDispatch();

	useEffect(() => {
		dispatch(closeModal());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleGoToWebVersion = (e: any) => {
		e.preventDefault();
		onGoToWebVersion();
	};

	const handleGoToDiscord = () => {
		if (discordChannelURL) {
			window.location.href = discordChannelURL;
		}
	};

	return (
		<Grid
			container
			sx={styles.container}
			flexDirection="column"
			alignItems="center"
			justifyContent="space-between"
			flexWrap="nowrap"
		>
			<Grid item sx={styles.firstPart}>
				<ArcanaLogo style={styles.logo} />
				<Box
					sx={{
						...styles.imageContainer,
						backgroundImage: `url(${mobileImage})`,
					}}
				/>
				<DeviceIcon style={styles.overlayIcon} />
				<Box sx={styles.itemContainer}>
					<Typography variant="h2" component="h2" sx={styles.title}>
						{mobileViewText1}
					</Typography>
					<Typography variant="h4" component="h4" sx={styles.text}>
						{mobileViewText2}
					</Typography>
					<Button
						type="button"
						fullWidth
						variant="primary"
						sx={styles.discordButton}
						onClick={handleGoToDiscord}
					>
						<Grid
							container
							direction="row"
							spacing={0}
							alignItems="center"
							justifyContent="center"
						>
							<DiscordCustomIcon style={styles.discordIcon} />
							{continueToDiscord}
						</Grid>
					</Button>
				</Box>
			</Grid>
			<Grid item sx={styles.itemContainer}>
				<Button
					type="button"
					fullWidth
					variant="flat"
					onClick={handleGoToWebVersion}
					sx={styles.webVersionButton}
				>
					{goToWebVersion}
				</Button>
			</Grid>
		</Grid>
	);
};

export default MobileViewScreen;
