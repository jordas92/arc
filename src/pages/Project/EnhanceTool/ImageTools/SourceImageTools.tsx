/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Typography } from '@mui/material';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import StyledInfoContainer from 'components/StyledWrappers/StyledInfoContainer';
import BtnMore from './BtnMore';

type Props = {
	sourceImageWidth: number;
	sourceImageHeight: number;
};

const SourceImageTools: React.FC<Props> = ({ sourceImageWidth, sourceImageHeight }) => {
	const { currentIsGenerationContainerHidden, currentGeneration } = useSliceOpenedProjects();

	return (
		<>
			<StyledInfoContainer dark padding="4px 6px" borderRadius="55px">
				<Typography variant="h6">{`${sourceImageWidth}x${sourceImageHeight}px`}</Typography>
			</StyledInfoContainer>
			{(currentIsGenerationContainerHidden || !currentGeneration) && (
				<BtnMore tooltipPlacement="bottom" hasBackground />
			)}
		</>
	);
};

export default SourceImageTools;
