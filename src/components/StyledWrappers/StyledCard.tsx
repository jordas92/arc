/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Card } from '@mui/material';

type CustomProps = {
	hasBorder?: boolean;
	hasHoverBorder?: boolean;
};

const StyledCard = styled(Card, {
	shouldForwardProp: (prop: string) => !['hasBorder', 'hasHoverBorder'].includes(prop),
})<CustomProps>(({ theme, hasBorder, hasHoverBorder }) => ({
	border: `${hasBorder ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent'}`,
	borderRadius: '8px',
	transition: '0.3s',

	'&:hover': {
		border: `${
			hasHoverBorder ? `1px solid ${theme.palette.accent.primary}` : '1px solid transparent'
		}`,
	},

	'.MuiCardActionArea-root': {
		color: theme.palette.text.active,
		transition: '0.3s',

		'&:hover': {
			color: theme.palette.text.hover,
		},
	},

	'.MuiCardContent-root': {
		'&:last-child': {
			padding: '20px',
		},
	},
}));

export default StyledCard;
