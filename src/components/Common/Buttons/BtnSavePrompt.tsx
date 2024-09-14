/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, Tooltip, useTheme } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { openModal } from 'store/storeSlices/sliceApp';
import { closeDrawer } from 'store/storeSlices/sliceOpenedProjects';
import { modalsKeys } from 'store/common/keys';

import { MAX_LENGTH_PROMPT } from 'constants/default';
import StyledIconButtonMui from 'components/StyledWrappers/StyledIconButtonMui';
import useIsPromptSaved from 'hooks/useIsPromptSaved';

type Props = {
	prompt: string;
};

const { SAVE_PROMPT } = modalsKeys;

const BtnSavePrompt: React.FC<Props> = ({ prompt }) => {
	const dispatch = useStoreDispatch();
	const theme = useTheme();
	const { isPromptSaved, tooltip } = useIsPromptSaved(prompt);

	const handleOnClick = () => {
		dispatch(closeDrawer());
		dispatch(
			openModal({
				type: SAVE_PROMPT,
				data: { prompt },
			}),
		);
	};

	const conditionalContent = () => {
		if (isPromptSaved) {
			return <Bookmark sx={{ color: theme.palette.primary.main }} />;
		}

		return <BookmarkBorder />;
	};

	const isButtonDisabled = !prompt || isPromptSaved || prompt.length >= MAX_LENGTH_PROMPT;

	return (
		<Tooltip title={tooltip} placement="top" arrow>
			<Box>
				<StyledIconButtonMui
					onClick={handleOnClick}
					disabled={isButtonDisabled}
					disableRipple
				>
					{conditionalContent()}
				</StyledIconButtonMui>
			</Box>
		</Tooltip>
	);
};

export default BtnSavePrompt;
