/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setImageWidth, setImageHeight } from 'store/storeSlices/sliceOpenedProjects';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import strings from 'constants/strings';
import {
	sizeKeys,
	ASPECT_RATIO_OFF,
	BASIC_IMAGE_SIZE_MIN,
	BASIC_IMAGE_SIZE_MAX,
	BASIC_IMAGE_SIZE_DEFAULT,
	BASIC_IMAGE_SIZE_SLIDER_STEPS,
} from 'constants/default';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import SliderValueContainerEditable from 'components/Common/SliderValueContainerEditable';
import StyledSliderBasic from 'components/StyledWrappers/StyledSliderBasic';

const { M } = sizeKeys;
const { labeleHeight } = strings;

type Props = {
	ratioNumber: number;
};

const InputImageHeight: React.FC<Props> = ({ ratioNumber }) => {
	const dispatch = useStoreDispatch();
	const { currentImageHeight, currentRatio, currentIsApectRatioPortrait } =
		useSliceOpenedProjects();

	const isDisabled = !currentIsApectRatioPortrait && currentRatio !== ASPECT_RATIO_OFF;

	const handleOnChange = (value: number) => {
		if (currentRatio === ASPECT_RATIO_OFF) {
			dispatch(setImageHeight(value));
		} else {
			const width = Math.round(value * ratioNumber);

			if (width <= BASIC_IMAGE_SIZE_MIN) {
				dispatch(setImageWidth(BASIC_IMAGE_SIZE_MIN));
				dispatch(setImageHeight(Math.round(BASIC_IMAGE_SIZE_MIN / ratioNumber)));
			} else if (width >= BASIC_IMAGE_SIZE_MAX) {
				dispatch(setImageWidth(BASIC_IMAGE_SIZE_MAX));
				dispatch(setImageHeight(Math.round(BASIC_IMAGE_SIZE_MAX / ratioNumber)));
			} else {
				dispatch(setImageWidth(width));
				dispatch(setImageHeight(value));
			}
		}
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="flex-end">
				<LabelSettingInput label={labeleHeight} margin="0" />
				<SliderValueContainerEditable
					value={currentImageHeight}
					onChange={handleOnChange}
					min={Math.round(BASIC_IMAGE_SIZE_MIN / ratioNumber)}
					max={BASIC_IMAGE_SIZE_MAX}
					isDisabled={isDisabled}
					step={BASIC_IMAGE_SIZE_SLIDER_STEPS}
				/>
			</Box>

			<Box sx={{ width: '94%', margin: '0 0 0 8px' }}>
				<StyledSliderBasic
					aria-label="Image Height Slider"
					defaultValue={BASIC_IMAGE_SIZE_DEFAULT}
					value={currentImageHeight}
					min={BASIC_IMAGE_SIZE_MIN}
					max={BASIC_IMAGE_SIZE_MAX}
					step={BASIC_IMAGE_SIZE_SLIDER_STEPS}
					onChange={(e, value) => handleOnChange(value as number)}
					sliderSize={M}
					disabled={isDisabled}
				/>
			</Box>
		</>
	);
};

export default InputImageHeight;
