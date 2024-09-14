/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceSamplers from 'store/hooks/useSliceSamplers';
import { useCreateProjectMutation } from 'store/apis/apiProjects';
import { setIsOverlayLoaderOn, setLastOpenedProject } from 'store/storeSlices/sliceApp';
import { setOpenedProject, setDefaultSamplers } from 'store/storeSlices/sliceOpenedProjects';
import { generationToolsKeys } from 'store/common/keys';

import strings from 'constants/strings';
import routesPaths from 'routes/paths';

const { createNewProject } = strings;
const { TEXT_TO_IMAGE } = generationToolsKeys;
const { PROJECT } = routesPaths;

const BtnCreateProject: React.FC = () => {
	const dispatch = useStoreDispatch();
	const navigate = useNavigate();
	const sliceSamplers = useSliceSamplers();
	const [createProject, { isSuccess, data: newProjectId }] = useCreateProjectMutation();

	useEffect(() => {
		if (isSuccess && newProjectId) {
			const path = generatePath(PROJECT, { id: newProjectId });

			dispatch(
				setOpenedProject({
					projectId: newProjectId,
					projectTitle: '',
					isDiscord: false,
					currentGenerationTool: TEXT_TO_IMAGE,
				}),
			);

			navigate(path);
			dispatch(setIsOverlayLoaderOn(false));
			dispatch(setDefaultSamplers(sliceSamplers));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	const handleOnClick = () => {
		dispatch(setIsOverlayLoaderOn(true));
		dispatch(setLastOpenedProject({ projectId: 'empty', isOpened: false }));
		createProject();
	};

	return (
		<Button variant="arcanaMagic" onClick={handleOnClick}>
			{createNewProject}
		</Button>
	);
};

export default BtnCreateProject;
