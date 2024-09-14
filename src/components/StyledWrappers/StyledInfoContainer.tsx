/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { styled } from '@mui/system';
import { Box } from '@mui/material';

type CustomProps = {
	light?: boolean;
	dark?: boolean;
	padding?: string;
	borderRadius?: string;
};

const StyledInfoContainer = styled(Box, {
	shouldForwardProp: (prop: string) =>
		!['light', 'dark', 'padding', 'borderRadius'].includes(prop),
})<CustomProps>(({ theme, light, dark, padding, borderRadius }) => {
	const backgroundColor = () => {
		if (light) {
			return theme.palette.text.selected;
		}

		if (dark) {
			return theme.palette.background.surfaceDarkLow;
		}

		return theme.palette.background.surfaceLow;
	};

	return {
		backgroundColor: backgroundColor(),
		color: `${light ? theme.palette.text.contrastDark : theme.palette.text.primary}`,
		padding: padding || '0 4px',
		borderRadius: borderRadius || '4px',
	};
});

export default StyledInfoContainer;
