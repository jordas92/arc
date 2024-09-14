/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Menu, MenuItem, Typography } from '@mui/material';

import useSliceUser from '../../store/hooks/useSliceUser';
import useSliceAuthentication from '../../store/hooks/useSliceAuthentication';
import { useLogoutMutation } from '../../store/apis/apiAuthentication';

import strings from '../../constants/strings';

const { logoutText } = strings;

const styles = {
	menu: {
		'& .MuiMenu-paper': {
			top: '57px!important',
			right: '16px!important',
			left: 'auto!important',
			borderRadius: '8px',
			border: '1px solid',
			borderColor: 'background.surfaceHighest',
			width: '240px',
			padding: 0,
			backgroundColor: 'background.surfaceSolid',
			boxShadow: 'none',
		},
		'& .MuiList-root': {
			padding: 0,
			backgroundColor: 'background.surfaceSolid',
		},
	},
	menuItem: {
		padding: '10px 16px',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	menuItemBorderTop: {
		padding: '16px',
		borderTop: '1px solid',
		borderColor: 'background.surfaceHighest',
	},
	userName: {
		fontWeight: 700,
		fontSize: '16px',
	},
};

type Props = {
	items: Array<{
		title: string;
		link: string;
	}>;
	open: boolean;
	handleClick: (link: string) => void;
	onClose: () => void;
	anchorEl?: any;
};

const ProfileMenu: React.FC<Props> = ({ items, anchorEl, open, onClose, handleClick }) => {
	const { name } = useSliceUser();
	const { jwt } = useSliceAuthentication();
	const [logout] = useLogoutMutation();

	const handleLogout = () => {
		onClose();
		logout(jwt);
	};

	function onClick(link: string) {
		if (link) {
			handleClick(link);
		}
	}

	return (
		<Menu
			id="profileMenuBtn"
			open={open}
			anchorEl={anchorEl}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			sx={{ ...styles.menu }}
		>
			<MenuItem divider sx={{ pointerEvents: 'none', padding: '12px 16px 8px' }}>
				<Typography variant="navigationLink" sx={styles.userName}>
					{name}
				</Typography>
			</MenuItem>

			{items.map((page, index) => (
				<MenuItem
					key={`menu_item_${index}`}
					onClick={() => onClick(page.link)}
					sx={{ ...styles.menuItem }}
				>
					<Typography variant="navigationLink">{page.title}</Typography>
				</MenuItem>
			))}

			<MenuItem
				onClick={handleLogout}
				sx={{ ...styles.menuItem, ...styles.menuItemBorderTop }}
			>
				<Typography variant="navigationLink">{logoutText}</Typography>
			</MenuItem>
		</Menu>
	);
};

export default ProfileMenu;
