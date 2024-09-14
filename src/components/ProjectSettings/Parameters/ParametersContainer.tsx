/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceSamplers from 'store/hooks/useSliceSamplers';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setCfg, setClipSkip, setSampler } from 'store/storeSlices/sliceOpenedProjects';

import {
	CFG_MAX_VALUE,
	CFG_MIN_VALUE,
	CFG_STEP_VALUE,
	CGF_DEFAULT_VALUE,
	CLIP_SKIP_DEFAULT_VALUE,
	CLIP_SKIP_MAX_VALUE,
	CLIP_SKIP_MIN_VALUE,
	CLIP_SKIP_STEP_VALUE,
} from 'constants/default';
import strings from 'constants/strings';
import StyledSettingsToolWrapper from 'components/StyledWrappers/StyledSettingsToolWrapper';
import InputSampler from 'components/Common/InputSampler';
import ParameterSliderContainer from './ParameterSliderContainer';
import AutomateCheckbox from './AutomateCheckbox';

const styles = {
	wrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: '16px',
	},
	column: {
		width: '50%',
	},
};

const { parametersLabel, restoreDefaults, cfgLabel, clipSkipLabel, cfgTooltip, clipSkipTooltip } =
	strings;

const ParametersContainer: React.FC = () => {
	const dispatch = useStoreDispatch();

	const { currentCfg, currentClipSkip, currentGenerationTool } = useSliceOpenedProjects();
	const sliceSamplers = useSliceSamplers();

	const defaultSampler = sliceSamplers[currentGenerationTool].default;

	const handleRestoreDefaultsBtn = () => {
		// defaults - back to system defaults
		dispatch(setCfg(CGF_DEFAULT_VALUE));
		dispatch(setClipSkip(CLIP_SKIP_DEFAULT_VALUE));
		dispatch(setSampler(defaultSampler));
	};

	const handleCfgChange = (value: number) => {
		dispatch(setCfg(value));
	};

	const handleClipSkipChange = (value: number) => {
		dispatch(setClipSkip(value));
	};

	const handleAutomateChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

	return (
		<Box>
			<Box sx={styles.wrapper}>
				<Typography variant="h5" color="text.secondary">
					{parametersLabel}
				</Typography>
				<Button
					variant="basic"
					onClick={handleRestoreDefaultsBtn}
					disableRipple
					sx={{ p: 0 }}
				>
					<Typography variant="h6">{restoreDefaults}</Typography>
				</Button>
			</Box>

			<StyledSettingsToolWrapper margin="0 0 16px">
				<InputSampler horizontalStyle />
			</StyledSettingsToolWrapper>

			<Box sx={styles.wrapper}>
				<Box
					sx={{
						...styles.column,
						marginRight: '16px',
					}}
				>
					<ParameterSliderContainer
						label={cfgLabel}
						ariaLabel={`${cfgLabel} slider`}
						tooltip={cfgTooltip}
						defaultValue={CGF_DEFAULT_VALUE}
						value={currentCfg}
						min={CFG_MIN_VALUE}
						max={CFG_MAX_VALUE}
						step={CFG_STEP_VALUE}
						currentValue={currentCfg}
						onChange={handleCfgChange}
					/>
				</Box>
				<Box
					sx={{
						...styles.column,
						marginLeft: '16px',
					}}
				>
					<ParameterSliderContainer
						label={clipSkipLabel}
						ariaLabel={`${clipSkipLabel} slider`}
						tooltip={clipSkipTooltip}
						defaultValue={CLIP_SKIP_DEFAULT_VALUE}
						value={currentClipSkip}
						min={CLIP_SKIP_MIN_VALUE}
						max={CLIP_SKIP_MAX_VALUE}
						step={CLIP_SKIP_STEP_VALUE}
						currentValue={currentClipSkip}
						onChange={handleClipSkipChange}
					/>
				</Box>
			</Box>
			<AutomateCheckbox checked={false} label="Automate" onChange={handleAutomateChange} />
		</Box>
	);
};

export default ParametersContainer;
