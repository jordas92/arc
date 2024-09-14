/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

type CustomProps = {
	hasBorder?: boolean;
	maxHeight?: string;
};

const StyledControlsContainerInside = styled(Box, {
	shouldForwardProp: (prop: string) => !['hasBorder', 'maxHeight'].includes(prop),
})<CustomProps>(({ theme, maxHeight }) => ({
	backgroundColor: theme.palette.background.surfaceLow,
	padding: '16px',
	borderRadius: '8px',
	maxHeight,
	overflowY: 'auto',
	overflowX: 'hidden',
}));

export default StyledControlsContainerInside;
