/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { ToggleButton } from '@mui/material';

import strings from 'constants/strings';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import StyledToggleButtonGroup from 'components/StyledWrappers/StyledToggleButtonGroup';

import DrawerContainerFavoritesProject from './DrawerContainerFavoritesProject';
import DrawerContainerFavoritesAll from './DrawerContainerFavoritesAll';

const { thisProject, allProjects } = strings;

const DrawerBodyFavorites: React.FC = () => {
	const [container, setContainer] = useState<string>(thisProject);

	// MUI docs
	const handleOnChange = (e: React.MouseEvent<HTMLElement>, value: string | null) => {
		if (value !== null) {
			setContainer(value);
		}
	};

	const conditionalContent = () => {
		if (container === thisProject) {
			return <DrawerContainerFavoritesProject />;
		}

		return <DrawerContainerFavoritesAll />;
	};

	return (
		<>
			<StyledContainerTools sx={{ padding: '4px', marginBottom: '16px' }}>
				<StyledToggleButtonGroup
					value={container}
					onChange={handleOnChange}
					aria-label="Favorites"
					exclusive
					fullWidth
					allRounded
				>
					<ToggleButton value={thisProject}>{thisProject}</ToggleButton>
					<ToggleButton value={allProjects}>{allProjects}</ToggleButton>
				</StyledToggleButtonGroup>
			</StyledContainerTools>
			{conditionalContent()}
		</>
	);
};

export default DrawerBodyFavorites;
