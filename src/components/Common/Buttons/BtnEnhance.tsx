/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Tooltip, Box, Button, useTheme } from '@mui/material';

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
	setGenerationToolEnhanceSettings,
	setEnhanceSourceImageData,
	setOpenedProject,
	setDefaultSamplers,
} from 'store/storeSlices/sliceOpenedProjects';
import { generationToolsKeys, previewModalOriginKeys } from 'store/common/keys';
import { GenerationData, EnhanceGenerationData } from 'store/types/typesCommon';
import commonUtils from 'store/common/utils';

import { ReactComponent as IconEnhance } from 'assets/img/icons/enhance.svg';
import strings from 'constants/strings';
import routesPaths from 'routes/paths';
import useImageDimensions from '../../../hooks/useImageDimensions';
import { validateImageSource } from '../../../utils/commonUtils';
import { showNotification } from '../../../store/storeSlices/sliceNotification';

type Props = {
	imageId: string;
	imageUrl: string;
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
	ORIGIN_PROJECT_CONTAINER_GENERATION,
} = previewModalOriginKeys;

const { disabledNSFW, enhance, generating } = strings;
const { TOOL_ENHANCE } = generationToolsKeys;
const { PROJECT } = routesPaths;
const { handleDataForGenerationToolStore } = commonUtils;

// Based on the Modal 'origin' the button has different behavior
const BtnEnhance: React.FC<Props> = ({
	imageId,
	imageUrl,
	isImageNsfw,
	generationData,
	origin,
}) => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const { isNsfwEnabled } = useSliceUser();
	const { isRequestingGenerationEnhance } = useSliceOpenedProjects();
	const sliceSamplers = useSliceSamplers();
	const { width, height } = useImageDimensions(imageUrl);

	const handledData = handleDataForGenerationToolStore(TOOL_ENHANCE, generationData);

	const [
		createProject,
		{ isError: isErrorCreateProject, isSuccess: isSuccessCreateProject, data: newProjectId },
	] = useCreateProjectMutation();

	const enhanceSourceImage = {
		imageBase64: '',
		imageId,
		imageUrl,
		imageWidth: generationData.imageWidth,
		imageHeight: generationData.imageHeight,
	};

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
					currentGenerationTool: TOOL_ENHANCE,
				}),
			);

			navigate(path);
			dispatch(closeModal());
			dispatch(setDefaultSamplers(sliceSamplers));
			dispatch(setGenerationToolEnhanceSettings(handledData as EnhanceGenerationData));
			dispatch(setEnhanceSourceImageData(enhanceSourceImage));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccessCreateProject]);

	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();

		switch (origin) {
			case ORIGIN_HOMEPAGE_TAB_LIBRARY_ALL:
			case ORIGIN_HOMEPAGE_TAB_LIBRARY_FAVORITES:
			case ORIGIN_HOMEPAGE_TAB_LIBRARY_DISCORD:
			case ORIGIN_HOMEPAGE_TAB_DISCOVER:
				{
					const { isLimitExceeded, message } = validateImageSource(width, height);

					if (isLimitExceeded) {
						dispatch(
							showNotification({
								message,
								severity: 'warning',
							}),
						);
					} else {
						dispatch(setIsOverlayLoaderOn(true));
						createProject();
					}
				}
				break;

			case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
			case ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD:
			case ORIGIN_PROJECT_DRAWER_HISTORY:
			case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
			case ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT:
			case ORIGIN_PROJECT_CONTAINER_GENERATION:
				{
					const { isLimitExceeded, message } = validateImageSource(width, height);

					if (isLimitExceeded) {
						dispatch(
							showNotification({
								message,
								severity: 'warning',
							}),
						);
					} else {
						dispatch(closeDrawer());
						dispatch(closeModal());
						dispatch(setGenerationTool(TOOL_ENHANCE));
						dispatch(setIsGenerationContainerHidden(true));
						dispatch(
							setGenerationToolEnhanceSettings(handledData as EnhanceGenerationData),
						);
						dispatch(setEnhanceSourceImageData(enhanceSourceImage));
					}
				}
				break;

			default:
				break;
		}
	};

	const isButtonDisabled =
		(isImageNsfw && isNsfwEnabled) ||
		(isRequestingGenerationEnhance && origin.includes('ORIGIN_PROJECT'));

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		if (isRequestingGenerationEnhance && origin.includes('ORIGIN_PROJECT')) {
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
					disabled={isButtonDisabled}
					sx={{
						marginLeft: '12px',
						paddingLeft: '12px',
						height: '42px',

						svg: {
							path: {
								fill: theme.palette.text.hover,
							},
						},
					}}
				>
					<IconEnhance />
					<Box sx={{ marginLeft: '8px' }}>{enhance}</Box>
				</Button>
			</Box>
		</Tooltip>
	);
};

export default BtnEnhance;
