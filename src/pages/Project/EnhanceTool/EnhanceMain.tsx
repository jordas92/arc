/** Copyright (c) 2023-present Kristiyan Dimitrov */
/* eslint-disable max-len */

import React, { useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import strings from 'constants/strings';
import useElementSize from 'hooks/useElementSize';
import SourceImageContainer from './SourceImageContainer';
import SplitContainer from './ImageComparison/SplitContainer';
import CustomDropContainer from '../../../components/Common/DND/CustomDropContainer';
import { closeModal, openModal } from '../../../store/storeSlices/sliceApp';
import {
	setEnhanceSourceImageData,
	setGenerationTool,
	setGenerationToolEnhanceSettings,
	setIsGenerationContainerHidden,
} from '../../../store/storeSlices/sliceOpenedProjects';
import useStoreDispatch from '../../../store/hooks/useStoreDispatch';
import { retrieveImageDimensions, toBase64, validateImage } from '../../../utils/imageUtils';
import {
	UPLOAD_MAX_SIZE_MB,
	UPLOAD_MAX_SIZE_PX,
	uploadImageStatus,
} from '../../../constants/default';
import { generationToolsKeys, modalsKeys } from '../../../store/common/keys';

const { enhanceLoading } = strings;

const defineContainerHeight = (
	sourceImageWidth: number,
	sourceImageHeight: number,
	containerWidth: number | null,
) => {
	if (containerWidth) {
		return (containerWidth * sourceImageHeight) / sourceImageWidth;
	}

	return sourceImageHeight;
};

const { UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_ERROR_X } = modalsKeys;
const { ERROR_UPLOAD_IMAGE_SIZE, SUCCESS_UPLOAD } = uploadImageStatus;
const { TOOL_ENHANCE } = generationToolsKeys;

const EnhanceMain: React.FC = () => {
	const ref = useRef(null);
	const { width } = useElementSize(ref);
	const dispatch = useStoreDispatch();
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

	const handleDroppedImage = (file) => {
		const { imageId, imageUrl, generationData } = file;
		const { imageWidth, imageHeight } = generationData;
		if (imageWidth && imageHeight) {
			dispatch(closeModal());
			dispatch(setIsGenerationContainerHidden(true));
			dispatch(setGenerationTool(TOOL_ENHANCE));
			dispatch(setGenerationToolEnhanceSettings(generationData));

			dispatch(
				setEnhanceSourceImageData({
					imageBase64: '',
					imageId,
					imageUrl,
					imageWidth,
					imageHeight,
				}),
			);
		}
	};

	const containerWidth = width ? width - 6 : null; // 6 is for the vertical scroll width

	const {
		currentEnhanceSourceImage,
		currentIsGenerationContainerHidden,
		currentIsRequestingGeneration,
		currentGeneration,
	} = useSliceOpenedProjects();

	const sourceImage = currentEnhanceSourceImage.imageUrl || currentEnhanceSourceImage.imageBase64;
	const sourceImageWidth = currentEnhanceSourceImage.imageWidth;
	const sourceImageHeight = currentEnhanceSourceImage.imageHeight;
	const containerHeight = defineContainerHeight(
		sourceImageWidth,
		sourceImageHeight,
		containerWidth,
	);

	const conditionalLoader = () => {
		if (currentIsRequestingGeneration) {
			return (
				<Box
					sx={{
						position: 'absolute',
						top: '50vh',
						textAlign: 'center',
						zIndex: '2',
					}}
				>
					<CircularProgress size={60} thickness={4} disableShrink />
					<Typography variant="h4" sx={{ padding: '10px' }}>
						{enhanceLoading}
					</Typography>
				</Box>
			);
		}

		return null;
	};

	const conditionalContent = () => {
		if (containerWidth) {
			if (
				currentGeneration &&
				currentGeneration.images[0] &&
				!currentIsGenerationContainerHidden
			) {
				return (
					<SplitContainer
						containerWidth={containerWidth}
						containerHeight={containerHeight}
						sourceImageWidth={sourceImageWidth}
						sourceImageHeight={sourceImageHeight}
						sourceImage={sourceImage}
						currentGeneration={currentGeneration}
					/>
				);
			}

			return (
				<SourceImageContainer
					containerWidth={containerWidth}
					containerHeight={containerHeight}
					sourceImageWidth={sourceImageWidth}
					sourceImageHeight={sourceImageHeight}
					sourceImage={sourceImage}
					isGenerating={currentIsRequestingGeneration}
				/>
			);
		}
		return null;
	};

	const handleDroppedFile = async (files) => {
		const { uploadStatus } = validateImage(files, UPLOAD_MAX_SIZE_MB);
		if (files && uploadStatus === SUCCESS_UPLOAD) {
			const imageBase64 = await toBase64(files[0]);
			const { imageWidth, imageHeight } = await retrieveImageDimensions(imageBase64);
			if (imageWidth && imageHeight) {
				if (imageWidth + imageHeight > UPLOAD_MAX_SIZE_PX) {
					dispatch(
						openModal({
							type: UPLOAD_IMAGE_ERROR_X,
							data: { uploadStatus: ERROR_UPLOAD_IMAGE_SIZE },
						}),
					);
				} else {
					dispatch(setIsGenerationContainerHidden(true));
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
			}
		} else {
			dispatch(
				openModal({
					type: UPLOAD_IMAGE_ERROR,
					data: { uploadStatus: ERROR_UPLOAD_IMAGE_SIZE },
				}),
			);
		}
	};

	return (
		<CustomDropContainer
			handleDroppedFile={handleDroppedFile}
			isNoStyle
			isFileInput={false}
			isDisabled={isRequestingGenerationEnhance}
		>
			<Box ref={isRequestingGenerationEnhance ? null : drop}>
				<Box
					ref={ref}
					sx={{
						width: `calc(100% - 10px)`,
						height: `calc(100vh - 150px)`,
						overflowY: 'auto',
						overflowX: 'hidden',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{conditionalContent()}
					{conditionalLoader()}
				</Box>
			</Box>
		</CustomDropContainer>
	);
};

export default EnhanceMain;
