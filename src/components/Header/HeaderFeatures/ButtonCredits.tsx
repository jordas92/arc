/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Button, Tooltip, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import { useFetchUserWalletsBalanceQuery } from 'store/apis/apiUserWallets';
import { openModal } from 'store/storeSlices/sliceApp';
import { modalsKeys } from 'store/common/keys';

import { ReactComponent as CoinIcon } from 'assets/img/icons/coin.svg';
import strings from 'constants/strings';

const { credits } = strings;
const { CREDITS } = modalsKeys;

const StyledButton = styled(Button)(({ theme }) => ({
	margin: '0 5px',
	padding: '5px 10px',
	textTransform: 'none',
	borderRadius: '25px',
	color: theme.palette.text.active,
	backgroundColor: theme.palette.background.surfaceLow,

	svg: {
		margin: '0 5px 0 0',
	},

	'&:hover': {
		color: theme.palette.text.hover,
		backgroundColor: theme.palette.background.surfaceHighest,
	},
}));

const { imagesLeftText } = strings;

const ButtonCredits: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { creditsBalance, imagesLeft } = useSliceUser();

	useFetchUserWalletsBalanceQuery();

	const tooltipText = `${imagesLeft.toLocaleString('en-US')} ${imagesLeftText}`;

	const handleOnClick = () => {
		dispatch(openModal({ type: CREDITS }));
	};

	return (
		<Tooltip title={tooltipText} arrow>
			<StyledButton onClick={handleOnClick} disableRipple>
				<CoinIcon />
				<Typography variant="h5" lineHeight={1}>
					{`${creditsBalance.toLocaleString('en-US')} ${credits}`}
				</Typography>
			</StyledButton>
		</Tooltip>
	);
};

export default ButtonCredits;
