/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Grid } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { showNotification } from 'store/storeSlices/sliceNotification';
import {
	useFetchUserWalletsBalanceByConnectionQuery,
	useRedeemDiscordUserCreditsMutation,
} from 'store/apis/apiUserWallets';
import { consumerTypes } from 'store/common/keys';

import strings from 'constants/strings';
import buyCreditsBg from 'assets/img/buy_credits_bg.png';
import logo from 'assets/img/icons/logo.svg';

import ProductsList from 'components/Common/ProductsList';
import RedeemCreditsBlock from 'components/Common/RedeemCreditsBlock';

const styles = {
	mainGrid: {
		width: '100%',
		height: '100vh',
		flexWrap: 'nowrap',
	},
	logo: {
		gridRow: '1',
		alignSelf: 'center',
		margin: '16px 0 100px',
		'@media (max-width: 768px)': {
			margin: '8px 0 70px',
		},
	},
	leftSide: {
		backgroundImage: '',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	rightSide: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: '24px 16px',
	},
	rightSideBox: {
		maxWidth: '500px',
	},
	formControl: {
		width: '100%',
		padding: '12px',
		// THEME_NEXT
		border: '1px solid #6E2FF3',
		borderRadius: '8px',
	},
};

const {
	creditsPageTitle,
	imagesLeftMessage,
	productsOptions,
	successCreditsRedeem,
	errorCreditsRedeem,
} = strings;
const { CONSUMER_DISCORD } = consumerTypes;

const BuyCreditsPage: React.FC = () => {
	const dispatch = useStoreDispatch();

	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const discordUserId = searchParams.get('uid');

	const [creditsRedeem, setCreditsRedeem] = useState<number>(0);
	const [imagesLeft, setImagesLeft] = useState<number>(0);

	const { isSuccess: isSuccessUserWalletsBalanceByConnection, data: UserWalletsBalanceData } =
		useFetchUserWalletsBalanceByConnectionQuery({
			type: CONSUMER_DISCORD,
			id: discordUserId ?? '',
		});

	const [
		redeemDiscordUserCredits,
		{
			isSuccess: isSuccessRedeemDiscordUserCredits,
			isError: isErrorRedeemDiscordUserCredits,
			data: RedeemDiscordUserCreditsData,
		},
	] = useRedeemDiscordUserCreditsMutation();

	const imagesLeftMessageText = `${imagesLeftMessage.replace(
		':imagesLeft',
		imagesLeft.toString(),
	)} ${productsOptions}`;

	// TODO_NEXT_JULIA remove/update this notification when FE starts to show only API reponse
	const successCreditsRedeemText = successCreditsRedeem.replace(
		':creditsRedeem',
		creditsRedeem.toString(),
	);

	useEffect(() => {
		if (isSuccessUserWalletsBalanceByConnection) {
			setCreditsRedeem(UserWalletsBalanceData.creditsRedeem);
			setImagesLeft(Math.floor(UserWalletsBalanceData.creditsBalance / 10));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessUserWalletsBalanceByConnection]);

	useEffect(() => {
		if (isSuccessRedeemDiscordUserCredits && RedeemDiscordUserCreditsData) {
			setCreditsRedeem(RedeemDiscordUserCreditsData.creditsRedeem);
			setImagesLeft(Math.floor(RedeemDiscordUserCreditsData.creditsBalance / 10));

			// TODO_JULIA remove/update this notification when FE starts to show only API reponse
			dispatch(
				showNotification({
					message: successCreditsRedeemText,
					severity: 'success',
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessRedeemDiscordUserCredits, RedeemDiscordUserCreditsData]);

	// TODO_JULIA remove/update this notification when FE starts to show only API reponse
	useEffect(() => {
		if (isErrorRedeemDiscordUserCredits) {
			dispatch(
				showNotification({
					message: errorCreditsRedeem,
					severity: 'warning',
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isErrorRedeemDiscordUserCredits]);

	const handleUpdateRedeem = () => {
		redeemDiscordUserCredits({ type: 'Discord', id: discordUserId ?? '' });
	};

	const conditionalContent = () => {
		if (isSuccessUserWalletsBalanceByConnection) {
			return (
				<Box sx={styles.rightSideBox}>
					<Typography variant="h2" component="p" sx={{ mb: '24px' }}>
						{creditsPageTitle}
					</Typography>
					<Typography variant="body1" component="p" sx={{ mb: '24px' }}>
						{imagesLeftMessageText}
					</Typography>
					<ProductsList isPublicPage />
					<RedeemCreditsBlock
						creditsRedeem={creditsRedeem}
						userId={discordUserId ?? ''}
						updateRedeem={handleUpdateRedeem}
					/>
				</Box>
			);
		}

		return null;
	};

	return (
		<Grid container sx={styles.mainGrid}>
			<Grid
				item
				sm={12}
				md={7}
				sx={{
					...styles.leftSide,
					backgroundImage: `url(${buyCreditsBg})`,
					display: {
						sm: 'none',
						md: 'block',
					},
				}}
			/>

			<Grid item sm={12} md={5} sx={styles.rightSide}>
				<Box sx={styles.logo}>
					<img src={logo} alt="" loading="lazy" style={{ width: '126px' }} />
				</Box>
				{conditionalContent()}
			</Grid>
		</Grid>
	);
};

export default BuyCreditsPage;
