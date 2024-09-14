/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { Generation } from 'store/types/typesPrompts';
import { setActiveImageIndex } from 'store/storeSlices/sliceOpenedProjects';
import { generationToolsKeys } from 'store/common/keys';

import { CANVAS_HEIGHT } from 'constants/default';
import StyledContainerGeneration from 'components/StyledWrappers/StyledContainerGeneration';

import GenerationItem from '../GenerationItem';
import ImagesList from './ImagesList';

const { TEXT_TO_IMAGE } = generationToolsKeys;

type Props = {
	currentGeneration: Generation;
	currentActiveImageIndex: number;
	currentGenerationTool: keyof typeof generationToolsKeys;
};

const ListView: React.FC<Props> = ({
	currentGeneration,
	currentActiveImageIndex,
	currentGenerationTool,
}) => {
	const dispatch = useStoreDispatch();

	const { images } = currentGeneration;
	const currentImage = images[currentActiveImageIndex];

	const onClickPrevious = () => {
		if (currentActiveImageIndex === 0) {
			dispatch(setActiveImageIndex(images.length - 1));
		} else {
			dispatch(setActiveImageIndex(currentActiveImageIndex - 1));
		}
	};

	const onClickNext = () => {
		if (currentActiveImageIndex === images.length - 1) {
			dispatch(setActiveImageIndex(0));
		} else {
			dispatch(setActiveImageIndex(currentActiveImageIndex + 1));
		}
	};

	const onClickImage = (index: number) => {
		dispatch(setActiveImageIndex(index));
	};

	const conditionalGenerationItemContent = () => {
		if (currentGenerationTool === TEXT_TO_IMAGE) {
			return (
				<Box sx={{ height: '100%', alignContent: 'center' }}>
					<Box
						sx={{
							height: `${CANVAS_HEIGHT}px`,
						}}
					>
						{currentImage && (
							<GenerationItem
								currentGeneration={currentGeneration}
								currentImage={currentImage}
							/>
						)}
					</Box>
				</Box>
			);
		}

		return (
			<Box
				sx={{
					height: `${CANVAS_HEIGHT}px`,
				}}
			>
				{currentImage && (
					<GenerationItem
						currentGeneration={currentGeneration}
						currentImage={currentImage}
					/>
				)}
			</Box>
		);
	};

	return (
		<StyledContainerGeneration hasPadding>
			{conditionalGenerationItemContent()}

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<ImagesList
					images={images}
					currentImageIndex={currentActiveImageIndex}
					onClickPrevious={onClickPrevious}
					onClickNext={onClickNext}
					onClickImage={onClickImage}
				/>
			</Box>
		</StyledContainerGeneration>
	);
};

export default ListView;
