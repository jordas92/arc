/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Collapse, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { toggleIsNegativePromptExpanded } from 'store/storeSlices/sliceOpenedProjects';

import strings from 'constants/strings';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';
import InputNegativePrompt from './InputNegativePrompt';

const { labelNegativePrompt } = strings;

const NegativePrompt: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentIsNegativePromptExpanded } = useSliceOpenedProjects();

	const handleOnClick = () => {
		dispatch(toggleIsNegativePromptExpanded());
	};

	const conditionalContent = () => {
		if (currentIsNegativePromptExpanded) {
			return <AddIcon />;
		}
		return <RemoveIcon />;
	};

	return (
		<Box>
			<Box display="flex" justifyContent="space-between" alignItems="center">
				{/* TODO_NEXT if error make the title in red?! */}
				<Typography variant="h5">{labelNegativePrompt}</Typography>
				<StyledIconButtonMui
					onClick={handleOnClick}
					aria-label="Toggle Expand and Collapse"
					disableRipple
					hasBackground
					boxSize="30px"
				>
					{conditionalContent()}
				</StyledIconButtonMui>
			</Box>

			<Collapse in={!currentIsNegativePromptExpanded}>
				<InputNegativePrompt />
			</Collapse>
		</Box>
	);
};

export default NegativePrompt;
