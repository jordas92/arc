/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useFetchUserQuery, useFetchConnectionByTypeQuery } from 'store/apis/apiUser';
import { consumerTypes } from 'store/common/keys';

import ProfileSidebar from './components/ProfileSidebar';

const { CONSUMER_DISCORD } = consumerTypes;

const ProfilePage: React.FC = () => {
	const { isLoading: isLoadingFetchUser } = useFetchUserQuery();
	const { isLoading: isLoadingFetchConnectionByType } =
		useFetchConnectionByTypeQuery(CONSUMER_DISCORD);

	const conditionalContent = () => {
		if (!isLoadingFetchUser && !isLoadingFetchConnectionByType) {
			return <Outlet />;
		}

		return null;
	};

	return (
		<Grid container>
			<Grid item>
				<ProfileSidebar />
			</Grid>

			<Grid item xs>
				{conditionalContent()}
			</Grid>
		</Grid>
	);
};

export default ProfilePage;
