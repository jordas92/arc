/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import { useDrop } from 'react-dnd';

import { ReactComponent as UploadIcon } from 'assets/img/icons/upload-icon.svg';
import { ReactComponent as UploadIconWhite } from 'assets/img/icons/upload-white.svg';
import strings from 'constants/strings';
import CustomDropContainer from './CustomDropContainer';
import { generationToolsKeys, modalsKeys, sourceImageOriginKeys } from '../../../store/common/keys';
import {
	UPLOAD_MAX_SIZE_MB,
	UPLOAD_MAX_SIZE_PX,
	uploadImageStatus,
} from '../../../constants/default';
import {
	fetchConvertImageUrlToBase64,
	retrieveImageDimensions,
	toBase64,
	validateImage,
} from '../../../utils/imageUtils';
import useStoreDispatch from '../../../store/hooks/useStoreDispatch';
import useSliceOpenedProjects from '../../../store/hooks/useSliceOpenedProjects';
import {
	closeDrawer,
	setEnhanceSourceImageData,
	setGenerationTool,
	setGenerationToolEnhanceSettings,
	setGenerationToolImageToImageSettings,
	clearInPaintDrawingLines,
	setIsGenerationContainerHidden,
	setIsInPaintMode,
	setTransformSourceImageData,
} from '../../../store/storeSlices/sliceOpenedProjects';
import { closeModal, openModal } from '../../../store/storeSlices/sliceApp';

type Props = {
	typeGenerationTool: string;
	sx?: any;
};

const { UPLOAD_IMAGE_ERROR, UPLOAD_IMAGE_ERROR_X } = modalsKeys;
const { ERROR_UPLOAD_IMAGE_SIZE, SUCCESS_UPLOAD } = uploadImageStatus;
const { upload } = strings;
const { TOOL_ENHANCE, IMAGE_TO_IMAGE } = generationToolsKeys;
const { ORIGIN_SOURCE_IMAGE_UPLOAD } = sourceImageOriginKeys;

type CustomProps = {
	sx?: any;
	isOverDropzone: any;
	isDisabled?: boolean;
};

const StyledContainer = styled(Box)<CustomProps>(
	({ theme, isOverDropzone = false, isDisabled, sx }) => ({
		alignItems: 'center',
		pointerEvents: isDisabled ? 'none' : 'auto',
		cursor: isDisabled ? 'not-allowed' : '',
		opacity: isDisabled ? 0.5 : 1,
		transition: '0.3s',
		borderRadius: '16px',
		backgroundColor: isOverDropzone ? theme.palette.background.surfaceHighest : 'unset',
		borderColor: isOverDropzone
			? `1px dashed ${theme.palette.accent.primary}`
			: `1px dashed ${theme.palette.text.disabled}`,
		'&:hover': {
			borderColor: theme.palette.accent.primary,
		},
		...sx,
	}),
);

