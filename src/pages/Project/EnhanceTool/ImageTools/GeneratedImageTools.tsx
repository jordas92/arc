/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceEnhanceModels from 'store/hooks/useSliceEnhanceModels';
import { Generation, GenerationImage } from 'store/types/typesPrompts';
import { GenerationData } from 'store/types/typesCommon';
import { previewModalOriginKeys } from 'store/common/keys';

import strings from 'constants/strings';
import useImageDimensions from 'hooks/useImageDimensions';
import StyledInfoContainer from 'components/StyledWrappers/StyledInfoContainer';
import BtnOpenImagePreviewIcon from 'components/Common/Buttons/BtnOpenImagePreviewIcon';
import BtnDownloadImageIcon from 'components/Common/Buttons/BtnDownloadImageIcon';
import BtnToggleIsFavoriteIcon from 'components/Common/Buttons/BtnToggleIsFavoriteIcon';
import BtnShareIcon from 'components/Common/Buttons/BtnShareIcon';
import BtnMore from './BtnMore';
import BtnInfo from './BtnInfo';
import TooltipInfo from './TooltipInfo';

type Props = {
	currentGeneration: Generation;
	sourceImageWidth: number;
	sourceImageHeight: number;
};

const { creativity } = strings;
const { ORIGIN_PROJECT_CONTAINER_GENERATION } = previewModalOriginKeys;

const GeneratedImageTools: React.FC<Props> = ({
	currentGeneration,
	sourceImageWidth,
	sourceImageHeight,
}) => {
	const { generationData, images } = currentGeneration;
	const { imageId, imageUrl, isFavorite } = images[0];
	const { projectId, type, transformation, prompt, sharpness, model, styles } = generationData;

	const { currentProjectTitle } = useSliceOpenedProjects();
	const { width, height } = useImageDimensions(imageUrl);

	const enhanceModels = useSliceEnhanceModels();
	const [enhanceModelName, setEnhanceModelName] = useState<string>('');

	useEffect(() => {
		const currentEnhanceModel = enhanceModels.find((element) => element.key === model);

		if (currentEnhanceModel) {
			setEnhanceModelName(currentEnhanceModel.value);
		}
	}, [enhanceModels, model]);

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

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<StyledInfoContainer dark padding="4px 6px" borderRadius="55px">
				<Typography variant="h6">{`${width}x${height}px`}</Typography>
			</StyledInfoContainer>

			<StyledInfoContainer
				dark
				padding="4px 6px"
				borderRadius="55px"
				sx={{ marginLeft: '2px' }}
			>
				<Typography variant="h6">{`${creativity} ${transformation}`}</Typography>
			</StyledInfoContainer>

			<BtnInfo
				tooltip={
					<TooltipInfo
						prompt={prompt}
						sourceImageWidth={sourceImageWidth}
						sourceImageHeight={sourceImageHeight}
						sharpnessValue={sharpness}
						enhanceModelName={enhanceModelName}
						styles={styles}
					/>
				}
			/>

			<BtnToggleIsFavoriteIcon
				isFavorite={isFavorite}
				argsImageMutation={{
					imageId,
					imagePage: 'foo',
					projectId,
					type,
					origin: ORIGIN_PROJECT_CONTAINER_GENERATION,
				}}
				tooltipPlacement="bottom"
				hasBackground
			/>
			<BtnDownloadImageIcon
				imageUrl={imageUrl}
				currentProjectTitle={currentProjectTitle}
				tooltipPlacement="bottom"
				hasBackground
			/>
			<BtnShareIcon imageUrl={imageUrl} tooltipPlacement="bottom" hasBackground />
			<BtnOpenImagePreviewIcon
				imageId={imageId}
				images={addGenerationDataToEachItem(images, generationData)}
				tooltipPlacement="bottom"
				hasBackground
			/>
			<BtnMore
				tooltipPlacement="bottom"
				hasBackground
				generatedImage={{ imageId, imageUrl, width, height }}
			/>
		</Box>
	);
};

export default GeneratedImageTools;
