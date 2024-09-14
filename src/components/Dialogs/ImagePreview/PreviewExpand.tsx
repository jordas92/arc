/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

const StyledBox = styled(Box)(({ theme }) => ({
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	height: '100vh',
	width: '100vw',
	backgroundColor: theme.palette.background.surfaceDarkLowest,
	padding: '12px 12px 48px',
	borderRadius: '8px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	outline: 'none',
}));

const Image = styled('img')({
	maxWidth: '100%',
	maxHeight: '100%',
	height: 'auto',
	width: 'auto',
	objectFit: 'contain',
});

type Props = {
	imageUrl: string;
	handleOnClosePreviewExpand: Function;
	isPrevBtnDisabled: boolean;
	isNextBtnDisabled: boolean;
	handleOnClickPrevious: Function;
	handleOnClickNext: Function;
};

const PreviewExpand: React.FC<Props> = ({
	imageUrl,
	handleOnClosePreviewExpand,
	isPrevBtnDisabled,
	isNextBtnDisabled,
	handleOnClickPrevious,
	handleOnClickNext,
}) => {
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	const handleOnClickPreviousBtn = (e: any) => {
		e.stopPropagation();
		handleOnClickPrevious();
	};

	const handleOnClickNextBtn = (e: any) => {
		e.stopPropagation();
		handleOnClickNext();
	};

	const conditionalContent = () => {
		if (imageError) {
			return <span>Image failed to load</span>;
		}

		return <Image alt="generated image" src={imageUrl} onError={handleImageError} />;
	};

	return (
		<StyledBox onClick={(e) => handleOnClosePreviewExpand(e)}>
			<Box sx={{ width: '100%', textAlign: 'right' }}>
				<StyledIconButtonAsset
					onClick={(e) => handleOnClosePreviewExpand(e)}
					disableRipple
					sx={{ padding: '0', svg: { scale: '1.1' } }}
				>
					<CloseIcon />
				</StyledIconButtonAsset>
			</Box>
			{!isPrevBtnDisabled && (
				<StyledIconButtonMui
					onClick={(e) => handleOnClickPreviousBtn(e)}
					disableRipple
					hasBackground
					sx={{
						position: 'absolute',
						top: '45%',
						left: '24px',
					}}
				>
					<KeyboardArrowLeftIcon fontSize="medium" />
				</StyledIconButtonMui>
			)}
			{conditionalContent()}
			<Box sx={{ padding: '0', margin: '0', height: '0' }} />
			{!isNextBtnDisabled && (
				<StyledIconButtonMui
					onClick={(e) => handleOnClickNextBtn(e)}
					disableRipple
					hasBackground
					sx={{
						position: 'absolute',
						top: '45%',
						right: '24px',
					}}
				>
					<KeyboardArrowRightIcon fontSize="medium" />
				</StyledIconButtonMui>
			)}
		</StyledBox>
	);
};

export default PreviewExpand;
