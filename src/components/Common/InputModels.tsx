/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { FormControl, SelectChangeEvent, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceModels from 'store/hooks/useSliceModels';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setModel } from 'store/storeSlices/sliceOpenedProjects';
import { generationToolsKeys } from 'store/common/keys';
import { Model } from 'store/types/typesModels';

import { DEFAULT_MODEL_TEXT_TO_IMAGE, DEFAULT_MODEL_IMAGE_TO_IMAGE } from 'constants/default';
import strings from 'constants/strings';
import useModelsAndAspectRatios from 'hooks/useModelsAndAspectRatios';
import StyledSelect from 'components/StyledWrappers/StyledSelect';
import StyledMenuItem from 'components/StyledWrappers/StyledMenuItem';

const { labelModels } = strings;
const { TEXT_TO_IMAGE, IMAGE_TO_IMAGE } = generationToolsKeys;

const InputModels: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { models } = useSliceModels();
	const { currentModel, currentRatio, currentGenerationTool } = useSliceOpenedProjects();

	const setPredefinedImageWidthAndHeight = useModelsAndAspectRatios();

	useEffect(() => {
		if (!currentModel) {
			if (currentGenerationTool === TEXT_TO_IMAGE) {
				dispatch(setModel(DEFAULT_MODEL_TEXT_TO_IMAGE));
			}

			if (currentGenerationTool === IMAGE_TO_IMAGE) {
				dispatch(setModel(DEFAULT_MODEL_IMAGE_TO_IMAGE));
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentModel]);

	const handleOnChange = (event: SelectChangeEvent<unknown>) => {
		const modelKey = event.target.value as string;

		dispatch(setModel(modelKey));

		if (currentGenerationTool === TEXT_TO_IMAGE) {
			setPredefinedImageWidthAndHeight(modelKey, currentRatio);
		}
	};

	const isSelectDisabled = !(models.length > 0);

	return (
		<FormControl fullWidth>
			<StyledSelect
				name={labelModels}
				displayEmpty
				value={currentModel}
				inputProps={{ 'aria-label': `${labelModels}` }}
				disabled={isSelectDisabled}
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
			>
				{models.map((item: Model) => {
					return (
						<StyledMenuItem key={item.key} value={item.key} disabled={item.disabled}>
							<Typography noWrap>{item.name}</Typography>
						</StyledMenuItem>
					);
				})}
			</StyledSelect>
		</FormControl>
	);
};

export default InputModels;
