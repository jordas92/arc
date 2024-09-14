/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import { styled } from '@mui/system';
import { IconButton, Tooltip } from '@mui/material';

import strings from 'constants/strings';
import { ReactComponent as VariationsIcon } from 'assets/img/icons/variationsIcon.svg';

// THEME_NEXT
const StyledIconButton = styled(IconButton)({
	padding: '3px 7px',
	svg: {
		path: {
			stroke: 'darkgoldenrod',
			transition: '0.3s',
		},
	},

	'&:hover': {
		svg: {
			path: {
				stroke: 'yellow',
			},
		},
	},
});

const { variationsImage } = strings;

type Props = {
	imageId: string;
	type: string;
};

// TODO_NEXT type of the prompt is needed, so the image can be send for variations
// TODO_NEXT only images generated initially in the system can be send for variations
// TODO_NEXT there types are VARIATION_TEXT, TEXT

const BtnVariationsImage: React.FC<Props> = ({ imageId, type }) => {
	// TODO_NEXT add const isButtonDisabled =
	const handleOnClick = () => {
		console.log('image variations', imageId, type);
	};

	return (
		<StyledIconButton onClick={handleOnClick} aria-label="Variations button" disableRipple>
			<Tooltip title={variationsImage} arrow>
				<VariationsIcon />
			</Tooltip>
		</StyledIconButton>
	);
};

export default BtnVariationsImage;
