import React from 'react';
import { Box } from '@mui/material';

type Props = {
	componentName: string;
	bgColor?: string;
	padding?: string;
};

// CSS color names: 'orange', 'coral', 'peru', 'olive', 'cornflowerblue'

const ComponentPlaceholder: React.FC<Props> = ({
	componentName,
	bgColor = 'salmon',
	padding = '16px',
}) => {
	return (
		<Box sx={{ padding, borderRadius: '8px', backgroundColor: bgColor }}>{componentName}</Box>
	);
};

export default ComponentPlaceholder;
