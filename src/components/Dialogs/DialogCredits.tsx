/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import { DialogContent, Typography, Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import { closeModal } from 'store/storeSlices/sliceApp';
import { showNotification } from 'store/storeSlices/sliceNotification';
import { useRedeemUserCreditsMutation } from 'store/apis/apiUserWallets';
import { apiUserWallets } from 'store';

import strings from 'constants/strings';

import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import StyledDialogHorizontalCard from 'components/StyledWrappers/StyledDialogHorizontalCard';
import ProductsList from 'components/Common/ProductsList';
import RedeemCreditsBlock from 'components/Common/RedeemCreditsBlock';

import modalImage from 'assets/img/credits_modal_image.png';
import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';

const styles = {
	content: {
		position: 'relative' as 'relative',
		display: 'flex',
		alignItems: 'flex-start',
		bgcolor: 'background.surfaceSolid',
		borderRadius: '8px',
		padding: 0,
		overflowY: 'unset',
	},
	leftContainer: {
		flex: '1',
	},
	leftImage: {
		display: 'block',
		width: '100%',
		height: '100%',
		objectFit: 'cover' as 'cover',
		borderTopLeftRadius: '8px',
		borderBottomLeftRadius: '8px',
	},
	rightContainer: {
		flex: '1',
		padding: '40px',
	},
	closeBtn: {
		position: 'absolute' as 'absolute',
		top: '8px',
		right: '8px',
		padding: 0,
	},
	formControl: {
		width: '100%',
		padding: '12px',
		border: '1px solid',
		borderColor: 'primary.light',
		borderRadius: '8px',
	},
};

// THEME_NEXT
const StyledDialogContent = styled(DialogContent)({
	padding: 0,
	overflowY: 'unset',
});

const {
	creditsLeft,
	imagesLeftMessage,
	productsOptions,
	successCreditsRedeem,
	errorCreditsRedeem,
} = strings;

const DialogCredits: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { id: userId, creditsRedeem, creditsBalance, imagesLeft } = useSliceUser();

	const [updateUserWalletsRedeem, { isSuccess, isError }] = useRedeemUserCreditsMutation();

	const modalText = `${imagesLeftMessage.replace(
		':imagesLeft',
		imagesLeft.toString(),
	)} ${productsOptions}`;

	const creditsLeftText = creditsLeft.replace(':credits', creditsBalance.toLocaleString('en-US'));

	const successCreditsRedeemText = successCreditsRedeem.replace(
		':creditsRedeem',
		creditsRedeem.toString(),
	);

	useEffect(() => {
		if (isError) {
			dispatch(
				showNotification({
					message: errorCreditsRedeem,
					severity: 'warning',
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError]);

	const handleUpdateRedeem = () => {
		updateUserWalletsRedeem();
	};

	const handleOnClose = () => {
		dispatch(closeModal());
	};

	useEffect(() => {
		if (isSuccess) {
			dispatch(apiUserWallets.util.resetApiState());
			dispatch(
				showNotification({
					message: successCreditsRedeemText,
					severity: 'success',
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	return (
		<StyledDialogHorizontalCard
			open
			onClose={handleOnClose}
			aria-labelledby="credits-dialog-title"
			aria-describedby="credits-dialog-description"
			width="870px"
		>
			<StyledDialogContent>
				<Box sx={styles.content}>
					<div style={styles.leftContainer}>
						<img src={modalImage} alt="credits" style={styles.leftImage} />
					</div>
					<div style={styles.rightContainer}>
						<Typography variant="h2" sx={{ mb: '24px' }} component="p">
							{creditsLeftText}
						</Typography>
						<Typography variant="h5" sx={{ mb: '24px', opacity: '0.8' }} component="p">
							{modalText}
						</Typography>
						<ProductsList isPublicPage={false} />
						<RedeemCreditsBlock
							creditsRedeem={creditsRedeem}
							userId={userId}
							updateRedeem={handleUpdateRedeem}
						/>
					</div>
				</Box>
			</StyledDialogContent>
			<StyledIconButtonAsset onClick={handleOnClose} sx={styles.closeBtn}>
				<CloseIcon />
			</StyledIconButtonAsset>
		</StyledDialogHorizontalCard>
	);
};

export default DialogCredits;
