/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

import StyledHeaderWrapper from 'components/StyledWrappers/StyledHeaderWrapper';
import ButtonLogo from './HeaderFeatures/ButtonLogo';
import ButtonHome from './HeaderFeatures/ButtonHome';
import ButtonHelp from './HeaderFeatures/ButtonHelp';
import ButtonCredits from './HeaderFeatures/ButtonCredits';
import ButtonProfile from './HeaderFeatures/ButtonProfile';
import ButtonHistory from './HeaderFeatures/ButtonHistory';
import ButtonLibrary from './HeaderFeatures/ButtonLibrary';
import ButtonFavorites from './HeaderFeatures/ButtonFavorites';
import ProjectTitle from './HeaderFeatures/ProjectTitle';

const AppHeader: React.FC = () => {
	const location = useLocation();
	const { pathname } = location;

	const conditionalContent = () => {
		if (pathname.includes('/project/')) {
			return (
				<>
					<Box sx={{ display: 'flex' }}>
						<ButtonHome />
						<ButtonLibrary />
						<ButtonHistory />
						<ButtonFavorites />
						<ProjectTitle />
					</Box>
					<Box>
						<ButtonHelp />
						<ButtonCredits />
						<ButtonProfile />
					</Box>
				</>
			);
		}

		return (
			<>
				<Box>
					<ButtonLogo />
					<ButtonHome />
				</Box>
				<Box>
					<ButtonHelp />
					<ButtonCredits />
					<ButtonProfile />
				</Box>
			</>
		);
	};

	return <StyledHeaderWrapper>{conditionalContent()}</StyledHeaderWrapper>;
};

export default AppHeader;
