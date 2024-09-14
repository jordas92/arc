/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { IconButton, Tooltip } from '@mui/material';

import strings from 'constants/strings';
import { ReactComponent as FavoriteIcon } from 'assets/img/icons/like.svg';

type ButtonProps = {
	isActive?: boolean;
};

const StyledIconButton = styled(IconButton, {
	shouldForwardProp: (prop: string) => !['isActive'].includes(prop),
})<ButtonProps>(({ theme, isActive }) => ({
	padding: '7px',
	borderRadius: '4px',
	backgroundColor: theme.palette.background.surfaceLowest,
	transition: '0.3s',

	svg: {
		width: '18px',
		height: '18px',
		path: {
			stroke: `${isActive ? theme.palette.primary.main : theme.palette.text.active}`,
			fill: `${isActive ? theme.palette.primary.main : 'none'}`,
			transition: '0.3s',
		},
	},

	'&:hover': {
		backgroundColor: theme.palette.background.surfaceLowest,
		svg: {
			path: {
				stroke: `${isActive ? theme.palette.primary.main : theme.palette.text.hover}`,
			},
		},
	},

	'&:disabled': {
		backgroundColor: theme.palette.background.surfaceLowest,
	},
}));

const { showFavorites } = strings;

type Props = {
	isActive: boolean;
	handleOnClick: Function;
};

const AllFavoriteImagesButton: React.FC<Props> = ({ isActive, handleOnClick }) => {
	const conditionalTooltipTitle = () => {
		if (!isActive) {
			return showFavorites;
		}

		return null;
	};

	return (
		<StyledIconButton
			isActive={isActive}
			onClick={() => handleOnClick()}
			disabled={isActive}
			sx={{ marginLeft: '12px' }}
		>
			<Tooltip title={conditionalTooltipTitle()} placement="top" arrow>
				<FavoriteIcon />
			</Tooltip>
		</StyledIconButton>
	);
};

export default AllFavoriteImagesButton;
