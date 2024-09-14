/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

type CustomProps = {
	hasPadding?: boolean;
};

const StyledContainerGeneration = styled(Box, {
	shouldForwardProp: (prop: string) => !['hasPadding'].includes(prop),
})<CustomProps>(({ theme, hasPadding }) => ({
	backgroundColor: theme.palette.background.surfaceLowest,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: `${hasPadding ? '18px' : '0'}`,
	height: '100%',
	borderRadius: '4px',
}));

export default StyledContainerGeneration;
