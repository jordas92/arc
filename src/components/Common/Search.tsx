/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState, useEffect } from 'react';
import { Box, InputBase, FormHelperText, CircularProgress, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { ReactComponent as CloseIcon } from 'assets/img/icons/close.svg';
import { MAX_LENGTH_SEARCH } from 'constants/default';
import strings from 'constants/strings';
import useDebounce from 'hooks/useDebounce';
import StyledIconButtonAsset from 'components/StyledWrappers/StyledIconButtonAsset';
import StyledContainerTools from 'components/StyledWrappers/StyledContainerTools';

type Props = {
	placeholder: string;
	handleSearchValue: Function;
	isFetching: boolean;
	conatinerBorderRadius?: number;
	debouncedDelay?: number;
	initialValue?: string;
	minHeight?: string;
	padding?: string;
};

const { maxCharsSearch } = strings;

const Search: React.FC<Props> = ({
	placeholder,
	handleSearchValue,
	isFetching,
	conatinerBorderRadius = 8,
	debouncedDelay = 500,
	initialValue = '',
	minHeight,
	padding,
}) => {
	const [searchValue, setSearchValue] = useState<string>(initialValue);
	const debouncedValue = useDebounce(searchValue, debouncedDelay);

	const StyledMuiIcon = styled(SearchIcon)(({ theme }) => ({
		color: searchValue.trim() ? theme.palette.text.active : theme.palette.text.disabled,
		fontSize: '26px',
		marginTop: '2px',
	}));

	useEffect(() => {
		const trimmedDebouncedValue = debouncedValue.trim();
		const debouncedValueLength = debouncedValue.trim().length;
		if (
			trimmedDebouncedValue &&
			debouncedValueLength > 0 &&
			debouncedValueLength <= MAX_LENGTH_SEARCH
		) {
			handleSearchValue(trimmedDebouncedValue);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedValue]);

	// Will trigger a fetch when the input becomes empty
	useEffect(() => {
		if (debouncedValue && !searchValue) {
			handleSearchValue('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	const handleOnClickClear = () => {
		setSearchValue('');
		handleSearchValue('');
	};

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { value } = e.target;
		setSearchValue(value);
	};

	const handleKeyboardEvent = (e: React.KeyboardEvent<HTMLElement>) => {
		const trimmedSearchValue = searchValue.trim();
		const searchValueLength = trimmedSearchValue.length;
		if (
			e.key === 'Enter' &&
			trimmedSearchValue &&
			searchValueLength > 0 &&
			searchValueLength <= MAX_LENGTH_SEARCH
		) {
			handleSearchValue(trimmedSearchValue);
		}
	};

	const conditionalContent = () => {
		if (isFetching) {
			return (
				<CircularProgress
					size={16}
					thickness={5}
					disableShrink
					sx={{ margin: '0 8px 2px 4px' }}
				/>
			);
		}

		return <StyledMuiIcon />;
	};

	const conditionalError = () => {
		return searchValue.length > MAX_LENGTH_SEARCH ? maxCharsSearch : '';
	};

	return (
		<Box sx={{ marginBottom: '20px' }} onKeyDown={handleKeyboardEvent}>
			<FormHelperText error sx={{ minHeight: '20px', margin: '0', padding: '0 0 0 48px' }}>
				{conditionalError()}
			</FormHelperText>
			<StyledContainerTools
				sx={{
					display: 'flex',
					alignItems: 'center',
					justfyContent: 'space-between',
					padding: padding || '8px 8px 8px 14px',
					minHeight: minHeight || '48px',
					width: '100%',
					borderRadius: `${conatinerBorderRadius}px`,
				}}
			>
				{conditionalContent()}
				<InputBase
					placeholder={placeholder}
					value={searchValue}
					onChange={(e) => handleOnChange(e)}
					inputProps={{ 'aria-label': 'search', maxLength: MAX_LENGTH_SEARCH + 1 }}
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
		</Box>
	);
};

export default Search;
