/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { ToggleButton } from '@mui/material';

import strings from 'constants/strings';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import StyledToggleButtonGroup from 'components/StyledWrappers/StyledToggleButtonGroup';

import DrawerContainerAllImages from './DrawerContainerAllImages';
import DrawerContainerDiscord from './DrawerContainerDiscord';

const { allImages, discord } = strings;

const DrawerBodyLibrary: React.FC = () => {
	const [container, setContainer] = useState<string>(allImages);

	// MUI docs
	const handleOnChange = (e: React.MouseEvent<HTMLElement>, value: string | null) => {
		if (value !== null) {
			setContainer(value);
		}
	};

	const conditionalContent = () => {
		if (container === allImages) {
			return <DrawerContainerAllImages />;
		}

		return <DrawerContainerDiscord />;
	};

	return (
		<>
			<StyledContainerTools sx={{ padding: '4px', marginBottom: '4px' }}>
				<StyledToggleButtonGroup
					value={container}
					onChange={handleOnChange}
					aria-label="Libraries"
					exclusive
					fullWidth
					allRounded
				>
					<ToggleButton value={allImages}>{allImages}</ToggleButton>
					<ToggleButton value={discord}>{discord}</ToggleButton>
				</StyledToggleButtonGroup>
			</StyledContainerTools>
			{conditionalContent()}
		</>
	);
};

export default DrawerBodyLibrary;
