/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDeleteSavedPromptMutation } from 'store/apis/apiSavedPrompts';

import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

type Props = {
	id: string;
};

const SavedPromptDelete: React.FC<Props> = ({ id }) => {
	const [deleteSavedPrompt] = useDeleteSavedPromptMutation();

	const handleOnClick = () => {
		deleteSavedPrompt(id);
	};

	return (
		<StyledIconButtonMui
			onClick={handleOnClick}
			aria-label="Delete Saved Prompt"
			disableRipple
			sx={{ padding: '0', pointerEvents: 'auto' }}
		>
			<DeleteIcon />
		</StyledIconButtonMui>
	);
};

export default SavedPromptDelete;
