/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { ReactNode } from 'react';
import { styled } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import InfoIcon from '@mui/icons-material/Info';

import strings from 'constants/strings';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		width: 460,
		maxWidth: 460,
		padding: '16px',
	},
});

const StyledBtn = styled(IconButton)(({ theme }) => ({
	color: theme.palette.text.secondary,
	margin: '0 2px',
	padding: '4px 6px',
	backgroundColor: theme.palette.background.surfaceDarkLow,
	borderRadius: '55px',
	transition: '0.3s', // THEME_NEXT

	'&.Mui-disabled': {
		color: theme.palette.text.disabled,
	},

	'&:hover': {
		color: theme.palette.text.hover,
		backgroundColor: theme.palette.background.surfaceDarkLowest,
	},
}));

const { more } = strings;

type Props = {
	tooltip: string | ReactNode;
};

const BtnInfo: React.FC<Props> = ({ tooltip }) => {
	return (
		<CustomWidthTooltip title={tooltip} placement="bottom">
			<StyledBtn disableRipple>
				<InfoIcon sx={{ width: '12px', height: '12px' }} />
				<Typography variant="h6" sx={{ marginLeft: '4px' }}>
					{more}
				</Typography>
			</StyledBtn>
		</CustomWidthTooltip>
	);
};

export default BtnInfo;
