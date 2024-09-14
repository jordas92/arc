/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, ToggleButton } from '@mui/material';

import { generationToolModes } from 'store/common/keys';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setMode } from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';
import StyledControlsHeaders from '../StyledWrappers/StyledControlsHeaders';
import StyledControlsToggleButtonGroup from '../StyledWrappers/StyledControlsToggleButtonGroup';

const { simple, advanced } = strings;
const { SIMPLE, ADVANCED } = generationToolModes;

const StyledBox = styled(Box)(() => ({
	position: 'sticky',
}));

const SettingsHeader: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentMode, currentGenerationTool } = useSliceOpenedProjects();

	const handleOnChange = (
		e: React.MouseEvent<HTMLElement>,
		value: keyof typeof generationToolModes | null,
	) => {
		if (value !== null) {
			dispatch(setMode(value));
		}
	};

	// TODO_NEXT
	const isAdvancedDisabled =
		currentGenerationTool === 'TOOL_ENHANCE' &&
		(process.env?.REACT_APP_ENV === 'stage' || process.env?.REACT_APP_ENV === 'production');

	return (
		<StyledBox>
			<StyledControlsHeaders>
				<StyledControlsToggleButtonGroup
					value={currentMode}
					onChange={handleOnChange}
					aria-label="Image Generation Tool Modes"
					exclusive
					fullWidth
				>
					<ToggleButton value={SIMPLE}>{simple}</ToggleButton>
					<ToggleButton value={ADVANCED} disabled={isAdvancedDisabled}>
						{advanced}
					</ToggleButton>
					{/* FUTURE FEATURE */}
					{/* <ToggleButton value="TEMPLATES">Templates</ToggleButton> */}
				</StyledControlsToggleButtonGroup>
			</StyledControlsHeaders>
		</StyledBox>
	);
};

export default SettingsHeader;
