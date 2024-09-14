/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';

import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import useSliceNotification from 'store/hooks/useSliceNotification';
import { setPrompt } from 'store/storeSlices/sliceOpenedProjects';
import { showNotification, clearNotification } from 'store/storeSlices/sliceNotification';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { generationToolsKeys, notificationSeverity } from 'store/common/keys';

// TODO_NEXT move 'storeStrings' into .../constants/strings ?!
import storeStrings from 'store/common/strings';
import strings from 'constants/strings';
import { MAX_LENGTH_PROMPT } from 'constants/default';
import StyledTextField from 'components/StyledWrappers/StyledTextField';

type Props = {
	maxRows: number;
	hasAutoFocus?: boolean;
	inputRef?: React.RefObject<HTMLElement>;
};

const { placeholderPromptDefault, placeholderPromptI2I, placeholderPromptEnhance } = strings;
const { promptLengthExceeded } = storeStrings;
const { IMAGE_TO_IMAGE, TOOL_ENHANCE } = generationToolsKeys;
const { warning } = notificationSeverity;

const InputPrompt: React.FC<Props> = ({ maxRows, hasAutoFocus = false, inputRef = undefined }) => {
	const dispatch = useStoreDispatch();
	const { currentGenerationTool, currentPrompt } = useSliceOpenedProjects();
	const { message: notificationMessage } = useSliceNotification();

	const conditionalPlaceholder = () => {
		switch (currentGenerationTool) {
			case IMAGE_TO_IMAGE:
				return placeholderPromptI2I;

			case TOOL_ENHANCE:
				return placeholderPromptEnhance;

			default:
				return placeholderPromptDefault;
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		// TODO_NEXT for MAC OS the key combination should be different!
		if (e.altKey && (e.key === 'Enter' || e.code === 'NumpadEnter')) {
			// TODO_NEXT
			// dispatch Generation Action
		}
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		if (value.length >= MAX_LENGTH_PROMPT) {
			dispatch(
				showNotification({
					message: promptLengthExceeded,
					severity: warning,
				}),
			);
		}

		if (notificationMessage && value.length < MAX_LENGTH_PROMPT) {
			dispatch(clearNotification());
		}

		if (value.length <= MAX_LENGTH_PROMPT) {
			dispatch(setPrompt(value));
		}
	};

	return (
		<StyledTextField
			inputRef={inputRef}
			autoFocus={hasAutoFocus}
			placeholder={conditionalPlaceholder()}
			variant="outlined"
			fullWidth
			multiline
			maxRows={maxRows}
			value={currentPrompt}
			size="small"
			onChange={handleOnChange}
			onKeyDown={handleKeyDown}
			InputLabelProps={{
				shrink: false,
			}}
			maxLength={MAX_LENGTH_PROMPT}
			padding="0 12px"
		/>
	);
};

export default InputPrompt;
