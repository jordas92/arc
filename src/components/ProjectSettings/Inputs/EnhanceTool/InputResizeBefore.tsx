/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { FormControlLabel, Box, Checkbox, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { toggleEnhanceIsResizeOn } from 'store/storeSlices/sliceOpenedProjects';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';

import strings from 'constants/strings';
import InfoIconMui from 'components/Common/InfoIconMui';
import LabelSettingInput from 'components/Common/LabelSettingInput';

const { resizeBefore, infoResizeBefore, uploadImageToEnable } = strings;

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

const InputResizeBefore: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentEnhanceIsResizeOn: isResizeOn, currentEnhanceSourceImage } =
		useSliceOpenedProjects();

	const hasSourceImage =
		currentEnhanceSourceImage.imageBase64 || currentEnhanceSourceImage.imageUrl;

	const handleOnChange = () => {
		dispatch(toggleEnhanceIsResizeOn());
	};

	return (
		<Tooltip title={hasSourceImage ? '' : uploadImageToEnable} placement="top" arrow>
			<StyledFormControlLabel
				sx={{ margin: '0' }}
				disabled={!hasSourceImage}
				control={<Checkbox checked={isResizeOn} onChange={handleOnChange} size="small" />}
				label={
					<Box display="flex" alignItems="center">
						<LabelSettingInput label={resizeBefore} margin="0" variant="h6" />
						<InfoIconMui content={infoResizeBefore} placement="top" hasArrow />
					</Box>
				}
			/>
		</Tooltip>
	);
};

export default InputResizeBefore;
