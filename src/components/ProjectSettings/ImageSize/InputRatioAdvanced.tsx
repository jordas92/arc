/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { SelectChangeEvent, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setRatio } from 'store/storeSlices/sliceOpenedProjects';
import { AspectRatio } from 'store/types/typesAspectRatios';

import { ASPECT_RATIO_OFF, ASPECT_RATIO_LOCKED } from 'constants/default';
import strings from 'constants/strings';
import useModelsAndAspectRatios from 'hooks/useModelsAndAspectRatios';
import StyledSelect from 'components/StyledWrappers/StyledSelect';
import StyledMenuItem from 'components/StyledWrappers/StyledMenuItem';
import useSliceAspectRatios from 'store/hooks/useSliceAspectRatios';

const { labelAspectRatio } = strings;

const InputRatioAdvanced: React.FC = () => {
	const dispatch = useStoreDispatch();
	const aspectRatios = useSliceAspectRatios();
	const { currentRatio, currentIsApectRatioPortrait, currentModel } = useSliceOpenedProjects();

	const setPredefinedImageWidthAndHeight = useModelsAndAspectRatios();

	const ratioOptions = currentIsApectRatioPortrait
		? aspectRatios.standard.portrait
		: aspectRatios.standard.landscape;

	const handleOnChange = (event: SelectChangeEvent<unknown>) => {
		const ratioKey = event.target.value as string;

		dispatch(setRatio(ratioKey));
		setPredefinedImageWidthAndHeight(currentModel, ratioKey);
	};

	return (
		<StyledSelect
			name={labelAspectRatio}
			displayEmpty
			value={currentRatio}
			inputProps={{ 'aria-label': `${labelAspectRatio}` }}
			onChange={handleOnChange}
			MenuProps={{
				// THEME_NEXT
				PaperProps: {
					sx: {
						maxHeight: '55vh',
						margin: '5px 0',

						'.MuiList-root': {
							padding: '0',
						},
					},
				},
			}}
			styles={{ width: '130px', margin: '0 16px' }}
		>
			<StyledMenuItem value={ASPECT_RATIO_OFF}>
				<Typography noWrap>{ASPECT_RATIO_OFF}</Typography>
			</StyledMenuItem>
			<StyledMenuItem value={ASPECT_RATIO_LOCKED}>
				<Typography noWrap>{ASPECT_RATIO_LOCKED}</Typography>
			</StyledMenuItem>

			{ratioOptions.map((item: AspectRatio) => {
				return (
					<StyledMenuItem key={item.ar} value={item.ar}>
						<Typography noWrap>{item.ar}</Typography>
					</StyledMenuItem>
				);
			})}
		</StyledSelect>
	);
};

export default InputRatioAdvanced;
