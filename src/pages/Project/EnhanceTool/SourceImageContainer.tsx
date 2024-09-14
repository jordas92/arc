/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box } from '@mui/material';

import SourceImageTools from './ImageTools/SourceImageTools';

type Props = {
	containerWidth: number;
	containerHeight: number;
	sourceImageWidth: number;
	sourceImageHeight: number;
	sourceImage: string; // 'url' or 'base64'
	isGenerating: boolean;
};

const SourceImageContainer: React.FC<Props> = ({
	containerWidth,
	containerHeight,
	sourceImageWidth,
	sourceImageHeight,
	sourceImage,
	isGenerating,
}) => {
	const Image = styled('img')({
		width: `${containerWidth}px`,
		height: `${containerHeight}px`,
	});

	const conditionalOverlay = () => {
		if (isGenerating) {
			return (
				<Box
					sx={{
						position: 'absolute',
						width: '100%',
						height: `${containerHeight}px`,
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: '1',
					}}
				/>
			);
		}

		return null;
	};

	return (
		<Box sx={{ height: `${containerHeight}px` }}>
			<Box
				sx={{
					position: 'sticky',
					top: '6px',
					zIndex: '1',
					padding: ' 0 6px',
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'flex-start',
					height: '0',
				}}
			>
				<SourceImageTools
					sourceImageWidth={sourceImageWidth}
					sourceImageHeight={sourceImageHeight}
				/>
			</Box>

			<Box
				sx={{
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: `${containerWidth}px`,
					height: `${containerHeight}px`,
				}}
			>
				<Image alt="Source image" src={sourceImage} />
				{conditionalOverlay()}
			</Box>
		</Box>
	);
};

export default SourceImageContainer;
