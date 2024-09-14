/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';

type Props = {
	placeholder: string;
	handleSearchValue: Function;
	conatinerBorderRadius?: number;
	initialValue?: string;
};

const Search: React.FC<Props> = ({
	placeholder,
	handleSearchValue,
	conatinerBorderRadius = 8,
	initialValue = '',
}) => {
	const [searchValue, setSearchValue] = useState<string>(initialValue);

	const StyledMuiIcon = styled(SearchIcon)(({ theme }) => ({
		color: searchValue.trim() ? theme.palette.text.active : theme.palette.text.disabled,
		fontSize: '26px',
		marginTop: '2px',
	}));

	const handleOnClickClear = () => {
		setSearchValue('');
		handleSearchValue('');
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { value } = e.target;
		setSearchValue(value);
		handleSearchValue(value);
	};

	const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Escape') {
			setSearchValue('');
		} else {
			// Prevents autoselecting item while typing (default Select behaviour)
			e.stopPropagation();
		}
	};

	return (
		<StyledContainerTools
			sx={{
				display: 'flex',
				alignItems: 'center',
				justfyContent: 'space-between',
				padding: '8px 8px 8px 14px',
				minHeight: '48px',
				width: '100%',
				borderRadius: `${conatinerBorderRadius}px`,
			}}
		>
			<StyledMuiIcon />
			<InputBase
				autoFocus
				placeholder={placeholder}
				value={searchValue}
				onChange={(e) => handleOnChange(e)}
				onKeyDown={(e) => handleKeyboardEvent(e)}
				inputProps={{ 'aria-label': 'search' }}
				sx={{
					width: '100%',
					padding: '0 10px',
					'.MuiInputBase-input': { fontSize: '14px', padding: '0' },
				}}
			/>
			{!!searchValue && (
				<StyledIconButtonAsset
					onClick={handleOnClickClear}
					disableRipple
					hasBackground
					boxSize="22px"
					disabled={!searchValue}
					sx={{ padding: '0', svg: { scale: '0.8' } }}
				>
					<CloseIcon />
				</StyledIconButtonAsset>
			)}
		</StyledContainerTools>
	);
};

export default Search;
