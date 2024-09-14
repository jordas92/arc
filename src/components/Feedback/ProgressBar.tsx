/** Copyright (c) 2023-present Kristiyan Dimitrov */

import React, { memo, useEffect, useRef, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const classes = {
	root: {
		// TODO_NEXT use this syntax
		// e.g. zIndex: (theme) => theme.zIndex.drawer + 1,
		zIndex: 999999,
		top: 0,
		left: 0,
		position: 'fixed',
		width: '100%',
		padding: '1px 1px',
		height: '1px',
	},
};

interface Props {
	progressStyle?: Object;
	bufferEndProp?: number;
	className?: Object;
}

const ProgressBar = memo((props: Props) => {
	const { bufferEndProp, progressStyle } = props;

	const [progress, setProgress] = useState(0);
	const [buffer, setBuffer] = useState(10);
	const [bufferEnd] = useState(bufferEndProp || 100);

	const progressRef = useRef(() => {});
	useEffect(() => {
		progressRef.current = () => {
			if (progress > bufferEnd) {
				setProgress(0);
				setBuffer(10);
			} else {
				const diff = Math.random() * 10;
				const diff2 = Math.random() * 10;
				setProgress(progress + diff);
				setBuffer(progress + diff + diff2);
			}
		};
	});

	useEffect(() => {
		const timer = setInterval(() => {
			progressRef.current();
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<LinearProgress
			variant="buffer"
			value={progress}
			valueBuffer={buffer}
			sx={progressStyle || classes.root}
		/>
	);
});

export default ProgressBar;
