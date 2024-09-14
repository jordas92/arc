/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { memo, useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props: any & { value: number }) {
	const { value } = props;
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" value={value} />
			</Box>
			<Box minWidth={45}>
				<Typography variant="body2" color="textSecondary">
					{`${Math.round(value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}

const classes = {
	root: {
		flexGrow: 1,
		height: 10,
		borderRadius: 12,
	},
	bar: {
		borderRadius: 12,
	},
};

interface Props {
	className?: Object;
	progressStyle?: Object;
}

const CustomizedProgressBars = memo((props: Props) => {
	const { progressStyle } = props;

	const [progress, setProgress] = useState(0);
	const [bufferEnd] = useState(100);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress) => (prevProgress >= bufferEnd ? 4 : prevProgress + 4));
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	});

	return (
		<LinearProgressWithLabel
			variant="determinate"
			value={progress}
			sx={classes.root || progressStyle?.toString()}
		/>
	);
});

export default CustomizedProgressBars;
