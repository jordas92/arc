/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { Box, FormHelperText, TextField } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { setNegativePrompt } from 'store/storeSlices/sliceOpenedProjects';
import strings from 'constants/strings';
import { MAX_LENGTH_NEGATIVE_PROMPT } from 'constants/default';

const { placeholderNegativePrompt, maxCharsNegativePrompt } = strings;

const InputNegativePrompt: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { currentNegativePrompt } = useSliceOpenedProjects();

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		dispatch(setNegativePrompt(value));
	};

	const hasError = currentNegativePrompt.length > MAX_LENGTH_NEGATIVE_PROMPT;

	// TODO_NEXT Disable current Generation Button ?! tooltip?
	// Apply the same validation on it or extend the image size validation
	const renderError = () => {
		return hasError ? maxCharsNegativePrompt : '';
	};

	return (
		<Box>
			<FormHelperText error sx={{ minHeight: '20px' }}>
				{renderError()}
			</FormHelperText>
			<TextField
				placeholder={placeholderNegativePrompt}
				variant="outlined"
				fullWidth
				multiline
				rows={3}
				onChange={handleOnChange}
				value={currentNegativePrompt}
				error={hasError}
				inputProps={{ maxLength: MAX_LENGTH_NEGATIVE_PROMPT + 1 }}
			/>
		</Box>
	);
};

export default InputNegativePrompt;
