/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { memo, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { Box } from '@mui/material';

interface DraggableBoxProps {
	imageUrl?: string;
	imageTitle?: string;
	children?: React.ReactNode;
	dragStyle?: React.CSSProperties;
	item?: object;
	sx?: object;
	onDragStart?: Function; // Function to trigger when dragging starts
	onDragEnd?: () => void; // Function to trigger when dragging ends
	[x: string]: any; // Allow additional props
}

const DraggableItem: React.FC<DraggableBoxProps> = memo(
	({
		imageUrl,
		imageTitle,
		item,
		children,
		dragStyle,
		sx,
		onDragStart,
		onDragEnd,
		...boxProps
	}) => {
		const [{ isDragging }, drag, dragPreview] = useDrag(
			() => ({
				type: 'image',
				item,
				collect: (monitor) => {
					return {
						isDragging: monitor.isDragging(),
					};
				},
				end: (item, monitor) => {
					const dropResult = monitor.getDropResult();

					if (item && dropResult) {
						// setDropped(true);
					}
				},
			}),
			[imageUrl],
		);

		useEffect(() => {
			if (isDragging && onDragStart) {
				onDragStart(); // Trigger the onDragStart function when isDragging becomes true
			}
			if (!isDragging && onDragEnd) {
				onDragEnd(); // Trigger the onDragEnd function when isDragging becomes false
			}
		}, [isDragging, onDragStart, onDragEnd]);

		useEffect(() => {
			const img = new Image();
			img.src = imageUrl || ''; // Assuming imageSrc is the URL of the image
			img.onload = () => {
				// Set the size of the drag preview to match the size of the image
				const dragPreviewElement = document.createElement('div');
				dragPreviewElement.style.width = '50px'; // Set the width of the drag preview
				dragPreviewElement.style.height = '50px'; // Set the height of the drag preview
				dragPreviewElement.appendChild(img);
				dragPreview(dragPreviewElement, { captureDraggingState: true });
			};
		}, [imageUrl, dragPreview]);

		return (
			<Box
				ref={drag}
				sx={{
					...sx,
					opacity: isDragging ? 0.5 : 1,
					cursor: isDragging ? 'grabbing' : 'auto', // Change cursor to indicate draggable
					...(isDragging && dragStyle), // Apply dragStyle when dragging
				}}
				{...boxProps}
			>
				{children}
			</Box>
		);
	},
);

export default DraggableItem;
