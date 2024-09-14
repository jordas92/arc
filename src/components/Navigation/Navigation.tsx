/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import BrushIcon from '@mui/icons-material/Brush';
import YouTubeIcon from '@mui/icons-material/YouTube';
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';

import { ReactComponent as FoldersIcon } from 'assets/img/icons/folders.svg';
import { ReactComponent as StarIcon } from 'assets/img/icons/star.svg';
import routesPaths from 'routes/paths';
import strings from 'constants/strings';
import BtnCreateProject from 'components/Common/Buttons/BtnCreateProject';
import StyledColorfulTypography from 'components/StyledWrappers/StyledColorfulTypography';

const { myProjects, myLibrary, discover, tutorials, recommended } = strings;
const { MY_PROJECTS, MY_LIBRARY, TUTORIALS, DISCOVER } = routesPaths;

const navButtons = [
	{
		label: myProjects,
		icon: <BrushIcon fontSize="small" />,
		routePath: MY_PROJECTS as keyof typeof routesPaths,
		additionalLabel: '',
	},
	{
		label: myLibrary,
		icon: <FoldersIcon />,
		routePath: MY_LIBRARY as keyof typeof routesPaths,
		additionalLabel: '',
	},
	{
		label: discover,
		icon: <StarIcon />,
		routePath: DISCOVER as keyof typeof routesPaths,
		additionalLabel: '',
	},
	{
		label: tutorials,
		icon: <YouTubeIcon />,
		routePath: TUTORIALS as keyof typeof routesPaths,
		additionalLabel: recommended,
	},
];

const NavigationWrapper = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '24px 0',
});

// THEME_NEXT
const StyledList = styled(List)(({ theme }) => ({
	display: 'flex',

	li: {
		padding: 0,
		textWrap: 'nowrap',
		marginRight: '5px',
		color: theme.palette.text.active,
		backgroundColor: 'unset',
		transition: '0.3s',

		svg: {
			path: {
				stroke: theme.palette.text.active,
			},
		},

		'.MuiSvgIcon-root': {
			color: theme.palette.text.active,
			fill: 'none',
			strokeWidth: '1.5px',
		},

		'.MuiButtonBase-root:hover': {
			color: theme.palette.text.hover,
			backgroundColor: 'transparent',

			svg: {
				path: {
					stroke: theme.palette.text.hover,
				},
			},
		},

		'.Mui-selected': {
			color: theme.palette.text.hover,
			borderRadius: '8px',
			backgroundColor: theme.palette.background.surfaceLow,

			svg: {
				path: {
					stroke: theme.palette.text.hover,
				},
			},

			'&:hover': {
				backgroundColor: theme.palette.background.surfaceLow,
				cursor: 'default',
			},
		},
	},
}));

const NavigationProject: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const { pathname } = location;

	const handleOnClick = (routePath: keyof typeof routesPaths) => {
		if (pathname === routePath) {
			return;
		}

		navigate(routePath);
	};

	return (
		<NavigationWrapper>
			<nav aria-label="Main App Navigation">
				<StyledList>
					{navButtons.map((item) => (
						<ListItem key={item.label}>
							<ListItemButton
								component="button"
								selected={pathname === item.routePath}
								onClick={() => handleOnClick(item.routePath)}
							>
								<ListItemIcon sx={{ minWidth: 'unset', marginRight: '8px' }}>
									{item.icon}
								</ListItemIcon>
								<ListItemText>
									<Typography variant="h4">{item.label}</Typography>
								</ListItemText>
								{item.additionalLabel && (
									<ListItemText sx={{ marginLeft: '6px' }}>
										<StyledColorfulTypography variant="body3" component="span">
											{item.additionalLabel}
										</StyledColorfulTypography>
									</ListItemText>
								)}
							</ListItemButton>
						</ListItem>
					))}
				</StyledList>
			</nav>
			<BtnCreateProject />
		</NavigationWrapper>
	);
};

export default NavigationProject;
