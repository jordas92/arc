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
	setGenerationToolTextToImageSettings,
	setOpenedProject,
	setDefaultSamplers,
} from 'store/storeSlices/sliceOpenedProjects';
import { generationToolsKeys, generationTypes, previewModalOriginKeys } from 'store/common/keys';
import { GenerationData, TextToImageGenerationData } from 'store/types/typesCommon';
import commonUtils from 'store/common/utils';

import { ReactComponent as RefreshIcon } from 'assets/img/icons/refresh.svg';
import strings from 'constants/strings';
import routesPaths from 'routes/paths';

type Props = {
	isImageNsfw: boolean;
	generationData: GenerationData;
	origin: keyof typeof previewModalOriginKeys;
};

const { handleDataForGenerationToolStore } = commonUtils;

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

const { disabledNSFW, conjure, reconjure, generating, reconjureDisabledTooltip } = strings;
const { TEXT_TO_IMAGE } = generationToolsKeys;
const { PROJECT } = routesPaths;
const { CONJURE } = generationTypes;

// Based on the Modal 'origin' the button has different behavior
const BtnConjure: React.FC<Props> = ({ isImageNsfw, generationData, origin }) => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();
	const { isNsfwEnabled } = useSliceUser();
	const { isRequestingGenerationTextToImage } = useSliceOpenedProjects();
	const sliceSamplers = useSliceSamplers();

	const handledData = handleDataForGenerationToolStore(TEXT_TO_IMAGE, generationData);

	const [
		createProject,
		{ isError: isErrorCreateProject, isSuccess: isSuccessCreateProject, data: newProjectId },
	] = useCreateProjectMutation();

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
					currentGenerationTool: TEXT_TO_IMAGE,
				}),
			);

			navigate(path);
			dispatch(closeModal());
			dispatch(setDefaultSamplers(sliceSamplers));
			dispatch(
				setGenerationToolTextToImageSettings(handledData as TextToImageGenerationData),
			);
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
				dispatch(setIsOverlayLoaderOn(true));
				createProject();
				break;

			case ORIGIN_PROJECT_DRAWER_LIBRARY_ALL:
			case ORIGIN_PROJECT_DRAWER_LIBRARY_DISCORD:
			case ORIGIN_PROJECT_DRAWER_HISTORY:
			case ORIGIN_PROJECT_DRAWER_FAVORITES_ALL:
			case ORIGIN_PROJECT_DRAWER_FAVORITES_BY_PROJECT:
			case ORIGIN_PROJECT_MODEL_DETAILED:
			case ORIGIN_PROJECT_CONTAINER_GENERATION: {
				dispatch(closeDrawer());
				dispatch(closeModal());
				dispatch(setGenerationTool(TEXT_TO_IMAGE));
				dispatch(setIsGenerationContainerHidden(true));
				dispatch(
					setGenerationToolTextToImageSettings(handledData as TextToImageGenerationData),
				);
				break;
			}
			default:
				break;
		}
	};

	const isReconjure = origin !== ORIGIN_PROJECT_MODEL_DETAILED;
	const isReconjureDisabled = isReconjure && generationData.type !== CONJURE;
	const isDisabled =
		(isImageNsfw && isNsfwEnabled) ||
		(isRequestingGenerationTextToImage && origin.includes('ORIGIN_PROJECT')) ||
		isReconjureDisabled;

	const conditionalTooltip = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return disabledNSFW;
		}

		if (isRequestingGenerationTextToImage && origin.includes('ORIGIN_PROJECT')) {
			return generating;
		}

		if (isReconjureDisabled) {
			return reconjureDisabledTooltip;
		}

		return '';
	};

	const conditionalContent = () => {
		if (isReconjure) {
			return (
				<>
					<RefreshIcon width={16} height={16} style={{ marginRight: '8px' }} />
					{reconjure}
				</>
			);
		}

		return conjure;
	};

	return (
		<Tooltip title={conditionalTooltip()} placement="top" arrow>
			<Box>
				<Button
					variant="arcanaMagic"
					onClick={handleOnClick}
					disabled={isDisabled}
					sx={{
						margin: '0 12px',
						height: '42px',
						...(isReconjure && {
							':disabled': {
								svg: {
									path: {
										fill: 'transparent',
									},
								},
							},
						}),
					}}
				>
					{conditionalContent()}
				</Button>
			</Box>
		</Tooltip>
	);
};

export default BtnConjure;
