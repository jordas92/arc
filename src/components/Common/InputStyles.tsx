/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useRef, useState } from 'react';
import { styled } from '@mui/system';
import {
	Checkbox,
	FormControl,
	ListItemText,
	MenuItem,
	OutlinedInput,
	ListSubheader,
	Typography,
	useTheme,
	ButtonBase,
} from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceStyles from 'store/hooks/useSliceStyles';
import useSliceOpenedProjects from 'store/hooks/useSliceOpenedProjects';
import { showNotification } from 'store/storeSlices/sliceNotification';
import { resetSelectedStyles, setSelectedStyles } from 'store/storeSlices/sliceOpenedProjects';
import { notificationSeverity } from 'store/common/keys';
import { Style } from 'store/types/typesStyles';

import strings from 'constants/strings';
import SearchClient from 'components/Common/SearchClient';
import StyledSelect from 'components/StyledWrappers/StyledSelect';
import useSelectedStylesNames from 'hooks/useSelectedStylesNames';

const { info } = notificationSeverity;
const {
	labelStyles,
	searchStylesPlaceHolder,
	noMatches,
	maximumStylesSelected,
	labelClearSelectedStyles,
} = strings;

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
	color: theme.palette.text.active,
	padding: '6px 10px',

	'.MuiCheckbox-root': {
		color: theme.palette.text.disabled,
	},

	'&:hover': {
		color: theme.palette.text.hover,
	},

	'&.Mui-selected': {
		backgroundColor: 'unset',
		color: theme.palette.text.hover,

		'&:hover': {
			backgroundColor: 'unset',
			color: theme.palette.text.active,
		},

		'.Mui-checked': {
			color: theme.palette.accent.primary,
		},
	},
}));

const StyledListBottomSubheader = styled(ListSubheader)(({ theme }) => ({
	bottom: '-1px',
	top: 'auto',
	lineHeight: 1,
	textAlign: 'center',
	backgroundColor: theme.palette.background.surfaceSolid,
	borderTop: `1px solid ${theme.palette.background.surfaceHighest}`,
}));

const StyledClearStylesBtn = styled(ButtonBase)<{ disabled: boolean }>(({ theme, disabled }) => ({
	transition: '0.3s',
	width: '100%',
	color: disabled ? theme.palette.text.disabled : theme.palette.text.textLowest,
}));

/**
 * Check MUI docs
 * https://mui.com/material-ui/react-select/#checkmarks
 */
const InputStyles: React.FC = () => {
	const dispatch = useStoreDispatch();
	const theme = useTheme();
	const styles = useSliceStyles();
	const { currentStyles: selectedStyles = [] } = useSliceOpenedProjects();
	const selectedStylesNames = useSelectedStylesNames(selectedStyles);

	const [filteredStyles, setFilteredStyles] = useState<Array<Style>>(styles);
	const orderedStylesRef = useRef<Array<Style>>(styles);

	const selectionsLimit = 2;

	const handleOnChange = (event) => {
		const {
			target: { value },
		} = event;

		dispatch(setSelectedStyles(value));

		if (value.length === selectionsLimit) {
			dispatch(
				showNotification({
					message: maximumStylesSelected,
					severity: info,
				}),
			);
		}
	};

	const handleClearStyles = () => {
		if (!selectedStyles.length) return;

		dispatch(resetSelectedStyles());
	};

	// move selected styles at the top of the passed list, keeping styles' order from the original list
	const orderStyles = (passedStyles: Style[]) => {
		if (!selectedStyles.length) return passedStyles;

		let insertIndex = 0;

		return passedStyles.reduce((acc, current) => {
			if (selectedStyles.includes(current.key)) {
				const copiedAcc = [...acc];
				copiedAcc.splice(insertIndex, 0, current);
				insertIndex += 1;

				return copiedAcc;
			}
			return [...acc, current];
		}, [] as Style[]);
	};

	const handleOnOpen = () => {
		const orderedStyles = orderStyles(styles);

		orderedStylesRef.current = orderedStyles;
		setFilteredStyles(orderedStyles);
	};

	const handleSearchValue = (searchValue: string) => {
		setFilteredStyles(
			orderedStylesRef.current.filter((item: Style) =>
				item.name.toLowerCase().includes(searchValue.toLowerCase()),
			),
		);
	};

	const renderValue = () => {
		if (selectedStyles.length === 0) {
			return labelStyles;
		}

		return selectedStylesNames;
	};

	const isPresentInSelectedStyles = (style: string) => {
		return selectedStyles.indexOf(style) > -1;
	};

	const conditionalContent = () => {
		if (filteredStyles.length === 0) {
			return (
				<Typography
					variant="h5"
					sx={{
						textAlign: 'center',
						margin: '16px 0',
						color: theme.palette.text.textLowest,
					}}
				>
					{noMatches}
				</Typography>
			);
		}

		return null;
	};

	return (
		<FormControl fullWidth>
			<StyledSelect
				multiple
				displayEmpty
				value={selectedStyles}
				onChange={handleOnChange}
				onOpen={handleOnOpen}
				input={<OutlinedInput />}
				inputProps={{ 'aria-label': 'Without label' }}
				renderValue={renderValue}
				MenuProps={{
					autoFocus: false,
					PaperProps: {
						style: {
							maxHeight: '50vh',
							width: '250px',
							margin: '5px 0',
							backgroundColor: theme.palette.background.surfaceSolid,
							// Select - PaperProps has backgroundImage by default, that act like 'opacity'
							backgroundImage: 'none',
							borderRadius: '8px',
							border: `1px solid ${theme.palette.background.surfaceHighest}`,
							clipPath: 'view-box',
						},
					},
					MenuListProps: {
						style: {
							padding: '0',
						},
					},
				}}
			>
				{/* SearchClient is put into ListSubheader so that it doesn't act as a selectable item in the menu */}
				<ListSubheader
					sx={{
						padding: '12px',
						backgroundColor: theme.palette.background.surfaceSolid,
					}}
				>
					<SearchClient
						placeholder={searchStylesPlaceHolder}
						handleSearchValue={handleSearchValue}
						conatinerBorderRadius={24}
					/>
				</ListSubheader>
				{filteredStyles.map((item: Style) => {
					return (
						<StyledMenuItem
							key={item.key}
							value={item.key}
							disabled={
								selectedStyles.length >= selectionsLimit &&
								!isPresentInSelectedStyles(item.key)
							}
						>
							<Checkbox checked={isPresentInSelectedStyles(item.key)} />
							<ListItemText primary={item.name} />
						</StyledMenuItem>
					);
				})}
				{conditionalContent()}
				<StyledListBottomSubheader disableGutters>
					<StyledClearStylesBtn
						disabled={!selectedStyles.length}
						onClick={handleClearStyles}
					>
						<Typography variant="body2" p="12px" fontWeight="600">
							{labelClearSelectedStyles}
						</Typography>
					</StyledClearStylesBtn>
				</StyledListBottomSubheader>
			</StyledSelect>
		</FormControl>
	);
};

export default InputStyles;
