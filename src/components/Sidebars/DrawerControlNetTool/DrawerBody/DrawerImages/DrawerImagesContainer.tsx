/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Box, ToggleButton, Tooltip } from '@mui/material';

import useStoreDispatch from 'store/hooks/useStoreDispatch';
import useSliceControlNet from 'store/hooks/useSliceControlNet';
import { setIsImagesContainerExpanded } from 'store/storeSlices/sliceControlNet';

import strings from 'constants/strings';

import { ReactComponent as ArrowUpIcon } from 'assets/img/icons/arrowUp.svg';
import { ReactComponent as ArrowDownIcon } from 'assets/img/icons/arrowDown.svg';

import StyledToggleButtonGroupControlNetImages from './StyledToggleButtonGroupControlNetImages';
import DrawerImagesLibrary from './DrawerImagesLibrary';
import DrawerImagesHistory from './DrawerImagesHistory';
import DrawerImagesFavorites from './DrawerImagesFavorites';
import StyledExpandBtn from './StyledExpandBtn';

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	borderBottom: `1px inset ${theme.palette.background.surfaceLow}`,
	height: '34px',
	marginBottom: '12px',
}));

const { history, library, favorites, expand, collapse } = strings;

const DrawerImagesContainer: React.FC = () => {
	const dispatch = useStoreDispatch();
	const { openedControlNetDrawer, controlNetTools } = useSliceControlNet();
	const { isImagesContainerExpanded } = controlNetTools[openedControlNetDrawer];

	const [container, setContainer] = useState<string>(history);

	const handleOnChange = (e: React.MouseEvent<HTMLElement>, value: string | null) => {
		if (value !== null) {
			setContainer(value);
		}
	};

	const handleOnFavoritesBtnClick = () => {
		setContainer(favorites);
	};

	const handleOnClick = () => {
		dispatch(setIsImagesContainerExpanded(!isImagesContainerExpanded));
	};

	const conditionalTooltipTitle = () => {
		return isImagesContainerExpanded ? collapse : expand;
	};

	const conditionalContent = () => {
		switch (container) {
			case history:
				return <DrawerImagesHistory />;
			case library:
				return (
					<DrawerImagesLibrary handleOnFavoritesBtnClick={handleOnFavoritesBtnClick} />
				);
			case favorites:
				return <DrawerImagesFavorites />;
			default:
				return null;
		}
	};

	return (
		<>
			<StyledBox sx={{ marginTop: isImagesContainerExpanded ? 0 : '24px' }}>
				<StyledToggleButtonGroupControlNetImages
					value={container}
					onChange={handleOnChange}
					aria-label="Library and History images"
					exclusive
				>
					<ToggleButton value={history}>{history}</ToggleButton>
					<ToggleButton value={library}>{library}</ToggleButton>
				</StyledToggleButtonGroupControlNetImages>
				<Tooltip title={conditionalTooltipTitle()} placement="top" arrow>
					<StyledExpandBtn
						disableRipple
						onClick={handleOnClick}
						hasBackground={isImagesContainerExpanded}
					>
						{isImagesContainerExpanded ? <ArrowDownIcon /> : <ArrowUpIcon />}
					</StyledExpandBtn>
				</Tooltip>
			</StyledBox>
			{conditionalContent()}
		</>
	);
};

export default DrawerImagesContainer;
