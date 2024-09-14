/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceApp from 'store/hooks/useSliceApp';
import {
	setTransformSourceImageData,
	// setGenerationToolImageToImageSettings,
} from 'store/storeSlices/sliceOpenedProjects';
import { openModal, closeModal } from 'store/storeSlices/sliceApp';
import { modalsKeys, sourceImageOriginKeys } from 'store/common/keys';

import {
	BASIC_IMAGE_SIZE_MAX,
	INITIAL_CONTAINERS_WIDTH,
	uploadImageStatus,
} from 'constants/default';
import { calculateNewImageDimensions, retrieveImageDimensions } from 'utils/imageUtils';
import StyledInitialViewWrapper from 'components/StyledWrappers/StyledInitialViewWrapper';
import { useDrop } from 'react-dnd';
import UploadImageContainer from '../../../components/Common/DND/UploadImageContainer';

type ImageData = {
	imageBase64: string;
	imageWidth: number;
	imageHeight: number;
	uploadStatus: keyof typeof uploadImageStatus;
	eventType: string;
};

const { UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_ERROR_X } = modalsKeys;
const { SUCCESS_UPLOAD, ERROR_UPLOAD_IMAGE_SIZE } = uploadImageStatus;
const { ORIGIN_SOURCE_IMAGE_UPLOAD } = sourceImageOriginKeys;

const InitialViewImageTransform: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { modal } = useSliceApp();

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [{ isOver, canDrop }, drop] = useDrop(() => ({
		accept: 'image',
		drop: async (item) => {
			handleDroppedImage(item);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const handleDroppedImage = async (file) => {
		const { imageId, imageUrl, isImageNsfw } = file;
		const { imageWidth, imageHeight } = await retrieveImageDimensions(imageUrl);

		if (imageWidth && imageHeight) {
			// dispatch(setGenerationToolImageToImageSettings(generationData));
			dispatch(
				setTransformSourceImageData({
					imageId,
					imageUrl,
					base64Image: '',
					isImageNsfw,
					imageWidth,
					imageHeight,
					sourceImageOrigin: ORIGIN_SOURCE_IMAGE_UPLOAD,
				}),
			);
		}
	};

	const handleImageData = (imageData: ImageData) => {
		const { imageBase64, imageWidth, imageHeight, uploadStatus, eventType } = imageData;
		// if (imageBase64.length > 0) {
		if (imageBase64.length > 0 && uploadStatus === SUCCESS_UPLOAD) {
			// Will close the 'DialogUploadImageError' (if it's open)
			dispatch(closeModal());

			const newDimensions = calculateNewImageDimensions(
				imageWidth,
				imageHeight,
				BASIC_IMAGE_SIZE_MAX,
			);

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
		} else if (uploadStatus === ERROR_UPLOAD_IMAGE_SIZE) {
			dispatch(
				openModal({
					type: UPLOAD_IMAGE_ERROR,
					data: { uploadStatus: ERROR_UPLOAD_IMAGE_SIZE },
				}),
			);
		} else if (eventType === 'drop' && modal.type === UPLOAD_IMAGE_ERROR) {
			// Check the comments in Modals.tsx
			dispatch(
				openModal({
					type: UPLOAD_IMAGE_ERROR_X,
					data: { uploadStatus },
				}),
			);
		} else if (eventType === 'drop' && modal.type === UPLOAD_IMAGE_ERROR_X) {
			// Check the comments in Modals.tsx
			dispatch(
				openModal({
					type: UPLOAD_IMAGE_ERROR,
					data: { uploadStatus },
				}),
			);
		} else {
			dispatch(
				openModal({
					type: UPLOAD_IMAGE_ERROR,
					data: { uploadStatus },
				}),
			);
		}
	};

	return (
		<StyledInitialViewWrapper>
			<Box ref={drop} sx={{ width: `${INITIAL_CONTAINERS_WIDTH}px` }}>
				<UploadImageContainer handleImageData={handleImageData} />
			</Box>
		</StyledInitialViewWrapper>
	);
};

export default InitialViewImageTransform;
