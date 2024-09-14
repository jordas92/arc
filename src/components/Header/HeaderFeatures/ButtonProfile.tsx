/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import ProfileMenu from '../../Menus/ProfileMenu';
import useSliceUser from '../../../store/hooks/useSliceUser';
import strings from '../../../constants/strings';
import routesPaths from '../../../routes/paths';

const { profileSettings, security } = strings;
const { PROFILE_SETTINGS, PROFILE_SECURITY } = routesPaths;

const pagesLinks = [
	{ title: profileSettings, link: PROFILE_SETTINGS },
	{ title: security, link: PROFILE_SECURITY },
];

const ButtonProfile: React.FC = () => {
	const navigate = useNavigate();
	const { avatar } = useSliceUser();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

	const handleOnClickOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
		setMenuOpen(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setMenuOpen(false);
	};

	const handleClick = (link: string) => {
		if (link) {
			navigate(link);
		}
		setAnchorEl(null);
		setMenuOpen(false);
	};

	return (
		<>
			<IconButton
				id="profileMenuBtn"
				aria-controls={isMenuOpen ? 'profileMenuBtn' : undefined}
				aria-haspopup="true"
				aria-expanded={isMenuOpen ? 'true' : undefined}
				onClick={handleOnClickOpenMenu}
				disableRipple
			>
				<Tooltip title="My Profile" key="my_profile_icon_button" arrow>
					<Avatar src={avatar} sx={{ width: 30, height: 30 }} />
				</Tooltip>
			</IconButton>

			{isMenuOpen && (
				<ProfileMenu
					items={pagesLinks}
					anchorEl={anchorEl}
					open={isMenuOpen}
					onClose={handleClose}
					handleClick={handleClick}
				/>
			)}
		</>
	);
};

export default ButtonProfile;
