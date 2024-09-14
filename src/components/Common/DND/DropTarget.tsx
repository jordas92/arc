/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React from 'react';
import { useDrop } from 'react-dnd';
import { Box } from '@mui/material';

interface DropBoxProps {
	children?: React.ReactNode;
	sx?: object;
	[x: string]: any; // Allow additional props
}

function selectBackgroundColor(isActive, canDrop) {
	if (isActive) {
		return { background: 'darkgreen' };
	}
	if (canDrop) {
		return { background: 'darkkhaki' };
	}
	return { background: '#222' };
}

const DropTarget: React.FC<DropBoxProps> = ({ children, sx, ...boxProps }) => {
	const [{ canDrop, isOver, didDrop }, drop] = useDrop(
		() => ({
			accept: 'image', // ItemTypes.BOX,
			drop: (item: any) => {
				// Handle the image drop here
				console.log(`Dropped image: ${item?.imageTitle}`);
			},
			collect: (monitor) => ({
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
				didDrop: monitor.didDrop(),
			}),
			dropEffect: 'move',
		}),
		[],
		// [allowedDropEffect],
	);
	const isActive = canDrop && isOver;
	const backgroundColor = selectBackgroundColor(isActive, canDrop);
	// Display message based on whether a drop occurred
	const dropMessage = didDrop ? 'Item dropped!' : 'No item dropped';
	console.log(dropMessage);

	return (
		<Box
			ref={drop}
			sx={{
				...sx,
				...backgroundColor,
			}}
			{...boxProps}
		>
			{children}
		</Box>
	);
};

export default DropTarget;
