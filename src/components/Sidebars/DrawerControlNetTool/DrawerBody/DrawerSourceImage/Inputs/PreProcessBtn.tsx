/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Button } from '@mui/material';

import useSliceControlNet from 'store/hooks/useSliceControlNet';

import strings from 'constants/strings';

const StyledButton = styled(Button)({
	padding: '4px 12px',
	fontSize: '11px',
	lineHeight: '17px',
});

const { preProcessBtn } = strings;

type Props = {
	handleOnClick: Function;
	disabled: boolean;
};

const PreProcessBtn: React.FC<Props> = ({ handleOnClick, disabled }) => {
	const { openedControlNetDrawer, controlNetTools } = useSliceControlNet();
	const { controlNetGenerationData } = controlNetTools[openedControlNetDrawer];

	const conditionalPreProcessBtn = () => {
		if (!controlNetGenerationData.isImagePreprocessed) {
			return (
				<StyledButton variant="primary" onClick={() => handleOnClick()} disabled={disabled}>
					{preProcessBtn}
				</StyledButton>
			);
		}

		return <Box sx={{ height: '25px' }} />;
	};

	return conditionalPreProcessBtn();
};

export default PreProcessBtn;
