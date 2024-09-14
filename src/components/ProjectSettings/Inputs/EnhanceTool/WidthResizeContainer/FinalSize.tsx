/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Typography } from '@mui/material';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import strings from 'constants/strings';

const { finalSize } = strings;

const FinalSize: React.FC = () => {
	const {
		currentEnhanceScaleFactor: scaleFactor,
		currentEnhanceResizedWidth: resizedWidth,
		currentEnhanceResizedHeight: resizedHeight,
	} = useSliceOpenedProjects();

	const finalWidth = Math.floor(resizedWidth * scaleFactor);
	const finalHeight = Math.floor(resizedHeight * scaleFactor);
	const finalSizeInfo = `${finalSize}: ${finalWidth}x${finalHeight}px`;

	return (
		<Typography variant="h6" color="text.secondary">
			{finalSizeInfo}
		</Typography>
	);
};

export default FinalSize;
