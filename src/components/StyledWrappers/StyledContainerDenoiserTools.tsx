/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

type CustomProps = {
	hasBorder?: boolean;
	disabled?: boolean;
};

const StyledContainerDenoiserTools = styled(Box, {
	shouldForwardProp: (prop: string) => !['hasBorder'].includes(prop),
})<CustomProps>(({ theme, hasBorder, disabled }) => ({
	backgroundColor: theme.palette.background.surfaceLow,
	color: disabled ? '#636363' : '',
	border: `${hasBorder ? `1px solid ${theme.palette.background.surfaceHighest}` : 'unset'}`,
	padding: '6px',
	marginLeft: '15px',
	width: '70px',
	borderRadius: '8px',
}));

export default StyledContainerDenoiserTools;
