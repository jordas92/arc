/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';

import {
	Box,
	InputBase,
	Typography,
	Button,
	DialogActions,
	FormHelperText,
	useTheme,
} from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import { closeModal } from 'store/storeSlices/sliceApp';
import { useSavePromptMutation, useUpdateSavedPromptMutation } from 'store/apis/apiSavedPrompts';
import { modalsKeys } from 'store/common/keys';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';

import storeStrings from 'store/common/strings';
import {
	MAX_PROMPT_TITLE_WORDS,
	MAX_PROMPT_TITLE_LENGTH,
	MAX_LENGTH_PROMPT,
} from 'constants/default';
import strings from 'constants/strings';
import StyledDialog from 'components/StyledWrappers/StyledDialog';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';
import InputSavedPrompt from './InputSavedPrompt';

type Props = {
	origin: keyof typeof modalsKeys;
	prompt: string;
	id?: string;
	title?: string;
};

const { EDIT_SAVED_PROMPT, SAVE_PROMPT } = modalsKeys;

const {
	dialogTitleSavePrompt,
	dialogTitleRenameSavedPrompt,
	btnSavePrompt,
	btnDontSave,
	btnRetry,
	name,
	optional,
	fullprompt,
	maxPromptTitleWords,
	maxPromptTitleLength,
} = strings;

const { promptLengthExceeded } = storeStrings;

const DialogHeader = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
});

const DialogSaveEditPrompt: React.FC<Props> = ({ origin, prompt, id = '', title = '' }) => {
	const dispatch = useStoreDispatch();
	const theme = useTheme();
	const [savePrompt, { isSuccess: isSuccessSave, isError: isErrorSave }] =
		useSavePromptMutation();
	const [updateSavedPrompt, { isSuccess: isSuccessEdit, isError: isErrorEdit }] =
		useUpdateSavedPromptMutation();

	const [promptName, setPromptName] = useState<string>(title);
	const [currentPrompt, setCurrentPrompt] = useState<string>(prompt);

	const isSuccess = isSuccessSave || isSuccessEdit;
	const isError = isErrorSave || isErrorEdit;

	useEffect(() => {
		if (isSuccess) {
			dispatch(closeModal());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isSuccess]);

	const handleOnClickClose = () => {
		dispatch(closeModal());
	};

	const handleOnClickCancel = () => {
		dispatch(closeModal());
	};

	const getPlaceholder = () => {
		return currentPrompt.substring(0, 32);
	};

	const isTitleAboveLimit = () => {
		const wordsCountLimit = MAX_PROMPT_TITLE_WORDS;
		const wordsCount = promptName.split(' ').length;

		return wordsCount > wordsCountLimit;
	};

	const conditionalErrorTitle = () => {
		if (promptName.length > MAX_PROMPT_TITLE_LENGTH) {
			return maxPromptTitleLength;
		}

		if (isTitleAboveLimit()) {
			return maxPromptTitleWords;
		}

		return '';
	};

	const conditionalErrorPrompt = () => {
		if (currentPrompt.length >= MAX_LENGTH_PROMPT) {
			return promptLengthExceeded;
		}

		return '';
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { value } = e.target;

		setPromptName(value);
	};

	const handleOnClickSave = () => {
		const promptTtitle = promptName || getPlaceholder();

		switch (origin) {
			case SAVE_PROMPT: {
				const requestBody = () => {
					return {
						title: promptTtitle,
						prompt: currentPrompt,
					};
				};

				savePrompt(requestBody());
				break;
			}

			case EDIT_SAVED_PROMPT: {
				const requestBody = {
					id,
					title: promptTtitle,
					prompt: currentPrompt,
				};

				updateSavedPrompt(requestBody);
				break;
			}

			default:
				break;
		}
	};

	const conditionalDialogTitle = () => {
		switch (origin) {
			case SAVE_PROMPT:
				return dialogTitleSavePrompt;

			case EDIT_SAVED_PROMPT:
				return dialogTitleRenameSavedPrompt;

			default:
				return '';
		}
	};

	const isSaveBtnDisabled =
		!!conditionalErrorTitle() || !!conditionalErrorPrompt() || !currentPrompt;

	return (
		<StyledDialog open onClose={handleOnClickClose} height="520px">
			<Box>
				<DialogHeader>
					<Typography variant="h3" component="h3">
						{conditionalDialogTitle()}
					</Typography>
					<StyledIconButtonAsset onClick={handleOnClickClose} sx={{ padding: '0' }}>
						<CloseIcon />
					</StyledIconButtonAsset>
				</DialogHeader>

				<Box sx={{ margin: '24px 0' }}>
					<Box>
						<Box display="flex">
							<Typography variant="h5">{name}</Typography>
							<Typography
								variant="h5"
								sx={{ margin: '0 6px', color: theme.palette.text.active }}
							>{`(${optional})`}</Typography>
						</Box>
						<StyledContainerTools sx={{ marginTop: '8px' }}>
							<InputBase
								placeholder={getPlaceholder()}
								value={promptName}
								onChange={(e) => handleOnChange(e)}
								inputProps={{
									'aria-label': 'prompt name',
									maxLength: MAX_PROMPT_TITLE_LENGTH + 1,
								}}
								sx={{
									width: '100%',
									'.MuiInputBase-input': {
										fontSize: '14px',
										padding: '0',
										textOverflow: 'ellipsis',
									},
								}}
							/>
						</StyledContainerTools>
						<FormHelperText
							error
							sx={{ minHeight: '24px', margin: '0', padding: '4px 0 0 14px' }}
						>
							{conditionalErrorTitle()}
						</FormHelperText>
					</Box>
					<Box sx={{ marginTop: '8px' }}>
						<Typography variant="h5">{fullprompt}</Typography>
						<InputSavedPrompt
							prompt={currentPrompt}
							setPrompt={setCurrentPrompt}
							conditionalError={conditionalErrorPrompt}
							rows={8}
						/>
					</Box>
				</Box>
			</Box>

			<DialogActions>
				<Button variant="flat" onClick={handleOnClickCancel} sx={{ width: '150px' }}>
					{btnDontSave}
				</Button>
				<Button
					variant="primary"
					onClick={handleOnClickSave}
					disabled={isSaveBtnDisabled}
					sx={{ width: '150px' }}
				>
					{isError ? btnRetry : btnSavePrompt}
				</Button>
			</DialogActions>
		</StyledDialog>
	);
};

export default DialogSaveEditPrompt;
