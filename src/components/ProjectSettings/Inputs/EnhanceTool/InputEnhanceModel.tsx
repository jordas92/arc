/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { ToggleButton, Typography, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceEnhanceModels from 'store/hooks/useSliceEnhanceModels';
import {
	setEnhanceModel,
	setDefaultEnhanceModel,
	setEnhanceSharpness,
} from 'store/storeSlices/sliceOpenedProjects';
import { EnhanceModel } from 'store/types/typesEnhanceModels';

import strings from 'constants/strings';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import StyledToggleButtonGroup from 'components/StyledWrappers/StyledToggleButtonGroup';

const { optimizedFor } = strings;

const InputEnhanceModel: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceModel } = useSliceOpenedProjects();
	const enhanceModels = useSliceEnhanceModels();

	useEffect(() => {
		if (!currentEnhanceModel && enhanceModels.length > 0) {
			dispatch(setDefaultEnhanceModel(enhanceModels[0].key));
			dispatch(setEnhanceSharpness(enhanceModels[0].sharpening));
		}

		if (currentEnhanceModel && enhanceModels) {
			const enhanceModel = enhanceModels.find(
				(item: EnhanceModel) => item.key === currentEnhanceModel,
			);

			if (enhanceModel) {
				dispatch(setEnhanceSharpness(enhanceModel.sharpening));
				dispatch(setDefaultEnhanceModel(enhanceModel.key));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentEnhanceModel, enhanceModels]);

	const handleOnChange = (e: React.MouseEvent<HTMLElement>, value: string | null) => {
		if (value !== null) {
			dispatch(setEnhanceModel(value));
			const enhanceModel = enhanceModels.find((item: EnhanceModel) => item.key === value);

			if (enhanceModel) {
				dispatch(setEnhanceSharpness(enhanceModel.sharpening));
			} else {
				dispatch(setEnhanceSharpness('none'));
			}
		}
	};

	const conditionalContent = () => {
		if (enhanceModels) {
			return (
				<StyledToggleButtonGroup
					value={currentEnhanceModel}
					onChange={handleOnChange}
					aria-label="Enhance Scale Factors"
					exclusive
					fullWidth
					allRounded
					sx={{ display: 'inline-block', width: '100%' }}
				>
					{enhanceModels.map((item: EnhanceModel, index) => {
						return (
							<Tooltip
								key={`${index}opt-tooltip`}
								title={item.tooltip}
								placement="top"
								arrow
							>
								<ToggleButton
									key={item.key}
									value={item.key}
									sx={{ width: '49.5%' }}
								>
									<Typography noWrap>{item.value}</Typography>
								</ToggleButton>
							</Tooltip>
						);
					})}
				</StyledToggleButtonGroup>
			);
		}

		return null;
	};

	return (
		<>
			<LabelSettingInput label={optimizedFor} margin="0 0 8px" />
			<StyledContainerTools sx={{ padding: '4px 4px 4px 6px', minHeight: '94px' }}>
				{conditionalContent()}
			</StyledContainerTools>
		</>
	);
};

export default InputEnhanceModel;
