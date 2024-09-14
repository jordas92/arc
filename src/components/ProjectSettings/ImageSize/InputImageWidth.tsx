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
const { labelWidth } = strings;

type Props = {
	ratioNumber: number;
};

const InputImageWidth: React.FC<Props> = ({ ratioNumber }) => {
	const dispatch = useStoreDispatch();
	const { currentImageWidth, currentRatio, currentIsApectRatioPortrait } =
		useSliceOpenedProjects();

	const isDisabled = currentIsApectRatioPortrait && currentRatio !== ASPECT_RATIO_OFF;

	const handleOnChange = (value: number) => {
		if (currentRatio === ASPECT_RATIO_OFF) {
			dispatch(setImageWidth(value));
		} else {
			const height = Math.round(value / ratioNumber);

			if (height <= BASIC_IMAGE_SIZE_MIN) {
				dispatch(setImageHeight(BASIC_IMAGE_SIZE_MIN));
				dispatch(setImageWidth(Math.round(BASIC_IMAGE_SIZE_MIN * ratioNumber)));
			} else if (height >= BASIC_IMAGE_SIZE_MAX) {
				dispatch(setImageHeight(BASIC_IMAGE_SIZE_MAX));
				dispatch(setImageWidth(Math.round(BASIC_IMAGE_SIZE_MAX * ratioNumber)));
			} else {
				dispatch(setImageHeight(height));
				dispatch(setImageWidth(value));
			}
		}
	};

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="flex-end">
				<LabelSettingInput label={labelWidth} margin="0" />
				<SliderValueContainerEditable
					value={currentImageWidth}
					onChange={handleOnChange}
					min={Math.round(BASIC_IMAGE_SIZE_MIN * ratioNumber)}
					max={BASIC_IMAGE_SIZE_MAX}
					isDisabled={isDisabled}
					step={BASIC_IMAGE_SIZE_SLIDER_STEPS}
				/>
			</Box>

			<Box sx={{ width: '94%', margin: '0 0 0 8px' }}>
				<StyledSliderBasic
					aria-label="Image Width Slider"
					defaultValue={BASIC_IMAGE_SIZE_DEFAULT}
					value={currentImageWidth}
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

export default InputImageWidth;
