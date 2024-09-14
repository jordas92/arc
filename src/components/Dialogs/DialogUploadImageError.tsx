/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Typography, DialogActions } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { closeModal } from 'store/storeSlices/sliceApp';
import { generationToolsKeys, sourceImageOriginKeys } from 'store/common/keys';
import {
	setEnhanceSourceImageData,
	setTransformSourceImageData,
	setIsInPaintMode,
	clearInPaintDrawingLines,
} from 'store/storeSlices/sliceOpenedProjects';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import { ReactComponent as UploadErrorIcon } from 'assets/img/icons/uploadError.svg';
import strings from 'constants/strings';
import { BASIC_IMAGE_SIZE_MAX, uploadImageStatus } from 'constants/default';
import { calculateNewImageDimensions } from 'utils/imageUtils';
import StyledDialog from 'components/StyledWrappers/StyledDialog';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import BtnUploadImage from 'components/Common/Buttons/BtnUploadImage';

type ImageData = {
	imageBase64: string;
	imageWidth: number;
	imageHeight: number;
	uploadStatus: keyof typeof uploadImageStatus;
};

type Props = {
	uploadStatus: string;
};

const {
	uploadAnother,
	uploadFailed,
	invalidFileType,
	imageToLarge,
	uploadImageFailed,
	uploadImageInvalidType,
	uploadImageFileSize,
} = strings;

const { IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { ORIGIN_SOURCE_IMAGE_UPLOAD } = sourceImageOriginKeys;
const { ERROR_UPLOAD_FAILED, ERROR_UPLOAD_FILE_TYPE, ERROR_UPLOAD_IMAGE_SIZE, SUCCESS_UPLOAD } =
	uploadImageStatus;

const DialogHeader = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingBottom: '12px',
	borderBottom: `1px solid ${theme.palette.background.surfaceHighest}`,
}));

const DialogUploadImageError: React.FC<Props> = ({ uploadStatus }) => {
	const dispatch = useStoreDispatch();
	const { currentGenerationTool } = useSliceOpenedProjects();
	const [isDialogHidden, setIsDialogHidden] = useState<boolean>(false);
	const [uploadErrorStatus, setUploadErrorStatus] = useState<string>(uploadStatus);

	const handleOnClickClose = () => {
		dispatch(closeModal());
	};

	const dialogContent = () => {
		switch (uploadErrorStatus) {
			case ERROR_UPLOAD_FAILED:
				return {
					title: uploadFailed,
					message: uploadImageFailed,
				};

			case ERROR_UPLOAD_FILE_TYPE:
				return {
					title: invalidFileType,
					message: uploadImageInvalidType,
				};

			case ERROR_UPLOAD_IMAGE_SIZE:
				return {
					title: imageToLarge,
					message: uploadImageFileSize,
				};

			default:
				return {
					title: '',
					message: '',
				};
		}
	};

	const handleOnUploadButtonClick = () => {
		setIsDialogHidden(true);
	};

	const handleOnFileInputCancel = () => {
		dispatch(closeModal());
	};

	const handleImageData = (imageData: ImageData) => {
		const { imageBase64, imageWidth, imageHeight, uploadStatus } = imageData;

		if (uploadStatus === SUCCESS_UPLOAD) {
			dispatch(closeModal());

			if (currentGenerationTool === TOOL_ENHANCE) {
				dispatch(
					setEnhanceSourceImageData({
						imageBase64,
						imageId: '',
						imageUrl: '',
						imageWidth,
						imageHeight,
					}),
				);
			}

			if (currentGenerationTool === IMAGE_TO_IMAGE) {
				const newDimensions = calculateNewImageDimensions(
					imageWidth,
					imageHeight,
					BASIC_IMAGE_SIZE_MAX,
				);

				dispatch(setIsInPaintMode(false));
				dispatch(clearInPaintDrawingLines());
				dispatch(
					setTransformSourceImageData({
						imageId: '',
						imageUrl: '',
						base64Image: imageBase64,
						isImageNsfw: false,
						imageWidth: newDimensions.newWidth,
						imageHeight: newDimensions.newHeight,
						sourceImageOrigin: ORIGIN_SOURCE_IMAGE_UPLOAD,
					}),
				);
			}
		} else {
			setIsDialogHidden(false);
			setUploadErrorStatus(uploadStatus);
		}
	};

	return (
		<StyledDialog
			open
			onClose={handleOnClickClose}
			height="auto"
			width="470px"
			isHidden={isDialogHidden}
		>
			<DialogHeader>
				<Typography variant="h3" component="h3">
					{dialogContent().title}
				</Typography>
				<StyledIconButtonAsset onClick={handleOnClickClose} sx={{ padding: '0' }}>
					<CloseIcon />
				</StyledIconButtonAsset>
			</DialogHeader>

			<Box>
				<Box sx={{ width: '100%', margin: '32px 0', textAlign: 'center' }}>
					<UploadErrorIcon
						style={{
							width: '85px',
							height: '85px',
						}}
					/>
				</Box>

				<Typography
					variant="h5"
					sx={{ margin: '0 24px 32px', textAlign: 'center', lineHeight: '1.6' }}
				>
					{dialogContent().message}
				</Typography>
			</Box>

			<DialogActions>
				<Box sx={{ width: '160px', margin: '0 auto' }}>
					<BtnUploadImage
						buttonLabel={uploadAnother}
						handleImageData={handleImageData}
						handleOnUploadButtonClick={handleOnUploadButtonClick}
						handleOnFileInputCancel={handleOnFileInputCancel}
					/>
				</Box>
			</DialogActions>
		</StyledDialog>
	);
};

export default DialogUploadImageError;
