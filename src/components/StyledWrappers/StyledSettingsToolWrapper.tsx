/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

type CustomProps = {
	margin?: string;
};

const StyledSettingsToolWrapper = styled(Box, {
	shouldForwardProp: (prop: string) => !['margin'].includes(prop),
})<CustomProps>(({ margin }) => ({
	margin: margin || '0 0 16px',
}));

export default StyledSettingsToolWrapper;
