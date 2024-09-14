/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setIsInPaintMode } from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

const { openInPaint } = strings;

const IAIBtnOpenInPaintMode: React.FC = () => {
	const dispatch = useStoreDispatch();

	const handleOnClick = () => {
		dispatch(setIsInPaintMode(true));
	};

	return (
		<Tooltip title={openInPaint} placement="top" arrow>
			<StyledIconButtonMui
				onClick={handleOnClick}
				aria-label="Toggle Is InPaint Mode Button"
				disableRipple
				hasBackground
				boxSize="35px"
				// sx={{ margin: '6px 0 4px' }}
			>
				<BrushIcon />
			</StyledIconButtonMui>
		</Tooltip>
	);
};

export default IAIBtnOpenInPaintMode;
