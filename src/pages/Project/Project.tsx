/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceApp from 'store/hooks/useSliceApp';
import useSliceUser from 'store/hooks/useSliceUser';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import {
	closeModal,
	openModal,
	setIsOverlayLoaderOn,
	setLastOpenedProject,
} from 'store/storeSlices/sliceApp';
import { closeDrawer } from 'store/storeSlices/sliceOpenedProjects';
import { resetImagesSlice } from 'store/storeSlices/sliceImages';
import {
	closeControlNetDrawer,
	resetControlNetGenerationData,
} from 'store/storeSlices/sliceControlNet';
import { generationToolsKeys, modalsKeys } from 'store/common/keys';

import { browserTabTitle } from 'constants/default';
import useFetchDataForProjectPage from 'hooks/useFetchDataForProjectPage';
import RightSidebarLayout from 'components/Layouts/RightSidebarLayout';
import DrawerImages from 'components/Sidebars/DrawerImages/DrawerImages';
import GenerationMain from './GenerationMain/GenerationMain';

const { BROWSER_TAB_PROJECT } = browserTabTitle;
const { DETAIL_MODAL } = modalsKeys;
const { TEXT_TO_IMAGE } = generationToolsKeys;

const Project: React.FC = () => {
	const dispatch = useStoreDispatch();

	const { lastOpenedProject } = useSliceApp();
	const { settings } = useSliceUser();
	const { currentProjectId, currentModel, currentGenerationTool } = useSliceOpenedProjects();

	const { isLoading, isSuccess } = useFetchDataForProjectPage();

	useEffect(() => {
		if (currentGenerationTool === TEXT_TO_IMAGE && !settings.announcements.TEXT_TO_IMAGE) {
			const { projectId, isOpened } = lastOpenedProject;
			if (projectId === 'empty' && !isOpened) {
				dispatch(
					openModal({
						type: DETAIL_MODAL,
						data: { model: currentModel, modelKey: currentModel },
					}),
				);
				dispatch(setLastOpenedProject({ projectId: currentProjectId, isOpened: true }));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentGenerationTool]);

	useEffect(() => {
		if (isLoading) {
			dispatch(setIsOverlayLoaderOn(true));
		} else {
			dispatch(setIsOverlayLoaderOn(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	useEffect(() => {
		return () => {
			dispatch(closeModal());
			dispatch(closeDrawer());
			dispatch(closeControlNetDrawer());
			dispatch(resetImagesSlice());
			dispatch(resetControlNetGenerationData());
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const conditionalContent = () => {
		if (isSuccess && currentProjectId) {
			// Removing all url query params (in our case only '?skipFetchProjectPrompts')
			window.history.replaceState({}, document.title, window.location.pathname);

			return (
				<Box>
					<Grid container>
						<Grid item xs>
							<GenerationMain />
						</Grid>
						<Grid item>
							<RightSidebarLayout />
						</Grid>
					</Grid>
					<DrawerImages />
				</Box>
			);
		}

		return null;
	};

	return (
		<>
			<Helmet>
				<title>{BROWSER_TAB_PROJECT}</title>
			</Helmet>
			{conditionalContent()}
		</>
	);
};

export default Project;
