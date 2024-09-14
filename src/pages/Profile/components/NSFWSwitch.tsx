/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Switch, Typography } from '@mui/material';

import { useUpdateNsfwMutation } from 'store/apis/apiUser';
import useSliceUser from 'store/hooks/useSliceUser';

import strings from 'constants/strings';
import nfswImage from 'assets/img/icons/HandEye.svg';

import ConfirmDialog from 'components/Dialogs/ConfirmDialog';

const Image = styled('img')({
	height: '24px',
	marginTop: '-4px',
	transform: 'scale(3)',
});

const { nsfwLabel, enabled, disabled, ageVerificationTitle } = strings;

const NSFWSwitch: React.FC = () => {
	const { isNsfwEnabled } = useSliceUser();
	const [updateNsfw] = useUpdateNsfwMutation();

	const [isConfirmDialogOpened, setConfirmDialogOpened] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		if (isChecked) {
			updateNsfw({ nsfw: true });
		} else {
			setConfirmDialogOpened(true);
		}
	};

	function handleConfirmDialog() {
		updateNsfw({ nsfw: false });
		setConfirmDialogOpened(false);
	}

	function handleCloseDialog() {
		setConfirmDialogOpened(false);
	}

	function handleCloseIconDialog() {
		setConfirmDialogOpened(false);
	}

	return (
		<>
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
				<Typography
					variant="h5"
					fontSize="inherit"
					sx={{ display: 'flex', flexDirection: 'row', paddingTop: '10px' }}
				>
					<Image src={nfswImage} alt="NSFW" />
					{nsfwLabel} &nbsp;{' '}
					{isNsfwEnabled ? (
						<Typography
							component="span"
							sx={{ color: 'success.main', lineHeight: 'normal' }}
						>
							{enabled}
						</Typography>
					) : (
						<Typography
							component="span"
							sx={{ color: 'error.main', lineHeight: 'normal' }}
						>
							{disabled}
						</Typography>
					)}
				</Typography>

				<Switch
					color="primary"
					checked={isNsfwEnabled}
					onChange={handleChange}
					inputProps={{ 'aria-label': 'controlled' }}
				/>
			</Box>

			{isConfirmDialogOpened && (
				<ConfirmDialog
					open={isConfirmDialogOpened}
					onClose={handleCloseDialog}
					onCloseIcon={handleCloseIconDialog}
					confirmCallback={handleConfirmDialog}
					contentFontSize="16px"
					title={ageVerificationTitle}
					content="Is your age over 18?"
					yesButtonText="Yes, continue"
					noButtonText="No, I'm not"
				/>
			)}
		</>
	);
};

export default NSFWSwitch;
