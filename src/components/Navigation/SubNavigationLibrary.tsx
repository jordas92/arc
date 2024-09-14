/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { myLibraryPageKeys } from 'store/common/keys';
import useSliceApp from 'store/hooks/useSliceApp';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { setLibraryPageSubNav } from 'store/storeSlices/sliceApp';
import { resetImagesSlice } from 'store/storeSlices/sliceImages';

import { ReactComponent as DiscordIcon } from 'assets/img/icons/discord.svg';
import { ReactComponent as FavoritesIcon } from 'assets/img/icons/like.svg';
import strings from 'constants/strings';
import StyledList from 'components/Common/StyledList';

const styles = {
	listItemButton: {
		padding: '4px 16px',
		height: '32px',
	},
	listItemIcon: {
		minWidth: 'unset',
		width: '16px',
		marginTop: '2px',
		marginRight: '4px',
	},
};

const { allImages, favorites, discord } = strings;
const { ALL_IMAGES, FAVORITES, DISCORD } = myLibraryPageKeys;

const navButtons = [
	{
		label: allImages,
		icon: null,
		contentKey: ALL_IMAGES as keyof typeof myLibraryPageKeys,
	},
	{
		label: favorites,
		icon: <FavoritesIcon />,
		contentKey: FAVORITES as keyof typeof myLibraryPageKeys,
	},
	{
		label: discord,
		icon: <DiscordIcon />,
		contentKey: DISCORD as keyof typeof myLibraryPageKeys,
	},
];

const SubNavigationLibrary: React.FC = () => {
	const dispatch = useStoreDispatch();

	const { libraryPageSubNav } = useSliceApp();

	const handleOnClick = (contentKey: keyof typeof myLibraryPageKeys) => {
		if (contentKey !== libraryPageSubNav) {
			dispatch(setLibraryPageSubNav(contentKey));
			dispatch(resetImagesSlice());
		}
	};

	return (
		<nav aria-label="My Library Page Navigation">
			<StyledList>
				{navButtons.map((item) => (
					<ListItem key={item.label}>
						<ListItemButton
							component="button"
							selected={libraryPageSubNav === item.contentKey}
							onClick={() => handleOnClick(item.contentKey)}
							sx={styles.listItemButton}
						>
							{item.icon && (
								<ListItemIcon sx={styles.listItemIcon}>{item.icon}</ListItemIcon>
							)}
							<ListItemText sx={{ m: 0 }}>
								<Typography variant="h5">{item.label}</Typography>
							</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
			</StyledList>
		</nav>
	);
};

export default SubNavigationLibrary;
