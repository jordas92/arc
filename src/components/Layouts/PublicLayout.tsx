/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import SnackbarPositioned from '../Feedback/SnackbarPositioned';
import { APP_TITLE } from '../../constants/default';
import routesPaths from '../../routes/paths';

const { SIGN_IN } = routesPaths;

const PublicLayout: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	useEffect(() => {
		// Check if the current path is "/"
		const isRootPath = pathname === '/';
		// Check if there is no path after the origin
		const hasNoPath = pathname === pathname.split('/')[0];
		if (isRootPath || hasNoPath) {
			navigate(SIGN_IN);
		}
	}, [navigate, pathname]);

	return (
		<>
			<Helmet>
				<title>{APP_TITLE}</title>
			</Helmet>

			<Box component="main" sx={{ flexGrow: 1 }}>
				<Outlet />
			</Box>

			<SnackbarPositioned />
		</>
	);
};

export default PublicLayout;
