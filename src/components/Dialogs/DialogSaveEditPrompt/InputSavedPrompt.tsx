/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { FormHelperText } from '@mui/material';

import StyledTextField from 'components/StyledWrappers/StyledTextField';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';

type Props = {
	prompt: string;
	setPrompt: Function;
	conditionalError: Function;
	rows: number;
};

const InputSavedPrompt: React.FC<Props> = ({ rows, prompt, setPrompt, conditionalError }) => {
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setPrompt(value);
	};

	return (
		<>
			<StyledContainerTools sx={{ marginTop: '8px' }}>
				<StyledTextField
					variant="outlined"
					fullWidth
					multiline
					rows={rows}
					value={prompt}
					size="small"
					onChange={handleOnChange}
					InputLabelProps={{
						shrink: false,
					}}
				/>
			</StyledContainerTools>
			<FormHelperText error sx={{ minHeight: '24px', margin: '0', padding: '4px 0 0 14px' }}>
				{conditionalError()}
			</FormHelperText>
		</>
	);
};

export default InputSavedPrompt;
