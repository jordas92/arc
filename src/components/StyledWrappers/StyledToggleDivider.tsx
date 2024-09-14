/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Divider } from '@mui/material';

const StyledToggleDivider = styled(Divider)(({ theme }) => ({
	backgroundColor: theme.palette.background.surfaceLow,
	border: `1px solid ${theme.palette.background.surfaceLow}`,
}));

export default StyledToggleDivider;
