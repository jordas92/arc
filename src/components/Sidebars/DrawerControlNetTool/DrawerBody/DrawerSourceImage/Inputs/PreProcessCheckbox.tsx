/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Checkbox, FormControlLabel, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setIsImagePreprocessed } from 'store/storeSlices/sliceControlNet';
import useSliceControlNet from 'store/hooks/useSliceControlNet';

import { ReactComponent as IconInfo } from 'assets/img/icons/info.svg';

import strings from 'constants/strings';
import LabelSettingInput from 'components/Common/LabelSettingInput';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

const { preProcessLabel, preProcessTooltip } = strings;

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	'.MuiCheckbox-root': {
		color: theme.palette.text.active,
		padding: '0',
		margin: '0 6px 0 0',
		transition: '0.3s',

		'&.Mui-checked': {
			color: theme.palette.accent.primary,
		},
	},

	'.Mui-disabled': {
		color: theme.palette.text.disabled,
	},

	'.MuiTypography-root': {
		transition: '0.3s',
	},

	'&:hover': {
		'.MuiCheckbox-root, .MuiTypography-root': {
			color: theme.palette.text.hover,
		},

		'.Mui-disabled': {
			color: theme.palette.text.disabled,
		},

		'.Mui-checked': {
			color: theme.palette.accent.primary,
		},
	},
}));

const PreProcessCheckbox: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { openedControlNetDrawer, controlNetTools } = useSliceControlNet();
	const { controlNetGenerationData } = controlNetTools[openedControlNetDrawer];
	const { preProcessedImageUrl, isImagePreprocessed } = controlNetGenerationData;

	const handleOnChange = () => {
		dispatch(setIsImagePreprocessed(!isImagePreprocessed));
	};

	const conditionalContent = () => {
		return (
			<StyledFormControlLabel
				sx={{ margin: '0' }}
				control={
					<Checkbox
						checked={controlNetGenerationData.isImagePreprocessed}
						disabled={!!preProcessedImageUrl}
						onChange={handleOnChange}
						size="small"
					/>
				}
				label={
					<Box display="flex" alignItems="center">
						<LabelSettingInput label={preProcessLabel} margin="0" variant="h6" />
						<Tooltip title={preProcessTooltip} placement="top" arrow>
							<StyledIconButtonAsset
								boxSize="20px"
								disableRipple
								sx={{ padding: '4px' }}
							>
								<IconInfo />
							</StyledIconButtonAsset>
						</Tooltip>
					</Box>
				}
			/>
		);
	};

	return conditionalContent();
};

export default PreProcessCheckbox;
