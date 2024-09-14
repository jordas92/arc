/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceControlNet from 'store/hooks/useSliceControlNet';
import { setSourceImageBase64 } from 'store/storeSlices/sliceControlNet';

import { uploadImageStatus } from 'constants/default';
import strings from 'constants/strings';

import DrawerSourceImageUploadContainer from './DrawerSourceImageUploadContainer';

import DrawerSourceImageContent from './DrawerSourceImageContent';

type ImageData = {
	imageBase64: string;
	uploadStatus: keyof typeof uploadImageStatus;
};

const { ERROR_UPLOAD_FAILED, ERROR_UPLOAD_FILE_TYPE, ERROR_UPLOAD_IMAGE_SIZE, SUCCESS_UPLOAD } =
	uploadImageStatus;

const { uploadImageFailed, uploadImageInvalidType, uploadImageFileSize } = strings;

const DrawerSourceImage: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { openedControlNetDrawer, controlNetTools } = useSliceControlNet();
	const { controlNetGenerationData } = controlNetTools[openedControlNetDrawer];
	const { sourceImageBase64, sourceImageUrl } = controlNetGenerationData;

	const [errorMsg, setErrorMsg] = useState<string>('');
	const [imageSrc, setImageSrc] = useState<string>(sourceImageBase64 || sourceImageUrl);

	useEffect(() => {
		setImageSrc(sourceImageBase64 || sourceImageUrl);
	}, [sourceImageBase64, sourceImageUrl]);

	const handleImageData = (imageData: ImageData) => {
		setErrorMsg('');
		const { imageBase64, uploadStatus } = imageData;

		if (uploadStatus === SUCCESS_UPLOAD) {
			dispatch(setSourceImageBase64(imageBase64));
			setImageSrc(imageBase64);
		} else {
			switch (uploadStatus) {
				case ERROR_UPLOAD_FAILED:
					setErrorMsg(uploadImageFailed);
					break;

				case ERROR_UPLOAD_FILE_TYPE:
					setErrorMsg(uploadImageInvalidType);
					break;

				case ERROR_UPLOAD_IMAGE_SIZE:
					setErrorMsg(uploadImageFileSize);
					break;

				default:
					setErrorMsg('');
					break;
			}
		}
	};

	const conditionalContent = () => {
		if (!controlNetTools[openedControlNetDrawer].isImagesContainerExpanded) {
			if (imageSrc) {
				return <DrawerSourceImageContent />;
			}

			return (
				<DrawerSourceImageUploadContainer
					handleImageData={handleImageData}
					errorMsg={errorMsg}
				/>
			);
		}

		return null;
	};

	return conditionalContent();
};

export default DrawerSourceImage;
