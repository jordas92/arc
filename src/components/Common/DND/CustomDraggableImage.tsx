/** Copyright (c) 2024-present Kristiyan Dimitrov */

import React, { useState } from 'react';
import { styled } from '@mui/system';

const DraggableImageWrapper = styled('div')({
	cursor: 'grab',
});

type Props = {
	imageTitle?: string;
	imageUrl?: string;
	dataType?: string;
	dragStyle?: React.CSSProperties;
	onDragStart: (files: FileList) => void;
	renderContainer?: () => React.ReactNode;
	children?: React.ReactNode;
};

const CustomDraggableImage: React.FC<Props> = ({
	imageUrl,
	imageTitle,
	dataType,
	onDragStart,
	dragStyle,
}) => {
	const [isDragging, setIsDragging] = useState(false);

	const handleDragStart = async (event) => {
		// Check the dataType and set data accordingly
		if (imageUrl) {
			// if (dataType === 'image') {
			// 	// Set image URL as plain text
			// 	event.dataTransfer.setData('text/plain', imageUrl);
			// } else if (dataType === 'object') {
			// 	// Create a custom data object containing image URL and file
			// 	const customData = {
			// 		imageUrl,
			// 		file: new File([''], 'image.jpg', { type: 'image/jpeg' }),
			// 	};
			// 	// Set the custom data object in the dataTransfer object
			// 	event.dataTransfer.setData('application/json', JSON.stringify(customData));
			// } else {
			// // Load the image from the imageUrl
			// const response = await fetch(imageUrl);
			// const blob = await response.blob();
			// // Create a Blob object from the image blob
			// const fileBlob = new Blob([blob], { type: 'image/jpeg' });
			// // Set the Blob object in the dataTransfer object
			// event.dataTransfer.setData('application/octet-stream', fileBlob);
			try {
				// Load the image from the imageUrl
				const response = await fetch(imageUrl);
				const blob = await response.blob();

				// Convert the blob into a File object
				const file = new File([blob], imageTitle || 'image.jpg', { type: blob.type });

				// Create a custom data object containing the image File and title
				const customData = {
					file,
					title: imageTitle,
				};

				// Set the custom data object in the dataTransfer object
				event.dataTransfer.setData('application/octet-stream', JSON.stringify(customData));
			} catch (error) {
				console.error('Error loading image:', error);
			}
			// }
		}

		// Call the provided onDragStart callback if available
		if (onDragStart) {
			onDragStart(event);
		}
	};
	const handleDragEnd = (event) => {
		setIsDragging(false);
		const droppedImageUrl = event.dataTransfer.getData('application/octet-stream');
		console.log('Dropped image URL:', droppedImageUrl);
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		// Set the drag effect to 'copy' to indicate copy operation
		event.dataTransfer.effectAllowed = 'Copy';
	};

	const handleDrop = (event) => {
		event.preventDefault();
		const droppedImageUrl = event.dataTransfer.getData('application/octet-stream');
		console.log('Dropped image URL:', droppedImageUrl);
	};

	return (
		<DraggableImageWrapper
			draggable="true"
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onDragEnd={handleDragEnd}
			sx={{ ...(isDragging && dragStyle) }}
		>
			<img src={imageUrl} alt={imageTitle} style={{ width: '100%' }} />
		</DraggableImageWrapper>
	);
};

export default CustomDraggableImage;
