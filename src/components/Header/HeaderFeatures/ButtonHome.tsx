/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { clearCurrentProjectId } from 'store/storeSlices/sliceOpenedProjects';
import { resetImagesSlice } from 'store/storeSlices/sliceImages';
import { invalidationTags } from 'store/apis/common';
import { apiImages } from 'store';

import { ReactComponent as HomeIcon } from 'assets/img/icons/home.svg';
import routesPaths from 'routes/paths';
import strings from 'constants/strings';

import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

const { MY_PROJECTS } = routesPaths;
const { home } = strings;
const { clearAllFetchedImages } = invalidationTags;

const ButtonHome: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useStoreDispatch();

	const handleOnClick = () => {
		navigate(MY_PROJECTS);

		// Clearing the "apiImages" cache and slice
		// to fetch the items again when the "My Library Page" is visited
		dispatch(resetImagesSlice());
		dispatch(apiImages.util.invalidateTags([clearAllFetchedImages]));

		// Clearing the "clearCurrentProjectId" to have initial values for the inputs,
		// when the Project page is visited again till the Project data is loaded.
		dispatch(clearCurrentProjectId());
	};

	return (
		<StyledIconButtonAsset onClick={handleOnClick} aria-label="Home button" disableRipple>
			<Tooltip title={home} arrow>
				<HomeIcon />
			</Tooltip>
		</StyledIconButtonAsset>
	);
};

export default ButtonHome;
