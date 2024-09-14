/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { Box } from '@mui/material';

import StyledContainerGeneration from 'components/StyledWrappers/StyledContainerGeneration';
import IAIDenoiserSlider from 'components/InPaint/IAIDenoiserSlider';
import IAICanvas from 'components/InPaint/IAICanvas';
import IAIInPaintTools from './IAIInPaintTools';

type Props = {
	inPaintImage: string;
	isImageNsfw: boolean;
};

const IAIDialogContainerInPaint: React.FC<Props> = ({ inPaintImage, isImageNsfw }) => {
	const [isBrushSizeSliderOpen, setBrushSizeSliderOpen] = useState<boolean>(false);

	const onChangeClose = () => {
		setBrushSizeSliderOpen(false);
	};

	const closeSizeSlider = () => {
		setBrushSizeSliderOpen(false);
	};

	const conditionalContent = () => {
		return (
			<Box sx={{ textAlign: 'center' }}>
				<IAICanvas closeSizeSlider={closeSizeSlider} isModal />

				<Box sx={{ textAlign: 'center' }}>
					<IAIInPaintTools
						setBrushSizeSliderOpen={setBrushSizeSliderOpen}
						onChangeClose={onChangeClose}
						isBrushSizeSliderOpen={isBrushSizeSliderOpen}
						isModal
					/>
					<IAIDenoiserSlider onChangeClose={onChangeClose} />
				</Box>
			</Box>
		);
	};

	return (
		<StyledContainerGeneration hasPadding>
			{inPaintImage && conditionalContent()}
		</StyledContainerGeneration>
	);
};

export default IAIDialogContainerInPaint;
