/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceUser from 'store/hooks/useSliceUser';
import { openModal } from 'store/storeSlices/sliceApp';
import { generationToolsKeys, announcementsKeys, modalsKeys } from 'store/common/keys';

import {
	GENERATION_CONTAINER_HEIGHT,
	GENERATION_CONTAINER_IMAGES_LIST_ITEM_SIZE,
} from 'constants/default';
import IAIContainerInPaint from 'components/InPaint/IAIContainerInPaint';
import ContainerGenerationImages from './ContainerGenerationImages/ContainerGenerationImages';

import ContainerGenerationLoading from './ContainerGenerationImages/ContainerGenerationLoading';
import InitialViewTextToImage from './InitialViewTextToImage';
import InitialViewImageTransform from './InitialViewImageTransform';
import InitialViewEnhance from '../EnhanceTool/InitialViewEnhance';
import EnhanceMain from '../EnhanceTool/EnhanceMain';

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { ANNOUNCEMENTS } = modalsKeys;

const GenerationContainer: React.FC = () => {
	const dispatch = useStoreDispatch();
	const {
		currentIsGenerationContainerHidden,
		currentGenerationTool,
		currentGeneration,
		currentInPaintImageUrl,
		currentInPaintImageBase64,
		currentInPaintImageIsNsfw,
		currentIsRequestingGeneration,
		currentActiveImageIndex,
		currentEnhanceSourceImage,
	} = useSliceOpenedProjects();
	const { settings } = useSliceUser();

	const inPaintImage = currentInPaintImageUrl || currentInPaintImageBase64;
	const enhanceSourceImage =
		currentEnhanceSourceImage.imageBase64 || currentEnhanceSourceImage.imageUrl;

	useEffect(() => {
		// show announcement modal for the current generation tool
		if (settings.announcements[currentGenerationTool as keyof typeof announcementsKeys]) {
			dispatch(
				openModal({
					type: ANNOUNCEMENTS,
					data: { type: currentGenerationTool as keyof typeof announcementsKeys },
				}),
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentGenerationTool]);

	const conditionalGridItem = () => {
		if (currentIsRequestingGeneration) {
			return (
				<Grid item xs={6} sx={{ height: `${GENERATION_CONTAINER_HEIGHT}px` }}>
					<ContainerGenerationLoading />
				</Grid>
			);
		}

		if (currentGeneration && !currentIsGenerationContainerHidden) {
			return (
				<Grid item xs={6} sx={{ height: `${GENERATION_CONTAINER_HEIGHT}px` }}>
					<ContainerGenerationImages
						currentGeneration={currentGeneration}
						currentActiveImageIndex={currentActiveImageIndex}
						currentGenerationTool={currentGenerationTool}
					/>
				</Grid>
			);
		}

		return null;
	};

	const conditionalContent = () => {
		switch (currentGenerationTool) {
			case TEXT_TO_IMAGE:
				if (currentIsRequestingGeneration) {
					return (
						<Box
							sx={{
								height: `calc(100% - ${GENERATION_CONTAINER_IMAGES_LIST_ITEM_SIZE + 8}px)`,
								minHeight: `${GENERATION_CONTAINER_HEIGHT - 8}px`,
							}}
						>
							<ContainerGenerationLoading />
						</Box>
					);
				}

				if (currentIsGenerationContainerHidden) {
					return <InitialViewTextToImage />;
				}

				if (currentGeneration) {
					return (
						<Box
							sx={{
								height: `calc(100% - ${GENERATION_CONTAINER_IMAGES_LIST_ITEM_SIZE + 8}px)`,
								minHeight: `${GENERATION_CONTAINER_HEIGHT - 8}px`,
							}}
						>
							<ContainerGenerationImages
								currentGeneration={currentGeneration}
								currentActiveImageIndex={currentActiveImageIndex}
								currentGenerationTool={currentGenerationTool}
							/>
						</Box>
					);
				}

				return <InitialViewTextToImage />;

			case IMAGE_TO_IMAGE:
				if (!currentGeneration && !inPaintImage) {
					return <InitialViewImageTransform />;
				}

				return (
					<Grid container spacing={1} justifyContent="center">
						<Grid item xs={6} sx={{ height: `${GENERATION_CONTAINER_HEIGHT}px` }}>
							<IAIContainerInPaint
								inPaintImage={inPaintImage}
								isImageNsfw={currentInPaintImageIsNsfw}
							/>
						</Grid>
						{conditionalGridItem()}
					</Grid>
				);

			case TOOL_ENHANCE:
				if (!currentGeneration && !enhanceSourceImage) {
					return <InitialViewEnhance />;
				}

				return <EnhanceMain />;

			default:
				return null;
		}
	};

	return <Box sx={{ height: '100%' }}>{conditionalContent()}</Box>;
};

export default GenerationContainer;
