/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';

import { useCreateConnectionMutation } from 'store/apis/apiUser';
import { consumerTypes } from 'store/common/keys';

import { ReactComponent as LinkIcon } from 'assets/img/icons/linkDiscord.svg';
import discordUnlinkedLogo from 'assets/discord-unlinked.svg';
import strings from 'constants/strings';

const {
	discordNotConnected,
	discordPleaseJoinPart1,
	discordPleaseJoinPart2,
	discordJoinServer,
	linkDiscord,
} = strings;
const { CONSUMER_DISCORD } = consumerTypes;

const DiscordLinkage: React.FC = () => {
	const [createConnection, { isSuccess: isSuccessCreateConnection, data: createConnectionData }] =
		useCreateConnectionMutation();

	useEffect(() => {
		if (isSuccessCreateConnection && createConnectionData) {
			window.open(createConnectionData, '_parent');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessCreateConnection]);

	const handleOnClick = () => {
		createConnection({ type: CONSUMER_DISCORD });
	};

	const handleJoinDiscordServerLink = () => {
		window.open('https://discord.gg/4AzgVFk2Qj', '_blank');
	};

	const discordContent = () => {
		return (
			<Typography
				variant="h3"
				component="h3"
				sx={{ textAlign: 'center', margin: '12px 0 24px' }}
			>
				{discordPleaseJoinPart1}

				<Button variant="btnLink" onClick={handleJoinDiscordServerLink}>
					{discordJoinServer}
				</Button>

				{discordPleaseJoinPart2}
			</Typography>
		);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				margin: '50px 0 0',
				padding: '10px',
			}}
		>
			<Avatar alt="Discord Logo" src={discordUnlinkedLogo} sx={{ width: 120, height: 120 }} />

			<Typography variant="h3" sx={{ textAlign: 'center', marginTop: '24px' }}>
				{discordNotConnected}
			</Typography>
			{discordContent()}

			{/* TODO_NEXT Create reusable Link/Unlink Discord Component. Check teh "Profile" page */}
			{/* THEME_NEXT */}
			<Button
				variant="contained"
				onClick={handleOnClick}
				startIcon={<LinkIcon />}
				sx={{
					svg: {
						scale: '0.8',
					},
				}}
			>
				{linkDiscord}
			</Button>
		</Box>
	);
};

export default DiscordLinkage;
