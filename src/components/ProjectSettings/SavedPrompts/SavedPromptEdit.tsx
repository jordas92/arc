/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openModal } from 'store/storeSlices/sliceApp';
import { modalsKeys } from 'store/common/keys';

import strings from 'constants/strings';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';

type Props = {
	id: string;
	title: string;
	prompt: string;
};

const { editSavedPrompt } = strings;
const { EDIT_SAVED_PROMPT } = modalsKeys;

const SavedPromptEdit: React.FC<Props> = ({ id, title, prompt }) => {
	const dispatch = useStoreDispatch();

	const handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
		dispatch(
			openModal({
				type: EDIT_SAVED_PROMPT,
				data: { id, title, prompt },
			}),
		);
	};

	return (
		<StyledIconButtonMui
			onClick={handleOnClick}
			aria-label={editSavedPrompt}
			disableRipple
			sx={{ padding: '0', margin: '0 8px', pointerEvents: 'auto' }}
		>
			<EditIcon />
		</StyledIconButtonMui>
	);
};

export default SavedPromptEdit;
