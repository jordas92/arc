/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import routesPaths from 'routes/paths';

const StyledList = styled(List)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',

	li: {
		padding: 0,
		textWrap: 'nowrap',
		color: theme.palette.text.active,
		backgroundColor: 'unset',
		transition: '0.3s',

		svg: {
			path: {
				stroke: theme.palette.text.active,
				transition: '0.3s',
			},
		},

		'.MuiButtonBase-root': {
			borderRadius: '8px',
		},

		'.MuiButtonBase-root:hover': {
			color: theme.palette.text.hover,
			backgroundColor: 'transparent',

			svg: {
				path: {
					stroke: theme.palette.primary.main,
				},
			},
		},

		'.Mui-selected': {
			color: theme.palette.text.hover,
			backgroundColor: theme.palette.background.surfaceLow,

			svg: {
				path: {
					stroke: theme.palette.primary.main,
				},
			},

			'&:hover': {
				backgroundColor: theme.palette.background.surfaceLow,
				cursor: 'default',
			},
		},
	},
}));

type ProfileSidebarItemProps = {
	title: string;
	pagesList: any[];
};

const ProfileSidebarItem = ({ title, pagesList }: ProfileSidebarItemProps) => {
	const location = useLocation();
	const navigate = useNavigate();

	const { pathname } = location;

	const handleOnClick = (routePath: keyof typeof routesPaths) => {
		navigate(routePath);
	};

	return (
		<Box sx={{ marginBottom: '50px' }}>
			<Typography variant="profileSidebarTitle" component="p" sx={{ marginBottom: '20px' }}>
				{title}
			</Typography>
			{pagesList && (
				<StyledList sx={{ padding: 0 }}>
					{pagesList.map((item, index) => (
						<ListItem key={index} disablePadding>
							<ListItemButton
								component="button"
								selected={pathname === item.routePath}
								onClick={() => handleOnClick(item.routePath)}
							>
								<ListItemIcon sx={{ minWidth: 'unset', marginRight: '12px' }}>
									{item.icon}
								</ListItemIcon>
								<ListItemText>
									<Typography variant="h6">{item.label}</Typography>
								</ListItemText>
							</ListItemButton>
						</ListItem>
					))}
				</StyledList>
			)}
		</Box>
	);
};

export default ProfileSidebarItem;
