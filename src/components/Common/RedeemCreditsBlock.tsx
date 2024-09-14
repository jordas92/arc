/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

import strings from 'constants/strings';
import { ReactComponent as RedeemIcon } from '../../assets/img/icons/redeem.svg';

const styles = {
	container: {
		borderRadius: '6px',
		padding: '8px 12px',
		marginTop: '24px',
		// THEME
		backgroundColor: 'rgba(159, 162, 171, 0.08)',
		alignItems: 'center',
	},
	iconContainer: {
		display: 'flex',
		alignItems: 'center',
		marginRight: '6px',
	},
};

const StyledSpan = styled('span')({
	fontWeight: 'bold',
});

const { freeCredits, alreadyRedeemed, redeemCredits, creditsCount, forFree } = strings;

type RedeemCreditsBlockType = {
	creditsRedeem: number;
	userId: number | string;
	updateRedeem: Function;
};

const RedeemCreditsBlock: React.FC<RedeemCreditsBlockType> = ({
	creditsRedeem,
	userId,
	updateRedeem,
}) => {
	const [isRedeemButtonDisabled, setIsRedeemButtonDisabled] = useState(true);

	useEffect(() => {
		if (userId) {
			setIsRedeemButtonDisabled(!creditsRedeem);
		} else {
			setIsRedeemButtonDisabled(true);
		}
	}, [userId, creditsRedeem]);

	const handleRedeem = () => {
		updateRedeem();
	};

	const conditionalContent = () => {
		if (creditsRedeem > 0) {
			return (
				<>
					{redeemCredits}{' '}
					<StyledSpan>
						{creditsRedeem} {creditsCount}
					</StyledSpan>{' '}
					{forFree}
				</>
			);
		}

		return (
			<>
				<StyledSpan>{freeCredits}</StyledSpan> {alreadyRedeemed}
			</>
		);
	};

	return (
		<Grid container sx={styles.container}>
			<Grid item sx={styles.iconContainer}>
				<RedeemIcon />
			</Grid>
			<Grid item xs>
				<Typography variant="redeemText">{conditionalContent()}</Typography>
			</Grid>
			<Grid item>
				<Button variant="primary" onClick={handleRedeem} disabled={isRedeemButtonDisabled}>
					{redeemCredits}
				</Button>
			</Grid>
		</Grid>
	);
};

export default RedeemCreditsBlock;
