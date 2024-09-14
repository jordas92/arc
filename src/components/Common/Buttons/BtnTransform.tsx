/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Tooltip, Box, Button } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceUser from 'store/hooks/useSliceUser';
import useSliceSamplers from 'store/hooks/useSliceSamplers';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { useCreateProjectMutation } from 'store/apis/apiProjects';
import { closeModal, setIsOverlayLoaderOn } from 'store/storeSlices/sliceApp';
import {
	closeDrawer,
	setGenerationTool,
	setIsGenerationContainerHidden,
	setGenerationToolImageToImageSettings,
	setTransformSourceImageData,
	setIsInPaintMode,
	setOpenedProject,
	setDefaultSamplers,
	clearInPaintDrawingLines,
} from 'store/storeSlices/sliceOpenedProjects';
import {
	generationToolsKeys,
	previewModalOriginKeys,
	sourceImageOriginKeys,
} from 'store/common/keys';
import { GenerationData, ImageToImageGenerationData } from 'store/types/typesCommon';
import commonUtils from 'store/common/utils';

import { ReactComponent as EditPencil } from 'assets/edit-pencil.svg';
import strings from 'constants/strings';
import routesPaths from 'routes/paths';
import useImageDimensions from 'hooks/useImageDimensions';

type Props = {
	imageId: string;
	imageUrl: string;
	hasIcon: boolean;
	isImageNsfw: boolean;
	generationData: GenerationData;
	origin: keyof typeof previewModalOriginKeys;
};

const {
	ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL,
	ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD,
	ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES,
	ORIGIN_HOMEPAGE_TAB_DISCOVER,
	ORIGIN_PROJECT_DRAWER_LIBRARY_ALL,
	ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD,
	ORIGIN_PROJECT_DRAWER_HISTORY,
	ORIGIN_PROJECT_DRAWER_FAVORITES_ALL,
	ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT,
	ORIGIN_PROJECT_MODEL_DETAILED,
	ORIGIN_PROJECT_CONTAINER_GENERATION,
} = previewModalOriginKeys;

const { handleDataForGenerationToolStore } = commonUtils;

const { disabledNSFW, transform, generating } = strings;
const { IMAGE_TO_IMAGE } = generationToolsKeys;
const { ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE } = sourceImageOriginKeys;
const { PROJECT } = routesPaths;

// Based on the Modal 'origin' the button has different behavior
const BtnTransform: React.FC<Props> = ({
	imageId,
	imageUrl,
	hasIcon,
	isImageNsfw,
	generationData,
	origin,
}) => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();
	const { isNsfwEnabled } = useSliceUser();
	const { isRequestingGenerationImageToImage } = useSliceOpenedProjects();

	const sliceSamplers = useSliceSamplers();
	const { width, height } = useImageDimensions(imageUrl);

	const handledData = handleDataForGenerationToolStore(IMAGE_TO_IMAGE, generationData);

	const [
		createProject,
		{ isError: isErrorCreateProject, isSuccess: isSuccessCreateProject, data: newProjectId },
	] = useCreateProjectMutation();

	const sourceImageOrigin =
		generationData.type === 'Enhance' ? ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE : '';

	useEffect(() => {
		if (isErrorCreateProject) {
			dispatch(setIsOverlayLoaderOn(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isErrorCreateProject]);

	useEffect(() => {
		if (isSuccessCreateProject && newProjectId) {
			// The url param 'skipFetchProjectPrompts' is used to
			// avoid 'Fetch Project Prompts' and 'Fetch Prompt Images' API calls from Project page
			const path = generatePath(PROJECT, { id: `${newProjectId}?skipFetchProjectPrompts` });

			dispatch(
				setOpenedProject({
					projectId: newProjectId,
					projectTitle: '',
					isDiscord: false,
					currentGenerationTool: IMAGE_TO_IMAGE,
				}),
			);

			navigate(path);
			dispatch(closeModal());
			dispatch(setDefaultSamplers(sliceSamplers));
			dispatch(
				setGenerationToolImageToImageSettings(handledData as ImageToImageGenerationData),
			);
			dispatch(
				setTransformSourceImageData({
					imageId,
					imageUrl,
					base64Image: '',
					isImageNsfw,
					imageWidth: width,
					imageHeight: height,
					sourceImageOrigin,
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessCreateProject]);

	const handleOnClick = async (e: React.MouseEvent) => {
		e.stopPropagation();

		switch (origin) {
			case ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL:
			case ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES:
			case ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD:
			case ORIGIN_HOMEPAGE_TAB_DISCOVER:
				dispatch(setIsOverlayLoaderOn(true));
				createProject();
				break;

			case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
			case ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD:
			case ORIGIN_PROJECT_DRAWER_HISTORY:
			case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
			case ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT:
			case ORIGIN_PROJECT_CONTAINER_GENERATION:
				dispatch(closeDrawer());
				dispatch(closeModal());
				dispatch(setGenerationTool(IMAGE_TO_IMAGE));
				dispatch(setIsGenerationContainerHidden(true));
				dispatch(
					setGenerationToolImageToImageSettings(
						handledData as ImageToImageGenerationData,
					),
				);

				dispatch(setIsInPaintMode(false));
				dispatch(clearInPaintDrawingLines());
				dispatch(
					setTransformSourceImageData({
						imageId,
						imageUrl,
						base64Image: '',
						isImageNsfw,
						imageWidth: width,
						imageHeight: height,
						sourceImageOrigin,
					}),
				);

				break;

			case ORIGIN_PROJECT_MODEL_DETAILED: {
				dispatch(closeDrawer());
				dispatch(closeModal());
				dispatch(setGenerationTool(IMAGE_TO_IMAGE));
				dispatch(setIsGenerationContainerHidden(true));
				dispatch(
					setGenerationToolImageToImageSettings(
						handledData as ImageToImageGenerationData,
					),
				);

				// TODO_NEXT - Create 'resetInpaintObj' and remove 'setIsInPaintMode' & 'clearInPaintDrawingLines'
				dispatch(setIsInPaintMode(false));
				dispatch(clearInPaintDrawingLines());
				dispatch(
					setTransformSourceImageData({
						imageId: '',
						imageUrl,
						base64Image: '',
						isImageNsfw,
						imageWidth: width,
						imageHeight: height,
						sourceImageOrigin,
					}),
				);
				break;
			}

			default:
				break;
		}
	};

	const isDisabled =
		(isImageNsfw && isNsfwEnabled) ||
		(isRequestingGenerationImageToImage && origin.includes('ORIGIN_PROJECT'));

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		if (isRequestingGenerationImageToImage && origin.includes('ORIGIN_PROJECT')) {
			return generating;
		}

		return '';
	};

	return (
		<Tooltip title={conditionalTooltip()} placement="top" arrow>
			<Box>
				<Button
					variant="arcanaMagic"
					onClick={handleOnClick}
					disabled={isDisabled}
					sx={{ paddingLeft: '14px', height: '42px' }}
				>
					{hasIcon && <EditPencil />}
					<Box sx={{ marginLeft: '12px' }}>{transform}</Box>
				</Button>
			</Box>
		</Tooltip>
	);
};

export default BtnTransform;
