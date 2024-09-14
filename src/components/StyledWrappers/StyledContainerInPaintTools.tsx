/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

type CustomProps = {
	hasBorder?: boolean;
};

const StyledContainerInPaintTools = styled(Box, {
	shouldForwardProp: (prop: string) => !['hasBorder'].includes(prop),
})<CustomProps>(({ theme, hasBorder }) => ({
	backgroundColor: theme.palette.background.surfaceLow,
	border: `${hasBorder ? `1px solid ${theme.palette.background.surfaceHighest}` : 'unset'}`,
	borderRadius: '8px',
	display: 'flex',
	justifyContent: 'space-between',
	maxHeight: '40px',
	marginTop: '4px',
	padding: '4px',
}));

export default StyledContainerInPaintTools;