const StyledUploadButtonContainer: React.FC<Props> = ({ typeGenerationTool, sx }) => {
	const dispatch = useStoreDispatch();
	const { currentIsRequestingGeneration: isRequestingGeneration } = useSliceOpenedProjects();

	const [{ isOver, canDrop }, drop] = useDrop(() => ({
		accept: 'image',
		drop: async (item) => {
			await handleDroppedImage(item);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}));

	const isActiveDropZone = isOver && canDrop;

	const handleDroppedImage = async (file) => {
		const { imageUrl, generationData, isImageNsfw } = file;
		if (generationData) {
			const { imageId, imageWidth, imageHeight } = generationData;
			if (imageWidth && imageHeight) {
				dispatch(closeModal());
				dispatch(closeDrawer());

				if (typeGenerationTool === TOOL_ENHANCE) {
					dispatch(setGenerationTool(TOOL_ENHANCE));
					dispatch(setIsGenerationContainerHidden(true));
					dispatch(setGenerationToolEnhanceSettings(generationData));
					dispatch(
						setEnhanceSourceImageData({
							imageBase64: '',
							imageId: '',
							imageUrl,
							imageWidth,
							imageHeight,
						}),
					);
				}

				if (typeGenerationTool === IMAGE_TO_IMAGE) {
					dispatch(setGenerationTool(IMAGE_TO_IMAGE));
					dispatch(setGenerationToolImageToImageSettings(generationData));

					dispatch(setIsInPaintMode(false));
					dispatch(clearInPaintDrawingLines());
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
			}
		} else {
			await getImageUrlDimensions(imageUrl);
		}
	};

	// TODO_NEXT - verify what is ithe usage for this func?!?
	// If the image is from the system - it should has 'generationData'
	const getImageUrlDimensions = async (imageUrl) => {
		const imageBase64 = await fetchConvertImageUrlToBase64(imageUrl);
		const { imageWidth, imageHeight } = await retrieveImageDimensions(imageBase64);

		if (imageWidth && imageHeight) {
			dispatch(closeModal());
			dispatch(closeDrawer());

			if (typeGenerationTool === TOOL_ENHANCE) {
				dispatch(setGenerationTool(TOOL_ENHANCE));
				dispatch(setIsGenerationContainerHidden(true));
				dispatch(
					setEnhanceSourceImageData({
						imageBase64,
						imageUrl: '',
						imageId: '',
						imageWidth,
						imageHeight,
					}),
				);
			}

			if (typeGenerationTool === IMAGE_TO_IMAGE) {
				dispatch(setGenerationTool(IMAGE_TO_IMAGE));

				dispatch(setIsInPaintMode(false));
				dispatch(clearInPaintDrawingLines());
				dispatch(
					setTransformSourceImageData({
						imageId: '',
						imageUrl,
						base64Image: imageBase64,
						isImageNsfw: false,
						imageWidth,
						imageHeight,
						sourceImageOrigin: ORIGIN_SOURCE_IMAGE_UPLOAD,
					}),
				);
			}
		}
	};

	const handleDroppedFile = async (files) => {
		if (files[0]) {
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
						return true;
					}

					if (typeGenerationTool === TOOL_ENHANCE) {
						dispatch(setGenerationTool(TOOL_ENHANCE));
						dispatch(setIsGenerationContainerHidden(true));
						dispatch(
							setEnhanceSourceImageData({
								imageBase64,
								imageUrl: '',
								imageId: '',
								imageWidth,
								imageHeight,
							}),
						);
						return true;
					}

					if (typeGenerationTool === IMAGE_TO_IMAGE) {
						dispatch(setGenerationTool(IMAGE_TO_IMAGE));

						dispatch(setIsInPaintMode(false));
						dispatch(clearInPaintDrawingLines());
						dispatch(
							setTransformSourceImageData({
								imageId: '',
								imageUrl: '',
								base64Image: imageBase64,
								isImageNsfw: false,
								imageWidth,
								imageHeight,
								sourceImageOrigin: ORIGIN_SOURCE_IMAGE_UPLOAD,
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
		}
	};

	return (
		<StyledContainer
			ref={!isRequestingGeneration ? drop : null}
			isDisabled={isRequestingGeneration}
			isOverDropzone={isActiveDropZone}
			sx={sx}
		>
			<CustomDropContainer
				references={!isRequestingGeneration ? drop : null}
				isFileInput
				handleDroppedFile={handleDroppedFile}
				isDisabled={isRequestingGeneration}
				isOverDropzone={isActiveDropZone}
			>
				<Box
					sx={{
						display: 'flex',
						pointerEvents: 'none',
						alignItems: 'center',
					}}
				>
					{isRequestingGeneration ? (
						<UploadIcon
							style={{
								width: '32px',
								height: '32px',
								marginRight: '55pt',
								marginLeft: '15px',
							}}
						/>
					) : (
						<UploadIconWhite
							style={{
								width: '32px',
								height: '32px',
								marginRight: '55pt',
								marginLeft: '15px',
							}}
						/>
					)}

					<Typography variant="h3" sx={{ margin: '5px 0 5px' }}>
						{upload}
					</Typography>
				</Box>
			</CustomDropContainer>
		</StyledContainer>
	);
};

export default StyledUploadButtonContainer;
