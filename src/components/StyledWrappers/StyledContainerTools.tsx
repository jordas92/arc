/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

type CustomProps = {
	hasBorder?: boolean;
};

const StyledContainerTools = styled(Box, {
	shouldForwardProp: (prop: string) => !['hasBorder'].includes(prop),
})<CustomProps>(({ theme, hasBorder }) => ({
	backgroundColor: theme.palette.background.surfaceLow,
	border: `${hasBorder ? `1px solid ${theme.palette.background.surfaceHighest}` : 'unset'}`,
	padding: '16px',
	borderRadius: '8px',
}));

export default StyledContainerTools;
