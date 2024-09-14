/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';
import { useDrop } from 'react-dnd';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceApp from 'store/hooks/useSliceApp';
import {
	setEnhanceSourceImageData,
	setGenerationTool,
	// setGenerationToolEnhanceSettings,
	setIsGenerationContainerHidden,
} from 'store/storeSlices/sliceOpenedProjects';
import { openModal, closeModal } from 'store/storeSlices/sliceApp';
import { generationToolsKeys, modalsKeys } from 'store/common/keys';

import { retrieveImageDimensions } from 'utils/imageUtils';
import { INITIAL_CONTAINERS_WIDTH, uploadImageStatus } from 'constants/default';
import StyledInitialViewWrapper from 'components/StyledWrappers/StyledInitialViewWrapper';
import UploadImageContainer from '../../../components/Common/DND/UploadImageContainer';
import useSliceOpenedProjects from '../../../store/hooks/useSliceOpenedProjects';

type ImageData = {
	imageBase64: string;
	imageWidth: number;
	imageHeight: number;
	uploadStatus: keyof typeof uploadImageStatus;
	eventType: string;
};

const { UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_ERROR_X } = modalsKeys;
const { SUCCESS_UPLOAD, ERROR_UPLOAD_IMAGE_SIZE } = uploadImageStatus;
const { TOOL_ENHANCE } = generationToolsKeys;

const InitialViewEnhance: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { modal } = useSliceApp();
	const { isRequestingGenerationEnhance } = useSliceOpenedProjects();

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
		const { imageId, imageUrl } = file;
		const { imageWidth, imageHeight } = await retrieveImageDimensions(imageUrl);
		if (imageWidth && imageHeight) {
			dispatch(closeModal());
			dispatch(setIsGenerationContainerHidden(true));
			dispatch(setGenerationTool(TOOL_ENHANCE));
			// dispatch(setGenerationToolEnhanceSettings(generationData));

			dispatch(
				setEnhanceSourceImageData({
					imageId,
					imageBase64: '',
					imageUrl,
					imageWidth,
					imageHeight,
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
			dispatch(
				setEnhanceSourceImageData({
					imageBase64,
					imageId: '',
					imageUrl: '',
					imageWidth,
					imageHeight,
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
		// }
	};

	return (
		<StyledInitialViewWrapper>
			<Box
				ref={isRequestingGenerationEnhance ? null : drop}
				sx={{ width: `${INITIAL_CONTAINERS_WIDTH}px` }}
			>
				<UploadImageContainer
					handleImageData={handleImageData}
					isDroppable={isRequestingGenerationEnhance}
				/>
			</Box>
		</StyledInitialViewWrapper>
	);
};

export default InitialViewEnhance;
