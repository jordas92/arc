/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openDrawerWithType } from 'store/storeSlices/sliceOpenedProjects';
import { drawersKeys } from 'store/common/keys';

import { ReactComponent as FoldersIcon } from 'assets/img/icons/folders.svg';
import strings from 'constants/strings';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

const { library } = strings;
const { PROJECT_DRAWER_LIBRARY } = drawersKeys;

const ButtonLibrary: React.FC = () => {
	const dispatch = useStoreDispatch();

	const handleOnClick = () => {
		dispatch(openDrawerWithType(PROJECT_DRAWER_LIBRARY));
	};

	return (
		<StyledIconButtonAsset onClick={handleOnClick} aria-label="Library button" disableRipple>
			<Tooltip title={library} arrow>
				<FoldersIcon />
			</Tooltip>
		</StyledIconButtonAsset>
	);
};

export default ButtonLibrary;
