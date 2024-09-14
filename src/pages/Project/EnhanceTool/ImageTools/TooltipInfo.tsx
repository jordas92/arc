/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

import useSelectedStylesNames from 'hooks/useSelectedStylesNames';

import { SHARPNESS_DATA } from 'constants/default';
import strings from 'constants/strings';
import TooltipInfoContent from './TooltipInfoContent';

const StyledBox = styled(Box)({
	display: 'flex',
	flexWrap: 'wrap',
	margin: '0 -8px -8px 0',
});

const { original, sharpness, optimizedFor, stylesLabel, none } = strings;

type Props = {
	prompt?: string;
	sourceImageWidth: number;
	sourceImageHeight: number;
	sharpnessValue: string;
	enhanceModelName: string;
	styles: Array<string>;
};

const TooltipInfo: React.FC<Props> = ({
	prompt,
	sourceImageWidth,
	sourceImageHeight,
	sharpnessValue,
	enhanceModelName,
	styles,
}) => {
	const selectedStylesNames = useSelectedStylesNames(styles);
	const selectedStyles = selectedStylesNames || none;

	const handleSharpness = () => {
		const sharpnessItem = SHARPNESS_DATA.find((item) => item.value === sharpnessValue);
		return sharpnessItem ? sharpnessItem.name : '';
	};

	return (
		<Box sx={{ width: '100%' }}>
			{prompt && (
				<Box sx={{ marginBottom: '16px', maxHeight: '400px', overflowY: 'auto' }}>
					<Typography variant="h6">{prompt}</Typography>
				</Box>
			)}
			<StyledBox>
				<TooltipInfoContent
					label={original}
					value={`${sourceImageWidth}x${sourceImageHeight}px`}
				/>
				<TooltipInfoContent label={sharpness} value={handleSharpness()} />
				<TooltipInfoContent label={optimizedFor} value={enhanceModelName} />
				<TooltipInfoContent label={stylesLabel} value={selectedStyles} />
			</StyledBox>
		</Box>
	);
};

export default TooltipInfo;
