/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Button, Grid, Link, Paper, Typography } from '@mui/material';

import { ReactComponent as DiscordCustomIcon } from 'assets/img/icons/discord_white.svg';
import routesPaths from 'routes/paths';
import strings from 'constants/strings';

import { connectUserToDiscordUrl } from 'utils/commonUtils';

const { TERMS_OF_SERVICE, PRIVACY_POLICY } = routesPaths;

const styleSchema = {
	rootContainer: {
		textAlign: 'center',
		gridRow: '2',
		margin: '15px',
		'@media (width > 600px)': {
			marginTop: '-40%',
		},
	},
	formContainer: {
		// THEME_NEXT
		background: '#0E0D0F',
		boxShadow: 'none',
		borderRadius: '16px',
		maxWidth: '470px',
		padding: 4,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	discordButton: {
		// THEME_NEXT
		background: 'rgba(91, 109, 255, 0.16)',
		borderRadius: '4px',
		height: '55px',
		textTransform: 'none',
	},
	discordIcon: {
		marginRight: '10px',
		borderRadius: '4px',
	},
	clickableText: {
		marginLeft: '3px',
	},
	logo: {
		width: '100px',
	},
	helperTextBottomText: {
		marginTop: '15px',
		fontSize: '16px',
	},
	helperText: {
		fontSize: '16px',
	},
};

const Discord: React.FC = () => {
	const handleDiscord = (e: React.MouseEvent) => {
		e.preventDefault();
		window.open(connectUserToDiscordUrl(), '_parent');
	};

	const handleLink = (path: keyof typeof routesPaths) => {
		if (path === (TERMS_OF_SERVICE as keyof typeof routesPaths)) {
			window.open('https://www.arcanalabs.ai/terms-of-service', '_blank');
		} else {
			window.open('https://www.arcanalabs.ai/privacy-policy', '_blank');
		}
	};

	return (
		<Box sx={styleSchema.rootContainer}>
			<Paper component="div" sx={styleSchema.formContainer}>
				<Button
					type="button"
					fullWidth
					variant="contained"
					sx={styleSchema.discordButton}
					onClick={handleDiscord}
				>
					<Grid
						container
						direction="row"
						spacing={0}
						alignItems="center"
						justifyContent="center"
					>
						<DiscordCustomIcon style={styleSchema.discordIcon} />{' '}
						{strings.continueWithDiscordText}
					</Grid>
				</Button>

				<Typography sx={styleSchema.helperTextBottomText} component="h2" variant="caption">
					{strings.byClickingContinueYouAgreeText}
				</Typography>

				<Typography sx={styleSchema.helperText} component="h2" variant="caption">
					<Link
						color="primary"
						sx={styleSchema.clickableText}
						component="button"
						variant="body2"
						fontSize="inherit"
						underline="none"
						onClick={() => handleLink(TERMS_OF_SERVICE as keyof typeof routesPaths)}
					>
						{strings.termsOfService}
					</Link>
					&nbsp;and&nbsp;
					<Link
						color="primary"
						sx={styleSchema.clickableText}
						component="button"
						variant="body2"
						fontSize="inherit"
						underline="none"
						onClick={() => handleLink(PRIVACY_POLICY as keyof typeof routesPaths)}
					>
						{strings.privacyPolicy}
					</Link>
				</Typography>
			</Paper>
		</Box>
	);
};

export default Discord;
