/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, Slider, Typography, Fade } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Generation } from 'store/types/typesPrompts';

import strings from 'constants/strings';
import StyledInfoContainer from 'components/StyledWrappers/StyledInfoContainer';
import SourceImageTools from '../ImageTools/SourceImageTools';
import GeneratedImageTools from '../ImageTools/GeneratedImageTools';

type Props = {
	containerWidth: number;
	containerHeight: number;
	sourceImageWidth: number;
	sourceImageHeight: number;
	sourceImage: string; // 'url' or 'base64'
	currentGeneration: Generation;
};

type CustomProps = {
	containerHeight: number;
};

const { before, after } = strings;

const StyledSlider = styled(Slider, {
	shouldForwardProp: (prop: string) => !['containerHeight'].includes(prop),
})<CustomProps>(({ theme, containerHeight }) => ({
	position: 'absolute',
	cursor: 'col-resize',
	overflow: 'hidden',

	'&.MuiSlider-root': {
		padding: `${containerHeight / 2}px 0`,
		borderRadius: '0',
	},

	'.MuiSlider-rail': {
		height: '0',
	},

	'.MuiSlider-track': {
		height: '0',
		border: 'none',
	},

	'.MuiSlider-thumb': {
		height: '100%',
		width: '0.5px',
		borderRadius: '0',
		color: theme.palette.text.hover,
		'&:hover, &.Mui-focusVisible, &.Mui-active': { boxShadow: 'none' },
		fontSize: '24px',
		fontWeight: '100',
		zIndex: '2',
	},
}));

const SplitContainer: React.FC<Props> = ({
	containerWidth,
	containerHeight,
	sourceImageWidth,
	sourceImageHeight,
	sourceImage,
	currentGeneration,
}) => {
	const [sliderWidth, setSliderWidth] = useState<number>(containerWidth / 2);
	const [isToolsHidden, setIsToolsHidden] = useState<boolean>(false);

	const handleOnChange = (value: number) => {
		setSliderWidth(value);
	};

	const Image = styled('img')({
		marginTop: '6px',
		width: `${containerWidth}px`,
		height: `${containerHeight}px`,
	});

	const handleMouseDown = () => {
		setIsToolsHidden(true);
	};

	const handleMouseUp = () => {
		setIsToolsHidden(false);
	};

	return (
		<Box sx={{ height: `${containerHeight}px` }}>
			{/* Image Tools - at the top */}
			<Fade in={!isToolsHidden} timeout={800}>
				<Box
					sx={{
						position: 'sticky',
						top: '6px',
						zIndex: '1',
						padding: '0 6px',
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
					<GeneratedImageTools
						currentGeneration={currentGeneration}
						sourceImageWidth={sourceImageWidth}
						sourceImageHeight={sourceImageHeight}
					/>
				</Box>
			</Fade>

			{/* Split Arrows */}
			<Box
				sx={{
					position: 'sticky',
					top: '33px',
					display: 'flex',
					alignItems: 'center',
					height: '0',
					zIndex: '1',
				}}
			>
				<Box
					sx={{
						width: `${sliderWidth}px`,
						textAlign: 'right',
						visibility: sliderWidth < 23 ? 'hidden' : 'unset',
					}}
				>
					<ArrowBackIosIcon fontSize="small" />
				</Box>

				{sliderWidth > containerWidth - 23 ? null : (
					<Box sx={{ margin: '0 0 0 5px' }}>
						<ArrowForwardIosIcon fontSize="small" />
					</Box>
				)}
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
				<Box
					sx={{
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						width: `${containerWidth}px`,
						height: `${containerHeight}px`,
					}}
				>
					<StyledSlider
						key={`${containerWidth}`}
						max={containerWidth}
						defaultValue={containerWidth / 2}
						aria-label="Default"
						valueLabelDisplay="off"
						onChange={(e: any) => handleOnChange(Number(e.target.value))}
						containerHeight={containerHeight}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseUp}
					/>

					{/* Source Image */}
					<Box
						sx={{
							overflow: 'hidden',
							width: `${sliderWidth}px`,
						}}
					>
						<Image alt="Source image" src={sourceImage} />
					</Box>

					{/* Enhanced Image */}
					<Box
						sx={{
							position: 'absolute',
							zIndex: '-1',
							width: `${containerWidth}px`,
						}}
					>
						<Image alt="Enhanced image" src={currentGeneration.images[0].imageUrl} />
					</Box>
				</Box>

				{/* Before & After - at the bottom */}
				<Box
					sx={{
						position: 'absolute',
						bottom: '0',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '6px',
					}}
				>
					<StyledInfoContainer dark>
						<Typography variant="h6" sx={{ padding: '4px 6px' }}>
							{before}
						</Typography>
					</StyledInfoContainer>
					<StyledInfoContainer dark>
						<Typography variant="h6" sx={{ padding: '4px 6px' }}>
							{after}
						</Typography>
					</StyledInfoContainer>
				</Box>
			</Box>
		</Box>
	);
};

export default SplitContainer;
