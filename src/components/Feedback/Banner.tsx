/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Box, Link, Typography, Divider } from '@mui/material';

import useSliceUser from 'store/hooks/useSliceUser';
import { useCreateConnectionMutation } from 'store/apis/apiUser';
import { consumerTypes } from 'store/common/keys';

import strings from 'constants/strings';

// THEME_NEXT
const styleSchema = {
	rootContainer: {
		marginTop: '25px',
		// THEME_NEXT
		background:
			'linear-gradient(141deg, rgba(255, 139, 224, 0.16) 4.78%, rgba(255, 139, 224, 0.32) 96.75%)',
		height: '40px',
		padding: '10px 23px 10px 23px',
		borderRadius: '32px',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	linkContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	clickableText: {
		textDecoration: 'underline',
	},
	dividerStyle: {
		backgroundColor: 'white',
		height: '13px',
		width: '1px',
		margin: '5px',
	},
};

const { bannerContent, linkAccount, joinServer } = strings;
const { CONSUMER_DISCORD } = consumerTypes;

const Banner: React.FC = () => {
	const { discordId } = useSliceUser();

	const [createConnection, { isSuccess: isSuccessCreateConnection, data: createConnectionData }] =
		useCreateConnectionMutation();

	useEffect(() => {
		if (isSuccessCreateConnection && createConnectionData) {
			window.open(createConnectionData, '_parent');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessCreateConnection]);

	const handleLinkDiscordClick = () => {
		if (!discordId) {
			createConnection({ type: CONSUMER_DISCORD });
		}
	};

	function handleJoinToServerLink(e: React.MouseEvent) {
		e.preventDefault();
		window.open('https://discord.gg/4AzgVFk2Qj', '_parent');
	}

	return (
		<Box sx={styleSchema.rootContainer}>
			<Typography variant="h5">{bannerContent}</Typography>

			<Box sx={styleSchema.linkContainer}>
				{!discordId && (
					<>
						<Link
							color="inherit"
							sx={styleSchema.clickableText}
							component="button"
							variant="body2"
							fontSize="inherit"
							underline="always"
							onClick={handleLinkDiscordClick}
						>
							{linkAccount}
						</Link>

						<Divider
							orientation="vertical"
							variant="middle"
							sx={styleSchema.dividerStyle}
						/>
					</>
				)}

				<Link
					color="inherit"
					sx={styleSchema.clickableText}
					component="button"
					variant="body2"
					fontSize="inherit"
					underline="always"
					onClick={handleJoinToServerLink}
				>
					{joinServer}
				</Link>
			</Box>
		</Box>
	);
};

export default Banner;
