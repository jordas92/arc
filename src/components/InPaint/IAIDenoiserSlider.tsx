/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { Box, Slider as MuiSlider, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import {
	setTransformation,
	setTransformationPrevValue,
} from 'store/storeSlices/sliceOpenedProjects';

import { DEFAULT_TRANSFORMATION_VALUE } from 'constants/default';
import strings from 'constants/strings';
import InfoIcon from 'components/Common/InfoIcon';
import StyledContainerDenoiserTools from 'components/StyledWrappers/StyledContainerDenoiserTools';
import useSliceOpenedProjects from '../../store/hooks/useSliceOpenedProjects';

const { transformation, transformationInfo, fill, refine } = strings;

const DenoiserContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginTop: '2px',
}));

const StyledSlider = styled(MuiSlider)(({ theme, disabled }) => ({
	// THEME_NEXT
	color: theme.palette.primary.main,
	width: '270px',

	'&.MuiSlider-root': {
		padding: '12px 0',
	},

	'.MuiSlider-rail': {
		height: '12px',
		borderRadius: '16px',
		background: disabled
			? '#636363'
			: 'linear-gradient(90deg, #5CCF94 0%, #5646D6 51.26%, #E20000 113.42%)',
	},
	'.MuiSlider-track': {
		height: '16px',
		borderRadius: '16px',
		background: 'transparent',
		border: 'none',
	},
	'.MuiSlider-thumb': {
		width: '24px',
		height: '24px',
		background: 'white',
		borderRadius: '50%',
		backgroundColor: disabled ? '#636363' : '',
	},
}));

type Props = {
	onChangeClose?: Function;
	isInPaintMode?: boolean;
};

const IAIDenoiserSlider: React.FC<Props> = ({ onChangeClose, isInPaintMode }) => {
	const dispatch = useStoreDispatch();
	const { currentInPaintType, currentInpaintTransformationPrevValue } = useSliceOpenedProjects();
	const [dValue, setDValue] = useState(DEFAULT_TRANSFORMATION_VALUE);

	useEffect(() => {
		if (currentInPaintType === fill) {
			setDValue(0.8);
			dispatch(setTransformation(0.8));
			dispatch(setTransformationPrevValue(dValue));
		}

		if (currentInpaintTransformationPrevValue !== 0.8 && currentInPaintType === refine) {
			dispatch(setTransformation(currentInpaintTransformationPrevValue));
			setDValue(currentInpaintTransformationPrevValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentInPaintType]);

	const calculatePercentage = (value: number): string => {
		return `${Math.floor(value * 100)}%`;
	};

	const onValueChange = (event: any) => {
		const inputValue = Number(event.target.value);
		setDValue(inputValue);
	};

	const onChangeCommitted = (event: any, newValue) => {
		if (onChangeClose) {
			onChangeClose();
		}
		const inputValue = Number(newValue);
		dispatch(setTransformation(inputValue));
	};

	return (
		<DenoiserContainer>
			<Typography variant="h6">{transformation}</Typography>
			<InfoIcon content={transformationInfo} placement="top" hasArrow />

			<StyledSlider
				value={dValue}
				step={0.01}
				min={0.1}
				max={1.0}
				valueLabelDisplay="off"
				onChange={onValueChange}
				onChangeCommitted={onChangeCommitted}
				disabled={isInPaintMode && currentInPaintType === fill}
			/>
			<StyledContainerDenoiserTools disabled={isInPaintMode && currentInPaintType === fill}>
				{calculatePercentage(dValue)}
			</StyledContainerDenoiserTools>
		</DenoiserContainer>
	);
};

export default IAIDenoiserSlider;
