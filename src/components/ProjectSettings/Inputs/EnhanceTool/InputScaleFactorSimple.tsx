/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Typography } from '@mui/material';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setEnhanceScalefactor } from 'store/storeSlices/sliceOpenedProjects';

import LabelSettingInput from 'components/Common/LabelSettingInput';

import strings from 'constants/strings';
import { TabsSettings } from '../../../Navigation/TabsSettings';

const { upscale, finalSize, comingSoon, enhanceScaleFactor } = strings;

const InputScaleFactorSimple: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceScaleFactor, currentEnhanceSourceImage } = useSliceOpenedProjects();

	const {
		imageWidth: sourceImageWidth,
		imageHeight: sourceImageHeight,
		imageBase64: sourceImageBase64,
		imageUrl: sourceImageUrl,
	} = currentEnhanceSourceImage;

	const hasSourceImage = sourceImageBase64 || sourceImageUrl;

	const handleOnChange = (e: React.MouseEvent<HTMLElement>, value: number | null) => {
		if (value !== null && value !== 4) {
			dispatch(setEnhanceScalefactor(value));
		}
	};

	const finalWidth = Math.floor(sourceImageWidth * currentEnhanceScaleFactor);
	const finalHeight = Math.floor(sourceImageHeight * currentEnhanceScaleFactor);
	const finalSizeInfo = `${finalSize}: ${finalWidth}x${finalHeight}px`;
	// TODO move to constants
	const upscaleData = [
		{
			name: '2X',
			value: 2,
			label: '2X',
			isVisible: true,
			disabled: false,
		},
		{
			name: '4X',
			value: 4,
			label: comingSoon,
			isVisible: true,
			disabled: false,
		},
	];

	return (
		<>
			<LabelSettingInput label={upscale} margin="0 0 8px" />
			<TabsSettings
				ariaLabel={enhanceScaleFactor}
				data={upscaleData}
				onChange={handleOnChange}
				initialValue={currentEnhanceScaleFactor}
			/>
			<Typography
				variant="h6"
				sx={{ marginTop: '8px', height: '20px' }}
				color="text.secondary"
			>
				{hasSourceImage ? finalSizeInfo : ''}
			</Typography>
		</>
	);
};

export default InputScaleFactorSimple;
