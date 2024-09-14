/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openDrawerWithType } from 'store/storeSlices/sliceOpenedProjects';
import { drawersKeys } from 'store/common/keys';

import { ReactComponent as FavoriteIcon } from 'assets/img/icons/like.svg';
import strings from 'constants/strings';

import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

const { favorites } = strings;
const { PROJECT_DRAWER_FAVORITES } = drawersKeys;

const ButtonFavorites: React.FC = () => {
	const dispatch = useStoreDispatch();

	const handleOnClick = () => {
		dispatch(openDrawerWithType(PROJECT_DRAWER_FAVORITES));
	};

	return (
		<StyledIconButtonAsset onClick={handleOnClick} aria-label="Favorites button" disableRipple>
			<Tooltip title={favorites} arrow>
				<FavoriteIcon />
			</Tooltip>
		</StyledIconButtonAsset>
	);
};

export default ButtonFavorites;
