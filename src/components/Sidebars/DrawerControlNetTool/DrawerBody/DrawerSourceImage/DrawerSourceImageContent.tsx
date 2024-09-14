/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Box, CardMedia } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceControlNet from 'store/hooks/useSliceControlNet';
import {
	setPreProcessedImageUrl,
	setIsSourceImageShown,
	setIsImagePreprocessed,
	resetControlNetGenerationData,
} from 'store/storeSlices/sliceControlNet';
import { usePreProcessImageMutation } from 'store/apis/apiControlNet';

import strings from 'constants/strings';

import Spinner from 'components/Common/Spinner';
import PreProcessCheckbox from './Inputs/PreProcessCheckbox';
import InfluenceSlider from './Inputs/InfluenceSlider';
import PreProcessBtn from './Inputs/PreProcessBtn';
import DrawerSourceImageOverlay from './DrawerSourceImageOverlay';

const StyledBox = styled(Box)(({ theme }) => ({
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '220px',
	height: '220px',
	marginBottom: '12px',
	backgroundColor: theme.palette.accent.black,
}));

const { showOriginalImage, showPreprocessedImage } = strings;

const DrawerSourceImageContent: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { openedControlNetDrawer, controlNetTools } = useSliceControlNet();
	const { controlNetGenerationData } = controlNetTools[openedControlNetDrawer];
	const { sourceImageBase64, sourceImageUrl, preProcessedImageUrl, isSourceImageShown } =
		controlNetGenerationData;

	const [
		preProcessImage,
		{
			isLoading: isLoadingPreProcessImage,
			isSuccess: isSuccessPreProcessImage,
			data: preProcessedImageData,
		},
	] = usePreProcessImageMutation();

	const [showSpinner, setShowSpinner] = useState<boolean>(false);
	const [imageSrc, setImageSrc] = useState<string>(sourceImageBase64 || sourceImageUrl);
	const [isCardHovered, setIsCardHovered] = useState<boolean>(false);
	const [showToggleBtn, setShowToggleBtn] = useState<boolean>(false);
	const [switchBtnTooltip, setSwitchBtnTooltip] = useState<string>(showOriginalImage);

	useEffect(() => {
		if (!sourceImageBase64 || !sourceImageUrl) {
			setShowToggleBtn(false);
		}

		setImageSrc(sourceImageBase64 || sourceImageUrl);
	}, [sourceImageBase64, sourceImageUrl]);

	useEffect(() => {
		if (preProcessedImageUrl) {
			setShowToggleBtn(true);
		}
	}, [preProcessedImageUrl]);

	useEffect(() => {
		if (isSourceImageShown && (sourceImageBase64 || sourceImageUrl)) {
			setImageSrc(sourceImageBase64 || sourceImageUrl);
			setSwitchBtnTooltip(showPreprocessedImage);
		}

		if (!isSourceImageShown && preProcessedImageUrl) {
			setImageSrc(preProcessedImageUrl);
			setSwitchBtnTooltip(showOriginalImage);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSourceImageShown]);

	useEffect(() => {
		if (isSuccessPreProcessImage && preProcessedImageData) {
			setImageSrc(preProcessedImageData);
			dispatch(setPreProcessedImageUrl(preProcessedImageData));
			dispatch(setIsImagePreprocessed(true));
			setShowSpinner(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessPreProcessImage]);

	const handleOnMouseEnter = () => {
		setIsCardHovered(true);
	};

	const handleOnMouseLeave = () => {
		setIsCardHovered(false);
	};

	const handleOnClickDelete = () => {
		setImageSrc('');

		dispatch(resetControlNetGenerationData());
	};

	const handleOnClickSwitchImages = () => {
		dispatch(setIsSourceImageShown(!isSourceImageShown));
	};

	const handleOnPreprocessBtnClick = () => {
		const argsImage = sourceImageBase64 || sourceImageUrl;
		const args = {
			key: 'none', // BE requirement
			controlnet_input_images: [argsImage],
		};
		preProcessImage(args);
		setShowSpinner(true);
	};

	const conditionalContentImage = () => {
		if (showSpinner) {
			return (
				<StyledBox>
					<Spinner />
				</StyledBox>
			);
		}

		if (!isLoadingPreProcessImage && imageSrc) {
			return (
				<StyledBox onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
					<CardMedia
						component="img"
						src={imageSrc}
						alt="source image"
						sx={{
							objectFit: 'scale-down',
							maxHeight: '100%',
						}}
					/>
					{isCardHovered && (
						<DrawerSourceImageOverlay
							handleOnClickDelete={handleOnClickDelete}
							handleOnClickSwitchImages={handleOnClickSwitchImages}
							showToggleBtn={showToggleBtn}
							switchBtnTooltip={switchBtnTooltip}
						/>
					)}
				</StyledBox>
			);
		}
	};

	const conditionalContentImageOptions = () => {
		return (
			<>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<PreProcessCheckbox />
					<PreProcessBtn
						handleOnClick={handleOnPreprocessBtnClick}
						disabled={isLoadingPreProcessImage}
					/>
				</Box>
				<InfluenceSlider />
			</>
		);
	};

	const conditionalContent = () => {
		if (imageSrc) {
			return (
				<>
					{conditionalContentImage()}
					{conditionalContentImageOptions()}
				</>
			);
		}

		return null;
	};

	return conditionalContent();
};

export default DrawerSourceImageContent;
