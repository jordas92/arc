/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Box, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceUser from 'store/hooks/useSliceUser';
import useSliceSamplers from 'store/hooks/useSliceSamplers';
import { useGenerateUpscaleMutation } from 'store/apis/apiGeneration';
import { useCreateProjectMutation } from 'store/apis/apiProjects';
import {
	closeDrawer,
	setDefaultSamplers,
	setGenerationTool,
	setGenerationToolImageToImageSettings,
	clearInPaintDrawingLines,
	setTransformSourceImageData,
	setIsRequestingGeneration,
	setIsGenerationContainerHidden,
	setOpenedProject,
	setIsInPaintMode,
} from 'store/storeSlices/sliceOpenedProjects';
import { openModal, closeModal, setIsOverlayLoaderOn } from 'store/storeSlices/sliceApp';
import {
	generationToolsKeys,
	generationTypes,
	modalsKeys,
	previewModalOriginKeys,
	sourceImageOriginKeys,
} from 'store/common/keys';
import commonUtils from 'store/common/utils';
import { GenerationData, ImageToImageGenerationData } from 'store/types/typesCommon';
import { RequestGenerationUpscale, MetaIsRequestingGeneration } from 'store/types/typesGeneration';

import strings from 'constants/strings';
import { CREDITS_COST_UPSCALE, BUY_CREDITS_THRESHOLD_UPSCALE } from 'constants/default';
import routesPaths from 'routes/paths';

import { ReactComponent as UCircle } from 'assets/u-circle.svg';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

type generationTypesKeys = keyof typeof generationTypes;

type Props = {
	imageId: string;
	imageUrl: string;
	isImageNsfw: boolean;
	generationData: GenerationData;
	origin: keyof typeof previewModalOriginKeys;
	hasBackground?: boolean;
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
	ORIGIN_PROJECT_CONTAINER_GENERATION,
} = previewModalOriginKeys;

const { upscaleImage, imageUpscaled, disabledNSFW } = strings;
const { IMAGE_TO_IMAGE } = generationToolsKeys;
const { ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE } = sourceImageOriginKeys;
const { UPSCALE, ENHANCE } = generationTypes;
const { CREDITS } = modalsKeys;
const { PROJECT } = routesPaths;
const { handleDataForGenerationToolStore } = commonUtils;

const BtnGenerateUpscaleIcon: React.FC<Props> = ({
	imageId,
	imageUrl,
	isImageNsfw,
	generationData,
	origin,
	hasBackground = false,
}) => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();
	const { isNsfwEnabled } = useSliceUser();
	const { currentProjectId } = useSliceOpenedProjects();
	const { creditsBalance } = useSliceUser();

	const sliceSamplers = useSliceSamplers();
	const [generateUpscale] = useGenerateUpscaleMutation();
	const [
		createProject,
		{ isError: isErrorCreateProject, isSuccess: isSuccessCreateProject, data: newProjectId },
	] = useCreateProjectMutation();

	const handledData = handleDataForGenerationToolStore(IMAGE_TO_IMAGE, generationData);
	const { type, imageWidth, imageHeight } = generationData;

	const generationType = type as (typeof generationTypes)[generationTypesKeys];

	const sourceImageOrigin = generationType === ENHANCE ? ORIGIN_SOURCE_IMAGE_TOOL_ENHANCE : '';

	const isDisabled = generationType === UPSCALE || (isImageNsfw && isNsfwEnabled);

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

			const body = {
				image_id: imageId,
				factor: 2,
				project_id: newProjectId,
			};

			const meta = {
				projectId: newProjectId,
				generationTool: IMAGE_TO_IMAGE,
				isRequestingGeneration: true,
			};

			generateUpscale({
				body,
				meta,
			});

			dispatch(setIsRequestingGeneration(meta));

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
					imageWidth,
					imageHeight,
					sourceImageOrigin,
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessCreateProject]);

	// NOTE Upscale can be used only once or on images with dimensions up to 1312x1312px.
	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		if (creditsBalance <= BUY_CREDITS_THRESHOLD_UPSCALE) {
			dispatch(openModal({ type: CREDITS }));
		}

		if (creditsBalance >= CREDITS_COST_UPSCALE) {
			const argsGenerateUpscale: {
				body: RequestGenerationUpscale;
				meta: MetaIsRequestingGeneration;
			} = {
				body: {
					project_id: currentProjectId,
					image_id: imageId,
					factor: 2,
				},
				// Used to feed the action 'setIsRequestingGeneration' to set isRequestingGeneration to 'false' if an error occurs
				meta: {
					projectId: currentProjectId,
					generationTool: IMAGE_TO_IMAGE,
					isRequestingGeneration: false,
				},
			};

			const meta: MetaIsRequestingGeneration = {
				projectId: currentProjectId,
				generationTool: IMAGE_TO_IMAGE,
				isRequestingGeneration: true,
			};

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
					generateUpscale(argsGenerateUpscale);

					dispatch(closeDrawer());
					dispatch(closeModal());
					dispatch(setGenerationTool(IMAGE_TO_IMAGE));
					dispatch(setIsGenerationContainerHidden(true));
					dispatch(setIsRequestingGeneration(meta));
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
							imageWidth,
							imageHeight,
							sourceImageOrigin,
						}),
					);
					break;

				default:
					break;
			}
		}
	};

	const conditionalTooltip = () => {
		if (generationType === UPSCALE) {
			return imageUpscaled;
		}

		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		return upscaleImage;
	};

	return (
		<Tooltip title={conditionalTooltip()} placement="top" arrow>
			<Box>
				<StyledIconButtonAsset
					onClick={(e) => handleOnClick(e)}
					aria-label="Upscale Image Button"
					disableRipple
					hasBackground={hasBackground}
					isFiledIcon
					disabled={isDisabled}
					sx={{
						'&.Mui-disabled': {
							pointerEvents: 'auto',
						},
					}}
				>
					<UCircle />
				</StyledIconButtonAsset>
			</Box>
		</Tooltip>
	);
};

export default BtnGenerateUpscaleIcon;
