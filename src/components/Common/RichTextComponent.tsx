/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React from 'react';
import { Typography } from '@mui/material';

type Props = {
	richText: string;
	component: string;
	variant: string;
	sx: any;
};

const RichTextComponent: React.FC<Props> = ({ richText, variant, component, sx }) => {
	return (
		<Typography
			variant={variant as any}
			sx={sx}
			component={component as any}
			dangerouslySetInnerHTML={{ __html: richText }}
		/>
	);
};

export default RichTextComponent;
