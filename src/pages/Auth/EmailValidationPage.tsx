/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';

import { useEmailValidationQuery } from 'store/apis/apiAuthentication';

import VerifyEmail from 'components/Auth/VerifyEmail';

const StyledGrid = styled(Grid)({
	height: '100vh',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
});

const EmailValidationPage: React.FC = () => {
	const { userId, hash } = useParams();
	const { isFetching } = useEmailValidationQuery({
		userId,
		hash,
	});

	if (isFetching) {
		return (
			<StyledGrid container>
				<Grid item alignSelf="center">
					<CircularProgress />
				</Grid>
			</StyledGrid>
		);
	}

	return (
		<StyledGrid container>
			<Grid item alignSelf="center">
				<VerifyEmail />
			</Grid>
		</StyledGrid>
	);
};

export default EmailValidationPage;
