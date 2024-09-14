/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';

import { useValidateDiscordQuery, useFetchAuthUserQuery } from 'store/apis/apiAuthentication';
import { useLazyFetchConnectionByTypeQuery } from 'store/apis/apiUser';
import { consumerTypes } from 'store/common/keys';

import routesPaths from 'routes/paths';

const { MY_PROJECTS } = routesPaths;
const { CONSUMER_DISCORD } = consumerTypes;

const styleSchema = {
	mainGrid: {
		height: '100vh',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
};

const ValidateDiscordPage: React.FC = () => {
	const navigate = useNavigate();
	const { discordRefreshToken, discordToken } = useParams();

	const {
		isLoading,
		isSuccess: isSuccessValidateDiscord,
		data: validateDiscordData,
	} = useValidateDiscordQuery({
		discordRefreshToken,
		discordToken,
	});

	// Will trigger fetch only if signIn is successful
	const { isSuccess: isSuccessFetchAuthUser } = useFetchAuthUserQuery(validateDiscordData, {
		skip: !isSuccessValidateDiscord,
	});

	const [fetchConnectionByType] = useLazyFetchConnectionByTypeQuery();

	useEffect(() => {
		if (isSuccessFetchAuthUser) {
			fetchConnectionByType(CONSUMER_DISCORD);
			navigate(MY_PROJECTS);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessFetchAuthUser]);

	return (
		<Grid container sx={styleSchema.mainGrid}>
			<Grid item alignSelf="center">
				{isLoading && <CircularProgress />}
			</Grid>
		</Grid>
	);
};

export default ValidateDiscordPage;
