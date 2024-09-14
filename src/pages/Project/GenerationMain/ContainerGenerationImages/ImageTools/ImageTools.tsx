/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { generationToolsKeys, previewModalOriginKeys } from 'store/common/keys';
import { ArgsImageMutation } from 'store/types/typesImages';
import { GenerationImage } from 'store/types/typesPrompts';
import { GenerationData } from 'store/types/typesCommon';

import { VARIATION_DISPLAYED } from 'constants/default';
import BtnGenerateUpscaleIcon from 'components/Common/Buttons/BtnGenerateUpscaleIcon';
import BtnDownloadImageIcon from 'components/Common/Buttons/BtnDownloadImageIcon';
import BtnShareIcon from 'components/Common/Buttons/BtnShareIcon';
import BtnToggleIsFavoriteIcon from 'components/Common/Buttons/BtnToggleIsFavoriteIcon';
import BtnEnhanceIcon from 'components/Common/Buttons/BtnEnhanceIcon';
import BtnUseAsSource from './BtnUseAsSource';
import BtnGenerateVariations from './BtnGenerateVariations';
import BtnEditImage from './BtnEditImage';

type Props = {
	currentImage: GenerationImage;
	generationData: GenerationData;
};

const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE } = generationToolsKeys;
const { ORIGIN_PROJECT_CONTAINER_GENERATION } = previewModalOriginKeys;

const ImageTools: React.FC<Props> = ({ currentImage, generationData }) => {
	const { currentGenerationTool, currentProjectTitle } = useSliceOpenedProjects();

	const { imageId, imageUrl, isFavorite, isImageNsfw } = currentImage;
	const { projectId, type, imageWidth, imageHeight } = generationData;

	const argsImageMutation: ArgsImageMutation = {
		imageId,
		imagePage: 'foo',
		projectId,
		type,
		origin: ORIGIN_PROJECT_CONTAINER_GENERATION,
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
				justifyContent: 'space-between',
				padding: '12px',
			}}
		>
			<Box sx={{ height: '30px' }} />
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<BtnToggleIsFavoriteIcon
					isFavorite={isFavorite}
					argsImageMutation={argsImageMutation}
					hasBackground
				/>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				{currentGenerationTool === IMAGE_TO_IMAGE && (
					<BtnUseAsSource
						currentImage={currentImage}
						imageWidth={imageWidth}
						imageHeight={imageHeight}
					/>
				)}
				{VARIATION_DISPLAYED && <BtnGenerateVariations imageId={imageId} />}
				<BtnGenerateUpscaleIcon
					imageId={imageId}
					imageUrl={imageUrl}
					isImageNsfw={isImageNsfw}
					generationData={generationData}
					origin={ORIGIN_PROJECT_CONTAINER_GENERATION}
					hasBackground
				/>
				{currentGenerationTool === TEXT_TO_IMAGE && (
					<BtnEditImage
						imageId={imageId}
						imageUrl={imageUrl}
						isImageNsfw={isImageNsfw}
						generationData={generationData}
						hasBackground
					/>
				)}
				<BtnEnhanceIcon
					imageId={imageId}
					imageUrl={imageUrl}
					isImageNsfw={isImageNsfw}
					generationData={generationData}
					hasBackground
					projectId={projectId}
				/>
				<BtnDownloadImageIcon
					imageUrl={imageUrl}
					currentProjectTitle={currentProjectTitle}
					hasBackground
				/>
				<BtnShareIcon imageUrl={imageUrl} hasBackground />
			</Box>
		</Box>
	);
};

export default ImageTools;
