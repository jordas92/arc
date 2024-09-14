/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { Box, Button, FormControl, MenuItem, Typography } from '@mui/material';

import { setPrompt } from 'store/storeSlices/sliceOpenedProjects';
import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceSavedPrompts from 'store/hooks/useSliceSavedPrompts';
import { SavedPrompt } from 'store/types/typesSavedPrompts';

import strings from 'constants/strings';
import StyledSelect from 'components/StyledWrappers/StyledSelect';
import SavedPromptLoadMore from './SavedPromptLoadMore';
import SavedPromptEdit from './SavedPromptEdit';
import SavedPromptDelete from './SavedPromptDelete';

const { savedPrompts } = strings;

const StyledBox = styled(Box)({
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	alignItems: 'center',
});

const StyledMenuItem = styled(MenuItem)({
	padding: '10px 6px 10px 12px',

	'&.Mui-disabled': {
		opacity: '1',
	},

	'&.MuiButtonBase-root:hover': {
		backgroundColor: 'transparent',
	},
});

// THEME_NEXT create button variant
const StyledButton = styled(Button)(({ theme }) => ({
	pointerEvents: 'auto',
	color: theme.palette.text.active,
	textTransform: 'none',
	textAlign: 'left',
	padding: '0',
	minWidth: '5px',

	'&:hover': {
		color: theme.palette.text.hover,
		backgroundColor: 'unset',
	},
}));

const SavedPrompts: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { items, nextPage } = useSliceSavedPrompts();

	const handleOnClickTile = (id: string) => {
		const item = items.find((item: SavedPrompt) => item.id === id);

		if (item) {
			dispatch(setPrompt(item.prompt));
		}
	};

	const isSelectDisabled = !(items.length > 0);

	return (
		<FormControl fullWidth>
			<StyledSelect
				name={savedPrompts}
				displayEmpty
				value=""
				inputProps={{ 'aria-label': `${savedPrompts}` }}
				renderValue={() => savedPrompts}
				disabled={isSelectDisabled}
				MenuProps={{
					// THEME_NEXT
					PaperProps: {
						style: {
							maxHeight: '50vh',
							margin: '5px 0',
							padding: '5px',
						},
					},
				}}
			>
				{items.map((item: SavedPrompt) => {
					return (
						<StyledMenuItem key={item.id} value={item.title} disabled>
							<StyledBox>
								<StyledButton onClick={() => handleOnClickTile(item.id)}>
									<Typography noWrap sx={{ width: '140px' }}>
										{item.title}
									</Typography>
								</StyledButton>

								<Box>
									<SavedPromptEdit
										id={item.id}
										title={item.title}
										prompt={item.prompt}
									/>
									<SavedPromptDelete id={item.id} />
								</Box>
							</StyledBox>
						</StyledMenuItem>
					);
				})}
				<SavedPromptLoadMore nextPage={nextPage} />
			</StyledSelect>
		</FormControl>
	);
};

export default SavedPrompts;
