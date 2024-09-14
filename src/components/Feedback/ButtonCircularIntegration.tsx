/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { memo, useEffect, useRef, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';

const classes = {
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	wrapper: {
		margin: 1,
		position: 'relative',
	},
	buttonSuccess: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
	fabProgress: {
		position: 'absolute',
		top: -6,
		left: -6,
		// TODO_NEXT use this syntax if need
		// e.g. zIndex: (theme) => theme.zIndex.drawer + 1,
		zIndex: 1, // ???
	},
	buttonProgress: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -20,
		marginLeft: -12,
	},
};

interface Props {
	isLoading?: boolean;
	isFabIcon?: boolean;
	fabIconComponent?: string;
	title: string;
	variant: string;
	color: string;
	fabSize?: number;
	ariaLabel?: string;
	className: Object;
	onClick: () => void;
}

const ButtonCircularIntegration = memo((props: Props) => {
	const { title, className, isFabIcon, fabIconComponent, fabSize, ariaLabel, onClick } = props;

	const [loading, setLoading] = useState<boolean>(false);
	const timer = useRef<number>();

	useEffect(() => {
		return () => {
			clearTimeout(timer.current);
		};
	}, []);

	const handleButtonClick = () => {
		onClick();
		if (!loading) {
			setLoading(true);
			timer.current = window.setTimeout(() => {
				setLoading(false);
			}, 2000);
		}
	};

	if (isFabIcon) {
		return (
			<Container sx={classes.wrapper}>
				<Fab aria-label={ariaLabel} sx={className} onClick={handleButtonClick}>
					{fabIconComponent}
				</Fab>
				{loading && <CircularProgress size={fabSize} sx={classes.fabProgress} />}
			</Container>
		);
	}

	return (
		<Container sx={classes.root}>
			<Container sx={classes.wrapper}>
				<Button sx={className} disabled={loading} onClick={handleButtonClick}>
					{title}
				</Button>
				{loading && <CircularProgress size={24} sx={classes.buttonProgress} />}
			</Container>
		</Container>
	);
});

export default ButtonCircularIntegration;
