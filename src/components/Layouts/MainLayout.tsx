/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';

import useSliceUser from 'store/hooks/useSliceUser';
import useSliceAuthentication from 'store/hooks/useSliceAuthentication';

import { APP_TITLE, PAGE_TITLE_HOME } from 'constants/default';
import routesPaths from 'routes/paths';
import OverlayLoader from 'components/Feedback/OverlayLoader';
import AppHeader from 'components/Header/AppHeader';
import SnackbarPositioned from 'components/Feedback/SnackbarPositioned';
import Modals from 'components/Dialogs/Modals';
// REFRESH_AUTHENTICATION - currently disabled and not supported by the BE
// import RefreshAuthentication from 'components/Auth/RefreshAuthentication';
import PusherComponent from 'components/Pusher/Pusher';
import MobileViewScreen from 'components/MobileViewScreen/MobileViewScreen';

const { MY_PROJECTS, BUY_CREDITS } = routesPaths;

const MainLayout: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;

	const { id: userId } = useSliceUser();
	const { isAuthenticated } = useSliceAuthentication();

	const [showWebVersion, setShowWebVersion] = useState(false);

	const isMobile = useMediaQuery('(max-width: 1024px)');
	const isBuyCreditsPage = location.pathname.startsWith(BUY_CREDITS.split('/:')[0]);

	useEffect(() => {
		if (pathname === '/') {
			navigate(MY_PROJECTS);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const conditionalContent = () => {
		if (isAuthenticated) {
			return (
				<>
					<Helmet>
						<title>
							{PAGE_TITLE_HOME} | {APP_TITLE}
						</title>
					</Helmet>

					{/* REFRESH_AUTHENTICATION - currently disabled and not supported by the BE */}
					{/* <RefreshAuthentication /> */}
					<PusherComponent />

					{isMobile && userId && !showWebVersion && !isBuyCreditsPage ? (
						<MobileViewScreen onGoToWebVersion={() => setShowWebVersion(true)} />
					) : (
						<>
							<AppHeader />
							<Box component="main" sx={{ flexGrow: 1 }}>
								<Outlet />
							</Box>
						</>
					)}

					<SnackbarPositioned />
					<OverlayLoader />
					<Modals />
				</>
			);
		}

		return null;
	};

	return <>{conditionalContent()}</>;
};

export default MainLayout;
