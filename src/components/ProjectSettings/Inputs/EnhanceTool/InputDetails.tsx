/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setEnhanceDetailsStrength } from 'store/storeSlices/sliceOpenedProjects';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import strings from 'constants/strings';
import InfoIconMui from 'components/Common/InfoIconMui';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import SliderValueContainerBasic from 'components/Common/SliderValueContainerBasic';
import StyledSliderBasic from 'components/StyledWrappers/StyledSliderBasic';

const { details } = strings;

const tooltipContent = 'Tooltip Details';

const InputDetails: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceDetailsStrength: detailsStrength } = useSliceOpenedProjects();

	const handleOnChange = (value: number) => {
		dispatch(setEnhanceDetailsStrength(value));
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="flex-end">
				<Box sx={{ display: ' flex', alignItems: 'center' }}>
					<LabelSettingInput label={details} margin="0" />
					<InfoIconMui content={tooltipContent} placement="right" hasArrow />
				</Box>
				<SliderValueContainerBasic value={detailsStrength} />
			</Box>

			<Box sx={{ width: '93%', margin: '0 0 0 10px' }}>
				<StyledSliderBasic
					aria-label="Creativity Strength Slider"
					defaultValue={0}
					value={detailsStrength}
					min={-100}
					max={100}
					step={1}
					onChange={(_, value) => handleOnChange(value as number)}
				/>
			</Box>
		</>
	);
};

export default InputDetails;
