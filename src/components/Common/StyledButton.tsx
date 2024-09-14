import React from 'react';
import { styled } from '@mui/system';
import { Button as ButtonMui } from '@mui/material';

const StyledButton = styled(ButtonMui)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
	color: theme.palette.primary.contrastText,
	padding: '10px 20px',
	borderRadius: '4px',
	'&:hover': {
		backgroundColor: theme.palette.primary.dark,
	},
}));

interface ButtonProps {
	label: string;
	handleClick?: () => void;
	fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, handleClick, fullWidth }) => {
	return (
		<StyledButton variant="contained" onClick={handleClick} fullWidth={fullWidth}>
			{label}
		</StyledButton>
	);
};
