import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';

type Props = {
	label: string;
	margin?: string;
	variant?: TypographyProps['variant'];
};

const LabelSettingInput: React.FC<Props> = ({ label, margin = '0 0 12px', variant = 'h5' }) => {
	return (
		<Typography variant={variant} color="text.secondary" sx={{ margin, lineHeight: '1' }}>
			{label}
		</Typography>
	);
};

export default LabelSettingInput;
