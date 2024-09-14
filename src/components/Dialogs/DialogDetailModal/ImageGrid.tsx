/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { styled, useMediaQuery } from '@mui/system';
import { Box, Grid, Skeleton } from '@mui/material';

import { generationToolsKeys } from 'store/common/keys';
import { ModelMeta, ModelMetaImage } from 'store/types/typesModels';
import { AspectRatio } from 'store/types/typesAspectRatios';
import { GenerationData } from 'store/types/typesCommon';

import BtnConjure from '../../Common/Buttons/BtnConjure';
import BtnTransform from '../../Common/Buttons/BtnTransform';
import useSliceAspectRatios from '../../../store/hooks/useSliceAspectRatios';
import { previewModalOriginKeys, generationTypes } from '../../../store/common/keys';
import useSliceOpenedProjects from '../../../store/hooks/useSliceOpenedProjects';
import { DEFAULT_TRANSFORMATION_VALUE, DEFAULT_SHARPNESS_VALUE } from '../../../constants/default';
import useSliceSamplers from '../../../store/hooks/useSliceSamplers';

export const SPECIAL_MODEL_SUFFIX = 'sdxl';

type generationTypesKeys = keyof typeof generationTypes;

interface StyledGridProps {
	isLargeScreen: boolean;
}

interface StyledImageBoxProps {
	image: string;
}

const StyledGrid = styled(Box)<StyledGridProps>(({ isLargeScreen }) => ({
	display: 'grid',
	gridTemplateColumns: isLargeScreen ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
	gridGap: '16px',
	maxWidth: '1200px',
	marginTop: '40px',
}));

const StyledGridItem = styled(Box)<StyledImageBoxProps>(({ image }) => ({
	position: 'relative',
	width: '100%',
	height: '171px',
	backgroundImage: `url(${image})`,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	borderRadius: '4px',
	transition: 'background-color 0.3s ease',
	'&:hover': {
		backgroundColor: 'rgba(0, 0, 0, 0.68)',
		'& > div': {
			opacity: 1,
		},
	},
}));

const InlineButtonsContainer = styled(Box)({
	position: 'absolute',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	bottom: '16px',
	width: '100%',
	zIndex: 1,
});

const Overlay = styled(Box)({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	backgroundColor: 'rgba(0, 0, 0, 0.68)',
	borderRadius: '4px',
	zIndex: 0, // Ensure overlay is behind the Buttons
	opacity: 0,
	transition: 'opacity 0.1s ease',
	'&:hover': {
		opacity: 1,
	},
});

// TODO CREATE skeleton wrappers for components in common folders
const SkeletonGrid = ({ isLargeScreen }) => {
	return (
		<StyledGrid isLargeScreen={isLargeScreen}>
			{[...Array(12)].map((item, index) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
					<Skeleton variant="rectangular" width="100%" height="171px" />
				</Grid>
			))}
		</StyledGrid>
	);
};

const { ORIGIN_PROJECT_MODEL_DETAILED } = previewModalOriginKeys;
const { CONJURE, TRANSFORM } = generationTypes;
const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE } = generationToolsKeys;

interface ImageGridProps {
	isSuccess: boolean;
	modelDetail: ModelMeta;
}

const ImageGrid = ({ isSuccess, modelDetail }: ImageGridProps) => {
	const { currentProjectId, currentImageWidth, currentImageHeight, currentCfg, currentClipSkip } =
		useSliceOpenedProjects();
	const sliceSamplers = useSliceSamplers();
	const aspectRatios = useSliceAspectRatios();

	const isLargeScreen = useMediaQuery('(min-width: 1064px)');
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const { images, key, processor } = modelDetail;
	const handleMouseEnter = (index: number) => {
		setHoveredIndex(index);
	};

	const handleMouseLeave = () => {
		setHoveredIndex(null);
	};

	if (!isSuccess) {
		return <SkeletonGrid isLargeScreen={isLargeScreen} />;
	}

	const getPredefinedImageWidthAndHeight = (ratioKey: string, isAspectRatioPortrait: boolean) => {
		let imageWidth = currentImageWidth;
		let imageHeight = currentImageHeight;

		const arOptions: Array<AspectRatio> = isAspectRatioPortrait
			? aspectRatios[processor].portrait
			: aspectRatios[processor].landscape;

		const ratio = arOptions.find((el: AspectRatio) => el.ar === ratioKey);

		if (ratio) {
			imageWidth = ratio.width;
			imageHeight = ratio.height;
		}

		return {
			imageWidth,
			imageHeight,
		};
	};

	const collectGenerationData = (
		modelMetaImage: ModelMetaImage,
		type: (typeof generationTypes)[generationTypesKeys],
	): GenerationData => {
		const { prompt, promptNegative, ratio, isAspectRatioPortrait, styles } = modelMetaImage;

		const { imageWidth, imageHeight } = getPredefinedImageWidthAndHeight(
			modelMetaImage.ratio,
			isAspectRatioPortrait,
		);

		return {
			projectId: currentProjectId,
			promptNegative,
			prompt,
			styles,
			ratio,
			type,
			model: key,
			promptId: '',
			imageWidth,
			imageHeight,
			cfg: currentCfg,
			clipSkip: currentClipSkip,
			sampler:
				type === CONJURE
					? sliceSamplers[TEXT_TO_IMAGE].default
					: sliceSamplers[IMAGE_TO_IMAGE].default,
			transformation: DEFAULT_TRANSFORMATION_VALUE,
			sourceImageUrl: '',
			sourceImageId: '',
			sharpness: DEFAULT_SHARPNESS_VALUE,
		};
	};

	return (
		<StyledGrid isLargeScreen={isLargeScreen}>
			{images.map((modelMetaImage: ModelMetaImage, index) => (
				<StyledGridItem
					key={index}
					image={modelMetaImage.url}
					onMouseEnter={() => handleMouseEnter(index)}
					onMouseLeave={handleMouseLeave}
				>
					{hoveredIndex === index && (
						<>
							<Overlay />
							<InlineButtonsContainer>
								<BtnConjure
									isImageNsfw={false}
									generationData={collectGenerationData(modelMetaImage, CONJURE)}
									origin={ORIGIN_PROJECT_MODEL_DETAILED}
								/>

								<BtnTransform
									imageId=""
									imageUrl={modelMetaImage.url}
									isImageNsfw={false}
									hasIcon={false}
									generationData={collectGenerationData(
										modelMetaImage,
										TRANSFORM,
									)}
									origin={ORIGIN_PROJECT_MODEL_DETAILED}
								/>
							</InlineButtonsContainer>
						</>
					)}
				</StyledGridItem>
			))}
		</StyledGrid>
	);
};

export default ImageGrid;
