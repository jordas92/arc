/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setEnhanceCreativity } from 'store/storeSlices/sliceOpenedProjects';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import strings from 'constants/strings';
import { sizeKeys } from 'constants/default';
import InfoIconMui from 'components/Common/InfoIconMui';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import SliderValueContainerBasic from 'components/Common/SliderValueContainerBasic';
import StyledSliderBasic from 'components/StyledWrappers/StyledSliderBasic';

type Props = {
	sliderSize?: keyof typeof sizeKeys;
	valueContainerWidth?: string;
};

const { creativity, tooltipCreativity } = strings;

const InputCreativity: React.FC<Props> = ({ sliderSize, valueContainerWidth }) => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceTransformation: transformation } = useSliceOpenedProjects();

	const handleOnChange = (value: number) => {
		dispatch(setEnhanceCreativity(value));
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="flex-end">
				<Box sx={{ display: ' flex', alignItems: 'center' }}>
					<LabelSettingInput label={creativity} margin="0" />
					<InfoIconMui content={tooltipCreativity} placement="top" hasArrow />
				</Box>
				<SliderValueContainerBasic value={transformation} width={valueContainerWidth} />
			</Box>

			<Box sx={{ width: '93%', margin: '0 0 0 10px' }}>
				<StyledSliderBasic
					aria-label="Creativity Strength Slider"
					defaultValue={0}
					value={transformation}
					min={-20}
					max={20}
					step={1}
					onChange={(_, value) => handleOnChange(value as number)}
					sliderSize={sliderSize}
					shiny
				/>
			</Box>
		</>
	);
};

export default InputCreativity;
