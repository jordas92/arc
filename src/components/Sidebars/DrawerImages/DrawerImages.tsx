import React from 'react';
import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { closeDrawer } from 'store/storeSlices/sliceOpenedProjects';
import { drawersKeys } from 'store/common/keys';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import strings from 'constants/strings';
import StyledDrawer from 'components/StyledWrappers/StyledDrawer';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';

import DrawerBodyLibrary from './DrawerBodyLibrary/DrawerBodyLibrary';
import DrawerBodyHistory from './DrawerBodyHistory/DrawerBodyHistory';
import DrawerBodyFavorites from './DrawerBodyFavorites/DrawerBodyFavorites';

const { PROJECT_DRAWER_LIBRARY, PROJECT_DRAWER_HISTORY, PROJECT_DRAWER_FAVORITES } = drawersKeys;
const { library, projectHistory, favoritedImages } = strings;

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	marginBottom: '18px',
});

export const DrawerImages: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { openedDrawer } = useSliceOpenedProjects();

	const handleOnClose = () => {
		dispatch(closeDrawer());
	};

	const conditionalContent = () => {
		switch (openedDrawer) {
			case PROJECT_DRAWER_LIBRARY:
				return {
					drawerTitle: library,
					container: <DrawerBodyLibrary />,
				};

			case PROJECT_DRAWER_HISTORY:
				return {
					drawerTitle: projectHistory,
					container: <DrawerBodyHistory />,
				};

			case PROJECT_DRAWER_FAVORITES:
				return {
					drawerTitle: favoritedImages,
					container: <DrawerBodyFavorites />,
				};

			default:
				return {
					drawerTitle: '',
					container: null,
				};
		}
	};

	return (
		<StyledDrawer anchor="left" open={!!openedDrawer} onClose={handleOnClose}>
			<StyledBox>
				<Typography variant="h4">{conditionalContent().drawerTitle}</Typography>

				<StyledIconButtonAsset onClick={handleOnClose} sx={{ padding: '0' }}>
					<CloseIcon />
				</StyledIconButtonAsset>
			</StyledBox>
			{conditionalContent().container}
		</StyledDrawer>
	);
};

export default DrawerImages;
