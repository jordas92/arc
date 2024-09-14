/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, ToggleButton, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setEnhanceScalefactor } from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import StyledToggleButtonGroup from 'components/StyledWrappers/StyledToggleButtonGroup';
import InputResizeBefore from './InputResizeBefore';
import WidthResizeContainer from './WidthResizeContainer/WidthResizeContainer';

const { scaleFactor, comingSoon } = strings;

const InputScaleFactorAdvanced: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceScaleFactor, currentEnhanceIsResizeOn } = useSliceOpenedProjects();

	const handleOnChange = (e: React.MouseEvent<HTMLElement>, value: number | null) => {
		if (value !== null && value !== 4) {
			dispatch(setEnhanceScalefactor(value));
		}
	};

	const conditionalContent = () => {
		if (currentEnhanceIsResizeOn) {
			return <WidthResizeContainer />;
		}
		return null;
	};

	return (
		<>
			{/* TODO - Create reusable Styled Wrapper - check 'SettingsEnhanceAdvanced' */}
			<Box
				sx={{
					display: ' flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: '0 0 8px',
				}}
			>
				<LabelSettingInput label={scaleFactor} margin="0" />
				<InputResizeBefore />
			</Box>
			<StyledContainerTools sx={{ padding: '4px', marginBottom: '12px' }}>
				<StyledToggleButtonGroup
					value={currentEnhanceScaleFactor}
					onChange={handleOnChange}
					aria-label="Enhance Scale Factors"
					exclusive
					fullWidth
					allRounded
				>
					<ToggleButton value={2}>2X</ToggleButton>
					<Tooltip title={comingSoon} placement="top" arrow>
						<ToggleButton value={4}>4X</ToggleButton>
					</Tooltip>
				</StyledToggleButtonGroup>
			</StyledContainerTools>

			{conditionalContent()}
		</>
	);
};

export default InputScaleFactorAdvanced;
