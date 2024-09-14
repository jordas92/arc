/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

type CustomProps = {
	hasBorder?: boolean;
	height?: string;
};

const StyledControlsContainer = styled(Box, {
	shouldForwardProp: (prop: string) => !['hasBorder', 'height'].includes(prop),
})<CustomProps>(({ theme, hasBorder, height }) => ({
	height: height || 'initial',
	backgroundColor: theme.palette.background.surfaceLow,
	border: `${hasBorder ? `1px solid ${theme.palette.background.surfaceHighest}` : 'unset'}`,
	padding: '16px',
	borderBottomRightRadius: '8px',
	borderBottomLeftRadius: '8px',
}));

export default StyledControlsContainer;
