/** Copyright (c) 2023-present Kristiyan Dimitrov */

import { Box, IconButton, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import React, { ReactNode, useState } from 'react';

const styleSchema = {
	iconButton: {
		position: 'relative',
		padding: '2px 2px',
		borderRadius: '10px',
		transition: 'background-color 0.3s',
		backgroundColor: 'transparent',
		height: '32px',
	},
};

const IconContainer = styled(Box)({
	position: 'absolute',
	top: '50%',
	left: '2px',
	height: '28px',
	transform: 'translateY(-50%)',
	transition: 'opacity 0.3s',
	'& svg': {
		opacity: '0.8',
		transition: 'opacity 0.3s',
	},
	'&:hover svg': {
		opacity: '1',
	},
});

interface StyledIconButtonProps {
	icon: ReactNode;
	activeIcon: ReactNode;
	isActive: boolean;
	onClick?: () => void;
}

export const StyledIconButton: React.FC<StyledIconButtonProps> = ({
	icon,
	activeIcon,
	isActive,
	onClick,
}) => {
	const theme = useTheme();
	const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return (
		<IconButton
			onClick={handleClick}
			disableRipple
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			sx={{
				...styleSchema.iconButton,
				...((isActive || (isActive && isHovered)) && {
					backgroundColor: theme.palette.primary.darkPink,
				}),
				...(isHovered &&
					!isActive && {
						backgroundColor: theme.palette.primary.gray,
					}),
			}}
		>
			{isActive ? (
				<>
					<IconContainer sx={{ opacity: 1 }}>{activeIcon}</IconContainer>
					<IconContainer sx={{ opacity: 0 }}>{icon}</IconContainer>
				</>
			) : (
				<>
					<IconContainer sx={{ opacity: 0 }}>{activeIcon}</IconContainer>
					<IconContainer sx={{ opacity: 1 }}>{icon}</IconContainer>
				</>
			)}
		</IconButton>
	);
};
