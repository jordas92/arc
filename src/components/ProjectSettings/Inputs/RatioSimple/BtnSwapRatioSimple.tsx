/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { toggleIsAspectRatioPortrait } from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

const { swapRatio } = strings;

const BtnSwapRatioSimple: React.FC = () => {
	const dispatch = useStoreDispatch();

	const handleOnClick = () => {
		dispatch(toggleIsAspectRatioPortrait());
	};

	return (
		<Tooltip title={swapRatio} placement="top" arrow>
			<StyledIconButtonMui
				onClick={handleOnClick}
				disableRipple
				sx={{ margin: '0 4px', fontSize: '8px' }}
			>
				<SyncAltIcon sx={{ transform: 'rotate(90deg)', fontSize: '18px' }} />
			</StyledIconButtonMui>
		</Tooltip>
	);
};

export default BtnSwapRatioSimple;
