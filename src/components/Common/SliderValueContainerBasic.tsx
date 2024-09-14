/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

type Props = {
	value: number;
	width?: string;
	color?: string;
	padding?: string;
	textAlign?: string;
	lineHeight?: number | string;
	variant?: TypographyProps['variant'];
};

const SliderValueContainerBasic: React.FC<Props> = ({
	value,
	width = '50px',
	color = 'text.active',
	padding = '2px 10px 1px',
	textAlign = 'right',
	lineHeight = 1.8,
	variant = 'h4',
}) => {
	return (
		<Typography
			variant={variant}
			color={color}
			component="span"
			sx={{
				borderRadius: '8px',
				padding: { padding },
				width,
				backgroundColor: 'background.surfaceHigh',
				lineHeight: { lineHeight },
				textAlign: { textAlign },
			}}
		>
			{value}
		</Typography>
	);
};

export default SliderValueContainerBasic;
