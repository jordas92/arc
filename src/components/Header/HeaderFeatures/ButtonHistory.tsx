/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openDrawerWithType } from 'store/storeSlices/sliceOpenedProjects';
import { drawersKeys } from 'store/common/keys';

import { ReactComponent as HomeIcon } from 'assets/img/icons/history.svg';
import strings from 'constants/strings';

import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

const { history } = strings;
const { PROJECT_DRAWER_HISTORY } = drawersKeys;

const ButtonHistory: React.FC = () => {
	const dispatch = useStoreDispatch();

	const handleOnClick = () => {
		dispatch(openDrawerWithType(PROJECT_DRAWER_HISTORY));
	};

	return (
		<StyledIconButtonAsset onClick={handleOnClick} aria-label="History button" disableRipple>
			<Tooltip title={history} arrow>
				<HomeIcon />
			</Tooltip>
		</StyledIconButtonAsset>
	);
};

export default ButtonHistory;
