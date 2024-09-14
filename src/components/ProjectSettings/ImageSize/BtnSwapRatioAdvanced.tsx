/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip, Box, Button } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { toggleIsAspectRatioPortrait } from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';
import { ASPECT_RATIO_OFF } from 'constants/default';

const { swapRatio } = strings;

type Props = {
	handleSwapRatioChange: Function;
};

const BtnSwapRatioAdvanced: React.FC<Props> = ({ handleSwapRatioChange }) => {
	const dispatch = useStoreDispatch();
	const { currentRatio } = useSliceOpenedProjects();

	const handleOnClick = () => {
		dispatch(toggleIsAspectRatioPortrait());
		handleSwapRatioChange();
	};

	const isDisabled = currentRatio === ASPECT_RATIO_OFF;

	return (
		<Tooltip title={swapRatio} placement="bottom" arrow>
			<Box display="inline-block">
				<Button
					variant="flat"
					onClick={handleOnClick}
					sx={{ padding: '11px 8px', minWidth: 'unset' }}
					disabled={isDisabled}
				>
					<SwapVertIcon />
				</Button>
			</Box>
		</Tooltip>
	);
};

export default BtnSwapRatioAdvanced;
