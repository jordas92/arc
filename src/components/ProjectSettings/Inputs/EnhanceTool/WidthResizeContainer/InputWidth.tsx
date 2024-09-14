/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setEnhanceResizeStrength } from 'store/storeSlices/sliceOpenedProjects';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import { MIN_ASPECT_RATIO_LENGTH, ENHANCE_MAX_IMAGE_RESIZE } from 'constants/default';
import StyledSliderBasic from 'components/StyledWrappers/StyledSliderBasic';

const InputWidth: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceResizeStrength, currentEnhanceSourceImage } = useSliceOpenedProjects();

	const { imageWidth: sourceImageWidth, imageHeight: sourceImageHeight } =
		currentEnhanceSourceImage;

	const aspectRatio = sourceImageWidth / sourceImageHeight;

	const resizeWidthMaxValue = Math.floor(
		(ENHANCE_MAX_IMAGE_RESIZE * aspectRatio) / (1 + aspectRatio),
	);

	const handleOnChange = (value: number) => {
		dispatch(setEnhanceResizeStrength(value));
	};

	return (
		<Box sx={{ width: '95%', margin: '0 0 0 8px', height: '32px' }}>
			<StyledSliderBasic
				aria-label="Image Width Slider"
				defaultValue={0}
				value={currentEnhanceResizeStrength}
				min={MIN_ASPECT_RATIO_LENGTH}
				max={resizeWidthMaxValue}
				step={1}
				onChange={(_, value) => handleOnChange(value as number)}
			/>
		</Box>
	);
};

export default InputWidth;
