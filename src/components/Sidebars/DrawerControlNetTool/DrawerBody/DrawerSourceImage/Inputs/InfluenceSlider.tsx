/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setInfluence } from 'store/storeSlices/sliceControlNet';
import useSliceControlNet from 'store/hooks/useSliceControlNet';

import { ReactComponent as IconInfo } from 'assets/img/icons/info.svg';

import strings from 'constants/strings';
import { sizeKeys } from 'constants/default';

import LabelSettingInput from 'components/Common/LabelSettingInput';
import SliderValueContainerBasic from 'components/Common/SliderValueContainerBasic';
import StyledSliderBasic from 'components/StyledWrappers/StyledSliderBasic';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

const { influence, tooltipInfluence } = strings;
const { L } = sizeKeys;

const InfluenceSlider: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { openedControlNetDrawer, controlNetTools } = useSliceControlNet();
	const { controlNetGenerationData } = controlNetTools[openedControlNetDrawer];

	const handleOnChange = (value: number) => {
		dispatch(setInfluence(value));
	};

	return (
		<Box display="flex" justifyContent="space-between" alignItems="center" mt="20px">
			<Box sx={{ display: ' flex', alignItems: 'center' }}>
				<LabelSettingInput label={influence} margin="0" />
				<Tooltip title={tooltipInfluence} placement="top" arrow>
					<StyledIconButtonAsset boxSize="20px" disableRipple sx={{ padding: '4px' }}>
						<IconInfo />
					</StyledIconButtonAsset>
				</Tooltip>
			</Box>
			<Box sx={{ width: '65%', height: '36px', margin: '0 16px' }}>
				<StyledSliderBasic
					aria-label="Influence Slider"
					defaultValue={1}
					value={controlNetGenerationData.influence}
					min={0}
					max={2}
					step={0.01}
					onChange={(_, value) => handleOnChange(value as number)}
					sliderSize={L}
					shiny
				/>
			</Box>
			<SliderValueContainerBasic
				value={controlNetGenerationData.influence}
				width="45px"
				padding="8px"
				textAlign="center"
				lineHeight="18px"
				variant="h6"
			/>
		</Box>
	);
};

export default InfluenceSlider;
