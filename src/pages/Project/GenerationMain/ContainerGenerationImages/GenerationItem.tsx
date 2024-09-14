/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { Box, CardMedia, useTheme } from '@mui/material';

import useSliceUser from 'store/hooks/useSliceUser';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openModal } from 'store/storeSlices/sliceApp';
import { modalsKeys, previewModalOriginKeys } from 'store/common/keys';
import { Generation, GenerationImage } from 'store/types/typesPrompts';
import { GenerationData } from 'store/types/typesCommon';

import { GENERATION_CONTAINER_HEIGHT } from 'constants/default';
import strings from 'constants/strings';
import ImageIsNSFW from 'components/Common/ImageIsNSFW';
import ImageTools from './ImageTools/ImageTools';

type Props = {
	currentGeneration: Generation;
	currentImage: GenerationImage;
	gridItem?: boolean;
};

const { altGenerationImage } = strings;
const { IMAGE_PREVIEW } = modalsKeys;
const { ORIGIN_PROJECT_CONTAINER_GENERATION } = previewModalOriginKeys;

const GenerationItem: React.FC<Props> = ({ currentGeneration, currentImage, gridItem = false }) => {
	const theme = useTheme();
	const dispatch = useStoreDispatch();
	const { isNsfwEnabled } = useSliceUser();
	const [isItemHovered, setIsItemHovered] = useState<boolean>(false);

	const { images, generationData } = currentGeneration;
	const { imageId } = currentImage;

	// TODO_NEXT create generic util function
	const addGenerationDataToEachItem = (
		images: Array<GenerationImage>,
		generationData: GenerationData,
	) => {
		return images.map((item: GenerationImage) => {
			return {
				...item,
				generationData,
			};
		});
	};

	const handleOnClickImage = () => {
		dispatch(
			openModal({
				type: IMAGE_PREVIEW,
				data: {
					origin: ORIGIN_PROJECT_CONTAINER_GENERATION,
					imageId,
					items: addGenerationDataToEachItem(images, generationData),
				},
			}),
		);
	};

	const handleOnMouseEnter = () => {
		setIsItemHovered(true);
	};

	const handleOnMouseLeave = () => {
		setIsItemHovered(false);
	};

	const conditionalContent = () => {
		if (currentImage.isImageNsfw && isNsfwEnabled) {
			return (
				<Box
					sx={{
						borderRadius: '4px',
						backgroundColor: theme.palette.background.surfaceLow,
					}}
				>
					<ImageIsNSFW />
				</Box>
			);
		}

		const style = () => {
			if (gridItem) {
				return {
					objectFit: 'scale-down',
					minHeight: `${(GENERATION_CONTAINER_HEIGHT - 75) / 2}px`,
					maxHeight: '220px',
				};
			}
			return {
				objectFit: 'scale-down',
				minHeight: `${(GENERATION_CONTAINER_HEIGHT - 75) / 2}px`,
				maxHeight: '100%',
			};
		};

		return (
			<CardMedia
				sx={style()}
				component="img"
				src={currentImage.imageUrl}
				alt={altGenerationImage}
			/>
		);
	};

	return (
		<Box
			sx={{
				position: 'relative',
				display: 'flex',
				justifyContent: 'center',
				height: '100%',
			}}
			onMouseEnter={handleOnMouseEnter}
			onMouseLeave={handleOnMouseLeave}
		>
			{conditionalContent()}
			{isItemHovered && !(currentImage.isImageNsfw && isNsfwEnabled) && (
				<Box
					onClick={handleOnClickImage}
					sx={{
						position: 'absolute',
						height: '100%',
						width: '100%',
						minWidth: '220px',
						cursor: 'pointer',
						// THEME_NEXT
						backgroundImage:
							'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))',
					}}
				>
					<ImageTools currentImage={currentImage} generationData={generationData} />
				</Box>
			)}
		</Box>
	);
};

export default GenerationItem;
