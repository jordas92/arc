/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import useSliceUser from 'store/hooks/useSliceUser';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import strings from 'constants/strings';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/default';
import ImageIsNSFW from 'components/Common/ImageIsNSFW';
import StyledContainerGenerationInPaint from 'components/StyledWrappers/StyledContainerGenerationInPaint';
import IAIDenoiserSlider from 'components/InPaint/IAIDenoiserSlider';
import IAICanvas from 'components/InPaint/IAICanvas';
import DraggableItem from 'components/Common/DND/DraggableItem';
import IAIBtnOpenInPaintMode from './IAIBtnOpenInPaintMode';
import IAIInPaintTools from './IAIInPaintTools';

type Props = {
	inPaintImage: string;
	isImageNsfw: boolean;
};

const { altGenerationImage } = strings;

const IAIContainerInPaint: React.FC<Props> = ({ inPaintImage, isImageNsfw }) => {
	const theme = useTheme();
	const { isNsfwEnabled } = useSliceUser();
	const [isBrushSizeSliderOpen, setBrushSizeSliderOpen] = useState<boolean>(false);

	const { currentIsInPaintMode } = useSliceOpenedProjects();

	const onChangeClose = () => {
		setBrushSizeSliderOpen(false);
	};

	const closeSizeSlider = () => {
		setBrushSizeSliderOpen(false);
	};

	const conditionalContent = () => {
		if (isImageNsfw && isNsfwEnabled) {
			return (
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						height: CANVAS_HEIGHT,
						borderRadius: '4px',
						backgroundColor: theme.palette.background.surfaceLow,
					}}
				>
					<ImageIsNSFW />
				</Box>
			);
		}

		if (currentIsInPaintMode) {
			return (
				<>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<IAICanvas closeSizeSlider={closeSizeSlider} />
					</Box>

					<Box sx={{ textAlign: 'center', height: '81px' }}>
						<IAIInPaintTools
							setBrushSizeSliderOpen={setBrushSizeSliderOpen}
							onChangeClose={onChangeClose}
							isBrushSizeSliderOpen={isBrushSizeSliderOpen}
						/>
						<IAIDenoiserSlider
							onChangeClose={onChangeClose}
							isInPaintMode={currentIsInPaintMode}
						/>
					</Box>
				</>
			);
		}

		return (
			<>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						height: '100%',
					}}
				>
					<DraggableItem
						imageTitle={altGenerationImage}
						imageUrl={inPaintImage}
						dragStyle={{
							boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.5)',
							border: '2px solid #DE04A4',
						}}
					>
						<Box
							component="img"
							sx={{
								maxWidth: `${CANVAS_WIDTH}px`,
								maxHeight: `${CANVAS_HEIGHT}px`,
							}}
							alt={altGenerationImage}
							src={inPaintImage}
						/>
					</DraggableItem>
				</Box>

				<Box sx={{ textAlign: 'center' }}>
					<IAIBtnOpenInPaintMode />
					<IAIDenoiserSlider />
				</Box>
			</>
		);
	};

	return (
		<StyledContainerGenerationInPaint hasPadding>
			{inPaintImage && conditionalContent()}
		</StyledContainerGenerationInPaint>
	);
};

export default IAIContainerInPaint;
