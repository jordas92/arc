/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress } from '@mui/material';

const classes: any = {
	root: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		// THEME_NEXT
		background: '#0E0D0F',
		height: '100vh',
	},
	circularProgress: {
		marginTop: '20%',
	},
};

function LoadingScreen() {
	const timerRef = useRef();

	useEffect(
		() => () => {
			clearTimeout(timerRef.current);
		},
		[],
	);

	return (
		<Box sx={classes.root}>
			<CircularProgress
				sx={classes.circularProgress}
				color="primary"
				disableShrink
				size={40}
				thickness={5}
			/>
		</Box>
	);
}

export default LoadingScreen;
